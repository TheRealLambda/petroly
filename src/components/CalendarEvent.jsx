import { useEffect, useRef } from "react"
import "./styles/calendar_event.css"

const CalendarEvent = ({ event, period, setStyle, action, setAction }) => {
  
  const divRef = useRef(null)

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
    if(event.state === "view" ) {
      divRef.current.style.backgroundColor = event.color 
    } else {
      divRef.current.style.backgroundColor = "" 
    }
    divRef.current.style.top = event.style.curr.top+"px" 
    divRef.current.style.left = event.style.curr.left+"px"
    divRef.current.style.height = event.style.curr.height+"px"
    divRef.current.style.width = event.style.curr.width+"px"

    if(event.week === "curr" && event.state !== "view") {
      container.current.addEventListener("pointerdown", pointerDown)
      container.current.addEventListener("pointermove", pointerMove)
      container.current.addEventListener("pointerup", pointerUp)
    }
    

    return () => {
      if(event.week === "curr" && event.state !== "view") {
        container.current.removeEventListener("pointerdown", pointerDown)
        container.current.removeEventListener("pointermove", pointerMove)
        container.current.removeEventListener("pointerup", pointerUp)
      }
    }
  }, [event.state, action])

  useEffect(() => {
    divRef.current.style.top = event.style.curr.top+"px" 
    divRef.current.style.left = event.style.curr.left+"px"
    divRef.current.style.height = event.style.curr.height+"px"
    divRef.current.style.width = event.style.curr.width+"px"
  }, [event.style.curr, event.style.prev])


 


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
    const columnWidth = width / period
    const rowHeight = height / 24 / 6
    const columnIndex = Math.floor(mouseX/columnWidth)
    const rowIndex = Math.floor(mouseY/rowHeight)
    const topRowIndex = Math.round(top/rowHeight)
    const bottomRowIndex = Math.round(bottom/rowHeight)
    
    const maxRow = Math.floor(height/rowHeight)
    if(columnIndex >= 0 && columnIndex <= 6) {
      setStyle(event._id, columnIndex*columnWidth, event.style.curr.top, event.style.curr.height, event.style.curr.width)
    }
    if(rowIndex >= 0 && rowIndex+(bottomRowIndex-topRowIndex) <= maxRow) {
      setStyle(event._id, event.style.curr.left, Math.floor(rowIndex*rowHeight), event.style.curr.height, event.style.curr.width)
    } else if(rowIndex+(bottomRowIndex-topRowIndex) > maxRow) {
      setStyle(event._id, event.style.curr.left, floor((maxRow-(bottomRowIndex-topRowIndex))*rowHeight), event.style.curr.height, event.style.curr.width)
    }

    if(!action.commit) {
      setAction({...action, commit: true})
    }

  }


  let prevRowIndex 
  let prevColumnIndex 
  const move = (e) => {
    const mouseX = e.clientX - container.current.getBoundingClientRect().left    
    const mouseY = e.clientY - container.current.getBoundingClientRect().top - initialOffsetY
    const top = divRef.current.getBoundingClientRect().top - container.current.getBoundingClientRect().top
    const bottom = divRef.current.getBoundingClientRect().top+divRef.current.offsetHeight - container.current.getBoundingClientRect().top
    const width = container.current.offsetWidth
    const height = container.current.offsetHeight
    const columnWidth = width / period
    const rowHeight = height / 24 / 6
    const columnIndex = Math.floor(mouseX/columnWidth)
    const rowIndex = Math.floor(mouseY/rowHeight)
    const topRowIndex = Math.round(top/rowHeight)
    const bottomRowIndex = Math.round(bottom/rowHeight)
    
    const maxRow = Math.floor(height/rowHeight)
    if(prevColumnIndex !== columnIndex && columnIndex >= 0 && columnIndex <= 6) {
      updateSelectTime(topRowIndex, rowHeight)
      setStyle(event._id, columnIndex*columnWidth, event.style.curr.top, event.style.curr.height, event.style.curr.width)
    }
    if(prevRowIndex !== rowIndex && rowIndex >= 0 && rowIndex+(bottomRowIndex-topRowIndex) <= maxRow) {
      updateSelectTime(topRowIndex, rowHeight)
      setStyle(event._id, event.style.curr.left, Math.floor(rowIndex*rowHeight), event.style.curr.height, event.style.curr.width)
    }
    prevRowIndex = rowIndex
    prevColumnIndex = columnIndex

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
      setStyle(event._id, event.style.curr.left, rowIndex*rowHeight, (bottomRowIndex-rowIndex)*rowHeight, event.style.curr.width)
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
      setStyle(event._id, event.style.curr.left, top, (rowIndex-topRowIndex)*rowHeight, event.style.curr.width)
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
    if(event.state !== "view" && e.target.matches(".calendar_event")) {
      pointerAction = "move"
    } else if(event.state !== "view" && e.target.matches(".calendar_event .top_slider")) {
      pointerAction = "slideUp"
    } else if(event.state !== "view" && e.target.matches(".calendar_event .bottom_slider")) {
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
  
    if(!action.commit && pointerAction) {
      console.log("asd");
      setAction({...action, commit: true})
    }

    const finalMouseX = e.clientX
    const finalMouseY = e.clientY
    if((event.state === "create" && action.commit || event.state === "edit")
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
    <div ref={divRef} className={"calendar_event "+(event.state==="view"?"view":"edit")} data-id={event._id} >
      {event.state === "view" && <p className={"text-14-regular "+color()}>{event.title}</p>}
      <div className="top_slider"></div>
      <div className="bottom_slider"></div>
      <div className="wrapper"></div>
    </div>
  )
}

export default CalendarEvent