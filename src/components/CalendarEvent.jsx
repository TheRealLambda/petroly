import { useEffect, useRef, useState } from "react"
import "./styles/calendar_event.css"
import Modal from "./Modal"
import ShowEventForm from "./ShowEventForm"
import EditEventForm from "./EditEventForm"
import CreateEventForm from "./CreateEventForm"

const CalendarEvent = ({ setCalendarEvents, eventObject, initialPosition, editing, editMode }) => {

  const [state, setState] = useState(editing ? "edit" : "view")
  const [position, setPosition] = useState(initialPosition || {left: 0, top: 0})
  const [event, setEvent] = useState(eventObject ? eventObject : null)
  const [modalState, setModalState] = useState(null)
  const [form, setForm] = useState(null)
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
    
    
  }, [])

  useEffect(() => {
    if(modalState === "closed") {
      if(form === "create") {
        setCalendarEvents(events => events.slice(0,-1))
      } else if(form === "edit"){}
    }
  }, [modalState])

  useEffect(() => {
    
    selectTime = document.getElementById("selectTime")
    container = document.getElementById("clickContainer")
    container.addEventListener("pointerdown", pointerDown)
    container.addEventListener("pointermove", pointerMove)
    container.addEventListener("pointerup", pointerUp)

    if(state === "view") {
      setModalState("closed")
      setAskForConfirmation(false)
      divRef.current.classList.remove("edit")
      divRef.current.classList.add("view")
    } else if(state === "edit") {
      setModalState("partial")
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
  }, [position])



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
      divRef.current.style.left = columnIndex*columnWidth+"px"
    }
    if(rowIndex >= 0 && rowIndex+(bottomRowIndex-topRowIndex) <= maxRow) {
      divRef.current.style.top = Math.floor(rowIndex*rowHeight)+"px"
    } else if(rowIndex+(bottomRowIndex-topRowIndex) > maxRow) {
      divRef.current.style.top = Math.floor((maxRow-(bottomRowIndex-topRowIndex))*rowHeight)+"px"
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
      divRef.current.style.left = columnIndex*columnWidth+"px"
      updateSelectTime(topRowIndex, rowHeight)
    }
    if(rowIndex >= 0 && rowIndex+(bottomRowIndex-topRowIndex) <= maxRow) {
      divRef.current.style.top = Math.floor(rowIndex*rowHeight)+"px"
      updateSelectTime(topRowIndex, rowHeight)
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
      divRef.current.style.top = rowIndex*rowHeight+"px"
      divRef.current.style.height = (bottomRowIndex-rowIndex)*rowHeight+"px"
      updateSelectTime(rowIndex, rowHeight)
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
      divRef.current.style.height = (rowIndex-topRowIndex)*rowHeight+"px"
      updateSelectTime(rowIndex, rowHeight)
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
    console.log(pointerAction);
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
       && !e.target.matches(".calendar_event, .calendar_event .top_slider, .calendar_event .bottom_slider")
       && clicked && finalMouseX < initialMouseX+10 && finalMouseX > initialMouseX-10
       && finalMouseY < initialMouseY+10 && finalMouseY > initialMouseY-10) {
      reposition(e)
    } else if(state === "view" && !editMode.current
              && e.target.matches(".calendar_event.view, .calendar_event.view .top_slider, .calendar_event.view .bottom_slider")) {
      setModalState("open")
    }

    selectTime.style.display = "none"
  }



  return (
    <div ref={divRef} className="calendar_event">
      <Modal>
        {
          form === "create" ? <CreateEventForm setModalState={setModalState} /> :
          form === "view" ? <ShowEventForm /> : 
          form === "edit" ? <EditEventForm /> :
          0
        }
      </Modal>
      <div className="top_slider"></div>
      <div className="bottom_slider"></div>
    </div>
  )
}

export default CalendarEvent