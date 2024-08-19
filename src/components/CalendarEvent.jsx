import { useEffect, useRef, useState } from "react"
import "./styles/calendar_event.css"
import Modal from "./Modal"
import ShowEventForm from "./ShowEventForm"
import EditEventForm from "./EditEventForm"
import CreateEventForm from "./CreateEventForm"
import axios from "axios"

const CalendarEvent = ({ week, updateSchedule, cancelCreation, eventObject, mode, setMode}) => {

  const [state, setState] = useState(mode.type === "create" ? "create" : "view")
  const [style, setStyle] = useState(() => {
    const container = document.getElementById("clickContainer")
    const width = container.offsetWidth
    const height = container.offsetHeight
    const columnWidth = width / 7
    const rowHeight = height / 24 / 6
    const columnIndex = new Date(eventObject.start_time).getDay()
    const rowIndex = Math.floor((new Date(eventObject.start_time).getHours()*60 + new Date(eventObject.start_time).getMinutes()) / 10)
    const rowIndexEnd = Math.floor((new Date(eventObject.end_time).getHours()*60 + new Date(eventObject.end_time).getMinutes()) / 10)
    const divHeight = (rowIndexEnd-rowIndex)*rowHeight
    const pos = {left: columnIndex*columnWidth, top: rowIndex*rowHeight, height: divHeight}
    return {current: pos, prev: pos}
  })
  // const [prevPosition, setPrevPosition] = useState(initialPosition || {left: 0, top: 0, height: 75})
  const [event, setEvent] = useState(eventObject)
  const [modalState, setModalState] = useState(mode.type === "create" ? "partial" : "closed")
  
  const divRef = useRef(null)
  const lockPosition = useRef(false)
  const options = useRef({swipeDownToClose: false, DragDownToClose: false, clickAwayToClose: false})

  const container = useRef(document.getElementById("clickContainer"))
  const selectTime = useRef(document.getElementById("selectTime"))
  let pointerAction = null
  let timeout
  let clicked
  let initialMouseY
  let initialMouseX
  let initialOffsetY
  let initialHeight

// useEffect(() => {
//   const container = document.getElementById("clickContainer")
//   const width = container.offsetWidth
//   const columnWidth = width / 7
//   divRef.current.style.width = columnWidth+"px"
// }, [week])

  useEffect(() => {
    
    if(week === "current") {
      container.current.addEventListener("pointerdown", pointerDown)
      container.current.addEventListener("pointermove", pointerMove)
      container.current.addEventListener("pointerup", pointerUp)
    }

    if(state === "create") {
      setModalState("partial")
      options.current = {swipeDownToClose: false, DragDownToClose: false, clickAwayToClose: false}
      divRef.current.classList.remove("view")
      divRef.current.classList.add("edit")

    } else if(state === "view") {
      options.current = {swipeDownToClose: true, DragDownToClose: true, clickAwayToClose: false}
      divRef.current.style.backgroundColor = event.color

      setModalState("closed")
      divRef.current.classList.remove("edit")
      divRef.current.classList.add("view")
      divRef.current.style.opacity = ""

    } else if(state === "edit") {
      options.current = {swipeDownToClose: false, DragDownToClose: false, clickAwayToClose: false}

      if(event.type === "class") {
        lockPosition.current = true
        divRef.current.style.backgroundColor = "rgba(255,0,0,0.5)"
        // divRef.current.style.opacity = "0.5"
      } else {
        divRef.current.style.backgroundColor = ""
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
  }, [state, mode])
  
  useEffect(() => {
    if(!lockPosition.current) {  
      divRef.current.style.top = style.current.top+"px" 
      divRef.current.style.left = style.current.left+"px"
      divRef.current.style.height = style.current.height+"px"
    }
  }, [style])



  const saveEvent = async (body) => {
    const result = await axios.post("http://localhost:3001/api/events", body)
    updateSchedule()
  }

  const updateEvent = async (body) => {
    const result = await axios.patch("http://localhost:3001/api/events/"+event._id, body)
    setMode({type: "view", commit: false})
    setState("view")
    setModalState("closed")
    setEvent(result.data)
  }
  
  const remove = async () => {
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
      setStyle(pos => {
        return {current: {left: columnIndex*columnWidth, top: pos.current.top, height: pos.current.height}, prev: pos.prev}
      })
    }
    if(rowIndex >= 0 && rowIndex+(bottomRowIndex-topRowIndex) <= maxRow) {
      setStyle(pos => {
        return {current: {left: pos.current.left, top: Math.floor(rowIndex*rowHeight), height: pos.current.height}, prev: pos.prev}
      })
    } else if(rowIndex+(bottomRowIndex-topRowIndex) > maxRow) {
      setStyle(pos => {
        return {current: {left: pos.current.left, top: Math.floor((maxRow-(bottomRowIndex-topRowIndex))*rowHeight), height: pos.current.height}, prev: pos.prev}
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
      setStyle(pos => {
        return {current: {left: columnIndex*columnWidth, top: pos.current.top, height: pos.current.height}, prev: pos.prev}
      })
    }
    if(rowIndex >= 0 && rowIndex+(bottomRowIndex-topRowIndex) <= maxRow) {
      updateSelectTime(topRowIndex, rowHeight)
      setStyle(pos => {
        return {current: {left: pos.current.left, top: Math.floor(rowIndex*rowHeight), height: pos.current.height}, prev: pos.prev}
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
      setStyle(pos => {
        return {current: {left: pos.current.left, top: rowIndex*rowHeight, height: (bottomRowIndex-rowIndex)*rowHeight}, prev: pos.prev}
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
      setStyle(pos => {
        return {current: {left: pos.current.left, top: top, height: (rowIndex-topRowIndex)*rowHeight}, prev: pos.prev}
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
    // console.log("compare:",e.target, divRef.current, e.target === divRef.current);
    if(state !== "view" && e.target.matches(".calendar_event.edit")) {
      pointerAction = "move"
    } else if(state !== "view" && e.target.matches(".calendar_event.edit .top_slider")) {
      pointerAction = "slideUp"
    } else if(state !== "view" && e.target.matches(".calendar_event.edit .bottom_slider")) {
      pointerAction = "slideDown"
    } 

  }

  const pointerMove = (e) => {

    

    if(pointerAction === "move") {
      move(e)
    } else if(pointerAction === "slideUp") {
      slideUp(e)
    } else if(pointerAction === "slideDown") {
      slideDown(e)
    }

  }

  const pointerUp = (e) => {
  
    // console.log("HERE::", mode);
    if(!mode.commit && pointerAction) {
      setMode({type: mode.type, commit: true})
    }

    const finalMouseX = e.clientX
    const finalMouseY = e.clientY
    if(state !== "view" && mode.commit 
       && e.target.matches(".vertical_lines")
       && clicked && finalMouseX < initialMouseX+10 && finalMouseX > initialMouseX-10
       && finalMouseY < initialMouseY+10 && finalMouseY > initialMouseY-10) {
      reposition(e)
    } else if(state === "view" && mode.type === "view" && clicked && finalMouseX < initialMouseX+10 && finalMouseX > initialMouseX-10
              && finalMouseY < initialMouseY+10 && finalMouseY > initialMouseY-10
              && (e.target === divRef.current||e.target.parentNode === divRef.current)) {
      setModalState("open")
    }

    pointerAction = null
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
      {state === "view" && <p className={"text-14-regular "+color()}>{event.title}</p>}
      <Modal state={modalState} setState={setModalState} options={options.current}>
        {
          state === "create" ? <CreateEventForm saveEvent={saveEvent} setState={setState} cancelCreation={cancelCreation} mode={mode} setMode={setMode} setModalState={setModalState} style={style} /> :
          state === "view" ? <ShowEventForm remove={remove} setModalState={setModalState} setState={setState} eventObject={event} setMode={setMode} /> : 
          state === "edit" ? <EditEventForm setState={setState} setModalState={setModalState} eventObject={event} updateEvent={updateEvent} style={style} setStyle={setStyle} setMode={setMode}/> :
          <div>No suitable form found</div>
        }
      </Modal>
      <div className="top_slider"></div>
      <div className="bottom_slider"></div>
    </div>
  )
}

export default CalendarEvent