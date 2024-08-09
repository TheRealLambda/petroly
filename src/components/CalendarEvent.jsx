import { useEffect, useState } from "react"
import "./styles/calendar_event.css"

const CalendarEvent = ({ initialPosition }) => {

  const [state, setState] = useState("edit")
  const [position, setPosition] = useState(initialPosition || {left: 0, top: 0})

  useEffect(() => {
    console.log("state");
  }, [state])

  useEffect(() => {
    console.log("position");
  }, [position])

  return (
    <div className="calendar_event edit">
      <div className="top_slider"></div>
      <div className="bottom_slider"></div>
    </div>
  )
}

export default CalendarEvent