import { useEffect, useRef, useState } from "react"
import "./styles/calendar_event.css"

const CalendarEvent = ({ initialPosition, editing }) => {

  const [state, setState] = useState(editing ? "edit" : "view")
  const [position, setPosition] = useState(initialPosition || {left: 0, top: 0})
  const [event, setEvent] = useState(null)
  const divRef = useRef(null)

  let container
  let pointerAction = null
  let initialMouseY
  let initialOffsetY
  let initialHeight

  useEffect(() => {
    container = document.getElementById("clickContainer")
    container.addEventListener("pointerdown", pointerDown)
    container.addEventListener("pointermove", pointerMove)
    container.addEventListener("pointerup", pointerUp)

    return () => {
      container.removeEventListener("pointerdown", pointerDown)
      container.removeEventListener("pointermove", pointerMove)
      container.removeEventListener("pointerup", pointerUp)
    }
  }, [])

  useEffect(() => {
    if(state === "view") {
      divRef.current.classList.remove("edit")
      divRef.current.classList.add("view")
    } else if(state === "edit") {
      divRef.current.classList.remove("view")
      divRef.current.classList.add("edit")
    }
  }, [state])

  useEffect(() => {
    divRef.current.style.top = position.top+"px" 
    divRef.current.style.left = position.left+"px"
  }, [position])



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
    }
    if(rowIndex >= 0 && rowIndex+(bottomRowIndex-topRowIndex) <= maxRow) {
      divRef.current.style.top = Math.floor(rowIndex*rowHeight)+"px"
    }

  }
  
  const slideUp = (e) => {
    const mouseY = e.clientY - container.getBoundingClientRect().top - initialOffsetY
    const height = container.offsetHeight
    const divHeight = divRef.current.getBoundingClientRect().height
    const top = divRef.current.getBoundingClientRect().top - container.getBoundingClientRect().top
    const bottom = divRef.current.getBoundingClientRect().top+divHeight - container.getBoundingClientRect().top
    const rowHeight = height / 24 / 6
    const rowIndex = Math.floor(mouseY/rowHeight)
    const topRowIndex = Math.round(top/rowHeight)
    const bottomRowIndex = Math.round(bottom/rowHeight)
    
    const maxRow = Math.floor(height/rowHeight)
    if((bottomRowIndex-rowIndex) >= 1 && rowIndex >= 0 && bottomRowIndex <= maxRow) {
      divRef.current.style.top = rowIndex*rowHeight+"px"
      divRef.current.style.height = (bottomRowIndex-rowIndex)*rowHeight+"px"
    }
    
  }

  const slideDown = (e) => {
    const mouseY = e.clientY - container.getBoundingClientRect().top - initialOffsetY + initialHeight
    const height = container.offsetHeight
    const divHeight = divRef.current.getBoundingClientRect().height
    const top = divRef.current.getBoundingClientRect().top - container.getBoundingClientRect().top
    const rowHeight = height / 24 / 6
    const rowIndex = Math.floor(mouseY/rowHeight)
    const topRowIndex = Math.round(top/rowHeight)
    
    const bottom = divRef.current.getBoundingClientRect().top+divHeight - container.getBoundingClientRect().top
    const bottomRowIndex = Math.round(bottom/rowHeight)
    const maxRow = Math.floor(height/rowHeight)
    if((rowIndex-topRowIndex) >= 1 && rowIndex >= 0 && bottomRowIndex <= maxRow) {
      divRef.current.style.height = (rowIndex-topRowIndex)*rowHeight+"px"
    }

  }


  const pointerDown = (e) => {
    console.log(e.target);
    initialMouseY = e.clientY
    initialOffsetY = initialMouseY - divRef.current.getBoundingClientRect().top
    initialHeight = divRef.current.getBoundingClientRect().height
    if(e.target.matches(".calendar_event")) {
      pointerAction = "move"
    } else if(e.target.matches(".calendar_event .top_slider")) {
      pointerAction = "slideUp"
    } else if(e.target.matches(".calendar_event .bottom_slider")) {
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
  
    pointerAction = null
  
  }



  return (
    <div ref={divRef} className="calendar_event">
      <div className="top_slider"></div>
      <div className="bottom_slider"></div>
    </div>
  )
}

export default CalendarEvent