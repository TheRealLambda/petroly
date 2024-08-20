import { useEffect, useRef, useState } from "react"
import "./styles/calendar_event.css"
import Modal from "./Modal"
import ShowEventForm from "./ShowEventForm"
import EditEventForm from "./EditEventForm"
import CreateEventForm from "./CreateEventForm"
import axios from "axios"

const CalendarEvent = ({ event }) => {
  
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
    
    divRef.current.classList.add(event.state)
    divRef.current.style.backgroundColor = event.color 
    divRef.current.style.top = event.style.curr.top+"px" 
    divRef.current.style.left = event.style.curr.left+"px"
    divRef.current.style.height = event.style.curr.height+"px"
    divRef.current.style.width = event.style.curr.width+"px"

    if(event.week === "curr") {
      container.current.addEventListener("pointerdown", pointerDown)
      container.current.addEventListener("pointermove", pointerMove)
      container.current.addEventListener("pointerup", pointerUp)
    }
    

    return () => {
      if(event.week === "curr") {
        container.current.removeEventListener("pointerdown", pointerDown)
        container.current.removeEventListener("pointermove", pointerMove)
        container.current.removeEventListener("pointerup", pointerUp)
      }
    }
  }, [event])



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
    if(event.state !== "view" && e.target.matches(".calendar_event.edit")) {
      pointerAction = "move"
    } else if(event.state !== "view" && e.target.matches(".calendar_event.edit .top_slider")) {
      pointerAction = "slideUp"
    } else if(event.state !== "view" && e.target.matches(".calendar_event.edit .bottom_slider")) {
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
    // if(!mode.commit && pointerAction) {
    //   setMode({type: mode.type, commit: true})
    // }

    const finalMouseX = e.clientX
    const finalMouseY = e.clientY
    if(event.state !== "view" && mode.commit 
       && e.target.matches(".vertical_lines")
       && clicked && finalMouseX < initialMouseX+10 && finalMouseX > initialMouseX-10
       && finalMouseY < initialMouseY+10 && finalMouseY > initialMouseY-10) {
      reposition(e)
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
      {event.state === "view" && <p className={"text-14-regular "+color()}>{event.title}</p>}
      <div className="top_slider"></div>
      <div className="bottom_slider"></div>
    </div>
  )
}

export default CalendarEvent