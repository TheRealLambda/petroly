import { useEffect, useRef, useState } from "react"
import "./styles/calendar_event.css"
import Modal from "./Modal"
import ShowEventForm from "./ShowEventForm"
import EditEventForm from "./EditEventForm"
import CreateEventForm from "./CreateEventForm"
import axios from "axios"

const CalendarEvent = ({ updateSchedule, setCalendarEvents, eventObject, initialPosition, editMode }) => {

  const [state, setState] = useState(editMode.current ? "edit" : "view")
  const [position, setPosition] = useState(initialPosition || {left: 0, top: 0, height: 75})
  const [prevPosition, setPrevPosition] = useState(initialPosition || {left: 0, top: 0, height: 75})
  const [event, setEvent] = useState(eventObject ? eventObject : null)
  const [modalState, setModalState] = useState(null)
  const [AskForConfirmation, setAskForConfirmation] = useState(false)
  const divRef = useRef(null)

  let container
  let selectTime
  let pointerAction = null
  let timeout
  let clicked
  let initialMouseY
  let initialMouseX
  let initialOffsetY
  let initialHeight

  useEffect(() => {
    if(event) {
      setModalState("closed")
      setState("view")
      setAskForConfirmation(false)
    } else {
      setModalState("partial")
      setState("edit")
      setAskForConfirmation(false)
    }
    
  }, [])

  useEffect(() => {
    
    selectTime = document.getElementById("selectTime")
    container = document.getElementById("clickContainer")
    container.addEventListener("pointerdown", pointerDown)
    container.addEventListener("pointermove", pointerMove)
    container.addEventListener("pointerup", pointerUp)

    if(state === "view") {
      setPrevPosition(position)
      setModalState("closed")
      setAskForConfirmation(false)
      divRef.current.classList.remove("edit")
      divRef.current.classList.add("view")
    } else if(state === "edit") {
      if(modalState === "closed") {
        setModalState("partial")
      }
      divRef.current.classList.remove("view")
      divRef.current.classList.add("edit")
    }
    return () => {
      container.removeEventListener("pointerdown", pointerDown)
      container.removeEventListener("pointermove", pointerMove)
      container.removeEventListener("pointerup", pointerUp)
    }
  }, [state])

  useEffect(() => {
    divRef.current.style.top = position.top+"px" 
    divRef.current.style.left = position.left+"px"
    divRef.current.style.height = position.height+"px"
  }, [position])

  const saveEvent = async (body) => {
    const result = await axios.post("http://localhost:3001/api/events", body)

    updateSchedule()
    editMode.current = false
    setState("view")
    setModalState("closed")
    setEvent(body)
  }
 

  const updateSelectTime = (rowIndex, rowHeight) => {

    const hour = String(Math.floor(rowIndex/6))
    const minute = String((rowIndex % 6)*10)
    const text = (hour.length < 2 ? "0"+hour : hour) + ":" + (minute.length < 2 ? "0"+minute : minute)
    selectTime.style.display = "block"
    selectTime.style.top = Math.floor(rowIndex*rowHeight)+"px"
    selectTime.innerText = text
  }
  
  const reposition = (e) => {

    const mouseX = e.clientX - container.getBoundingClientRect().left    
    const mouseY = e.clientY - container.getBoundingClientRect().top
    const top = divRef.current.getBoundingClientRect().top - container.getBoundingClientRect().top
    const bottom = divRef.current.getBoundingClientRect().top+divRef.current.offsetHeight - container.getBoundingClientRect().top
    const width = container.offsetWidth
    const height = container.offsetHeight
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

    const mouseX = e.clientX - container.getBoundingClientRect().left    
    const mouseY = e.clientY - container.getBoundingClientRect().top - initialOffsetY
    const top = divRef.current.getBoundingClientRect().top - container.getBoundingClientRect().top
    const bottom = divRef.current.getBoundingClientRect().top+divRef.current.offsetHeight - container.getBoundingClientRect().top
    const width = container.offsetWidth
    const height = container.offsetHeight
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
    const mouseY = e.clientY - container.getBoundingClientRect().top - initialOffsetY
    const height = container.offsetHeight
    const divHeight = divRef.current.getBoundingClientRect().height
    const bottom = divRef.current.getBoundingClientRect().top+divHeight - container.getBoundingClientRect().top
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
    const mouseY = e.clientY - container.getBoundingClientRect().top - initialOffsetY + initialHeight
    const height = container.offsetHeight
    const top = divRef.current.getBoundingClientRect().top - container.getBoundingClientRect().top
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
      if(!editMode.current) {
        editMode.current = true
        setAskForConfirmation(true)
      }
      move(e)
    } else if(pointerAction === "slideUp") {
      if(!editMode.current) {
        editMode.current = true
      }
      slideUp(e)
    } else if(pointerAction === "slideDown") {
      if(!editMode.current) {
        editMode.current = true
      }
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
              && (e.target === divRef.current||e.target.parentNode === divRef.current)) {
      setModalState("open")
    }

    selectTime.style.display = "none"
  }



  return (
    <div ref={divRef} className="calendar_event">
      {state === "view" && <p>{event && event.title}</p>}
      <Modal state={modalState} setState={setModalState} options={{swipeDownToClose:false,DragDownToClose:false,clickAwayToClose:false}}>
        {
          state === "edit"&&!event ? <CreateEventForm saveEvent={saveEvent} setState={setState} setCalendarEvents={setCalendarEvents} editMode={editMode} setModalState={setModalState} position={position} /> :
          state === "view" ? <ShowEventForm setModalState={setModalState} setState={setState} eventObject={event} /> : 
          state === "edit" ? <EditEventForm setState={setState} setModalState={setModalState} eventObject={event} saveEvent={saveEvent} position={position} setPosition={setPosition} prevPosition={prevPosition} editMode={editMode}/> :
          0
        }
      </Modal>
      <div className="top_slider"></div>
      <div className="bottom_slider"></div>
    </div>
  )
}

export default CalendarEvent