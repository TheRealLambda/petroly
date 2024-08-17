import { useEffect, useRef, useState } from "react"
import "./styles/calendar_event.css"
import Modal from "./Modal"
import ShowEventForm from "./ShowEventForm"
import EditEventForm from "./EditEventForm"
import CreateEventForm from "./CreateEventForm"
import axios from "axios"

const CalendarEvent = ({ week, editing, updateSchedule, setCalendarEvents, eventObject, initialPosition, editMode }) => {

  const [state, setState] = useState(eventObject ? "view" : "edit")
  const [position, setPosition] = useState(initialPosition || {left: 0, top: 0, height: 75})
  const [prevPosition, setPrevPosition] = useState(initialPosition || {left: 0, top: 0, height: 75})
  const [event, setEvent] = useState(eventObject ? eventObject : null)
  const [modalState, setModalState] = useState(eventObject ? "closed" : "partial")
  
  const divRef = useRef(null)
  const lockPosition = useRef(false)

  const container = useRef(document.getElementById("clickContainer"))
  const selectTime = useRef(document.getElementById("selectTime"))
  let pointerAction = null
  let timeout
  let clicked
  let initialMouseY
  let initialMouseX
  let initialOffsetY
  let initialHeight



  useEffect(() => {
    
    if(week === "current") {
      container.current.addEventListener("pointerdown", pointerDown)
      container.current.addEventListener("pointermove", pointerMove)
      container.current.addEventListener("pointerup", pointerUp)
    }

    if(state === "view") {
      console.log("editing:", editing);
      if(editing) {
        editing.current = false
      }
      if(event) {
        divRef.current.style.backgroundColor = event.color
      }
      setPrevPosition(position)
      setModalState("closed")
      divRef.current.classList.remove("edit")
      divRef.current.classList.add("view")
      divRef.current.style.opacity = ""

    } else if(state === "edit") {

      editing.current = true
      if(modalState === "closed") {
        setModalState("partial")
      }
      if(event && event.type === "class") {
        lockPosition.current = true
        divRef.current.style.opacity = "0.5"
      } else {
        divRef.current.classList.remove("view")
        divRef.current.classList.add("edit")
      }

    }
    return () => {
      if(week === "current") {
        container.current.removeEventListener("pointerdown", pointerDown)
        container.current.removeEventListener("pointermove", pointerMove)
        container.current.removeEventListener("pointerup", pointerUp)
      }
    }
  }, [state])
  
  useEffect(() => {
    if(!lockPosition.current) {  
      divRef.current.style.top = position.top+"px" 
      divRef.current.style.left = position.left+"px"
      divRef.current.style.height = position.height+"px"
    }
  }, [position])



  const saveEvent = async (body) => {
    const result = await axios.post("http://localhost:3001/api/events", body)
    editing.current = false
    editMode.current = false
    setState("view")
    setModalState("closed")
    updateSchedule()
  }

  const updateEvent = async (body) => {
    const result = await axios.patch("http://localhost:3001/api/events/"+event._id, body)
    editing.current = false
    editMode.current = false
    setState("view")
    setModalState("closed")
    setEvent(result.data)
  }
  
  const remove = async () => {
    editing.current = false
    editMode.current = false
    const result = await axios.delete("http://localhost:3001/api/events/"+event._id)
    updateSchedule()
  }
 


  const updateSelectTime = (rowIndex, rowHeight) => {

    const hour = String(Math.floor(rowIndex/6))
    const minute = String((rowIndex % 6)*10)
    const text = (hour.length < 2 ? "0"+hour : hour) + ":" + (minute.length < 2 ? "0"+minute : minute)
    selectTime.current.style.display = "block"
    selectTime.current.style.top = Math.floor(rowIndex*rowHeight)+"px"
    selectTime.current.innerText = text
  }
  
  const reposition = (e) => {

    const mouseX = e.clientX - container.current.getBoundingClientRect().left    
    const mouseY = e.clientY - container.current.getBoundingClientRect().top
    const top = divRef.current.getBoundingClientRect().top - container.current.getBoundingClientRect().top
    const bottom = divRef.current.getBoundingClientRect().top+divRef.current.offsetHeight - container.current.getBoundingClientRect().top
    const width = container.current.offsetWidth
    const height = container.current.offsetHeight
    const columnWidth = width / 7
    const rowHeight = height / 24 / 6
    const columnIndex = Math.floor(mouseX/columnWidth)
    const rowIndex = Math.floor(mouseY/rowHeight)
    const topRowIndex = Math.round(top/rowHeight)
    const bottomRowIndex = Math.round(bottom/rowHeight)
    
    const maxRow = Math.floor(height/rowHeight)
    if(columnIndex >= 0 && columnIndex <= 6) {
      setPosition(prev => {
        return {left: columnIndex*columnWidth, top: prev.top, height: prev.height}
      })
    }
    if(rowIndex >= 0 && rowIndex+(bottomRowIndex-topRowIndex) <= maxRow) {
      setPosition(prev => {
        return {left: prev.left, top: Math.floor(rowIndex*rowHeight), height: prev.height}
      })
    } else if(rowIndex+(bottomRowIndex-topRowIndex) > maxRow) {
      setPosition(prev => {
        return {left: prev.left, top: Math.floor((maxRow-(bottomRowIndex-topRowIndex))*rowHeight), height: prev.height}
      })
    }

  }



  const move = (e) => {

    const mouseX = e.clientX - container.current.getBoundingClientRect().left    
    const mouseY = e.clientY - container.current.getBoundingClientRect().top - initialOffsetY
    const top = divRef.current.getBoundingClientRect().top - container.current.getBoundingClientRect().top
    const bottom = divRef.current.getBoundingClientRect().top+divRef.current.offsetHeight - container.current.getBoundingClientRect().top
    const width = container.current.offsetWidth
    const height = container.current.offsetHeight
    const columnWidth = width / 7
    const rowHeight = height / 24 / 6
    const columnIndex = Math.floor(mouseX/columnWidth)
    const rowIndex = Math.floor(mouseY/rowHeight)
    const topRowIndex = Math.round(top/rowHeight)
    const bottomRowIndex = Math.round(bottom/rowHeight)
    
    const maxRow = Math.floor(height/rowHeight)
    if(columnIndex >= 0 && columnIndex <= 6) {
      updateSelectTime(topRowIndex, rowHeight)
      setPosition(prev => {
        return {left: columnIndex*columnWidth, top: prev.top, height: prev.height}
      })
    }
    if(rowIndex >= 0 && rowIndex+(bottomRowIndex-topRowIndex) <= maxRow) {
      updateSelectTime(topRowIndex, rowHeight)
      setPosition(prev => {
        return {left: prev.left, top: Math.floor(rowIndex*rowHeight), height: prev.height}
      })
    }

  }
  
  const slideUp = (e) => {
    const mouseY = e.clientY - container.current.getBoundingClientRect().top - initialOffsetY
    const height = container.current.offsetHeight
    const divHeight = divRef.current.getBoundingClientRect().height
    const bottom = divRef.current.getBoundingClientRect().top+divHeight - container.current.getBoundingClientRect().top
    const rowHeight = height / 24 / 6
    const rowIndex = Math.floor(mouseY/rowHeight)
    const bottomRowIndex = Math.round(bottom/rowHeight)
    
    const maxRow = Math.floor(height/rowHeight)
    if((bottomRowIndex-rowIndex) >= 1 && rowIndex >= 0 && bottomRowIndex <= maxRow) {
      updateSelectTime(rowIndex, rowHeight)
      setPosition(prev => {
        return {left: prev.left, top: rowIndex*rowHeight, height: (bottomRowIndex-rowIndex)*rowHeight}
      })
    }
        
  }

  const slideDown = (e) => {
    const mouseY = e.clientY - container.current.getBoundingClientRect().top - initialOffsetY + initialHeight
    const height = container.current.offsetHeight
    const top = divRef.current.getBoundingClientRect().top - container.current.getBoundingClientRect().top
    const rowHeight = height / 24 / 6
    const rowIndex = Math.floor(mouseY/rowHeight)
    const topRowIndex = Math.round(top/rowHeight)
    
    const maxRow = Math.floor(height/rowHeight)
    if((rowIndex-topRowIndex) >= 1 && rowIndex >= 0 && rowIndex <= maxRow) {
      updateSelectTime(rowIndex, rowHeight)
      setPosition(prev => {
        return {left: prev.left, top: top, height: (rowIndex-topRowIndex)*rowHeight}
      })
    }

  }



  const pointerDown = (e) => {
    initialMouseY = e.clientY
    initialMouseX = e.clientX
    initialOffsetY = initialMouseY - divRef.current.getBoundingClientRect().top
    initialHeight = divRef.current.getBoundingClientRect().height
    
    clicked = true
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      clicked = false
    }, 500)
    
    if(state === "edit" && e.target.matches(".calendar_event.edit")) {
      pointerAction = "move"
    } else if(state === "edit" && e.target.matches(".calendar_event.edit .top_slider")) {
      pointerAction = "slideUp"
    } else if(state === "edit" && e.target.matches(".calendar_event.edit .bottom_slider")) {
      pointerAction = "slideDown"
    } 

  }

  const pointerMove = (e) => {
    if(pointerAction === "move") {
        editMode.current = true
      move(e)
    } else if(pointerAction === "slideUp") {
        editMode.current = true
      slideUp(e)
    } else if(pointerAction === "slideDown") {
        editMode.current = true
      slideDown(e)
    }

  }

  const pointerUp = (e) => {
  
    pointerAction = null
    
    const finalMouseX = e.clientX
    const finalMouseY = e.clientY
    if(state === "edit" && editMode.current 
       && e.target.matches(".vertical_lines")
       && clicked && finalMouseX < initialMouseX+10 && finalMouseX > initialMouseX-10
       && finalMouseY < initialMouseY+10 && finalMouseY > initialMouseY-10) {
      reposition(e)
    } else if(state === "view" && clicked && finalMouseX < initialMouseX+10 && finalMouseX > initialMouseX-10
    && finalMouseY < initialMouseY+10 && finalMouseY > initialMouseY-10 && !editMode.current
          && !editing.current && (e.target === divRef.current||e.target.parentNode === divRef.current)) {
      setModalState("open")
    }

    selectTime.current.style.display = "none"
  }



  const color = () => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(event.color);
    const rgb = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
    const brightness = 0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b

    return brightness > 150 ? "color-accent" : "color-white"
  }

  return (
    <div ref={divRef} className="calendar_event">
      {state === "view" && event && <p className={"text-14-regular "+color()}>{event.title}</p>}
      <Modal state={modalState} setState={setModalState} options={{swipeDownToClose:false,DragDownToClose:false,clickAwayToClose:false}}>
        {
          state === "edit"&&!event ? <CreateEventForm editing={editing} saveEvent={saveEvent} setState={setState} setCalendarEvents={setCalendarEvents} editMode={editMode} setModalState={setModalState} position={position} /> :
          state === "view" ? <ShowEventForm remove={remove} setModalState={setModalState} setState={setState} eventObject={event} /> : 
          state === "edit" ? <EditEventForm setState={setState} setModalState={setModalState} eventObject={event} updateEvent={updateEvent} position={position} setPosition={setPosition} prevPosition={prevPosition} editMode={editMode}/> :
          0
        }
      </Modal>
      <div className="top_slider"></div>
      <div className="bottom_slider"></div>
    </div>
  )
}

export default CalendarEvent