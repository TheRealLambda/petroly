import { useEffect, useRef, useState } from "react"
import "./styles/calendar_event.css"

const CalendarEvent = ({ initialPosition, editing }) => {

  const [state, setState] = useState("view")
  const [position, setPosition] = useState(initialPosition || {left: 0, top: 0})
  const divRef = useRef(null)

  useEffect(() => {
    if(editing) {
      setState("edit")
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



  



  return (
    <div ref={divRef} className="calendar_event">
      <div className="top_slider"></div>
      <div className="bottom_slider"></div>
    </div>
  )
}

export default CalendarEvent