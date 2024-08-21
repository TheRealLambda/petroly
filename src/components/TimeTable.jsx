import { useEffect, useRef, useState } from "react"
import "./styles/time_table.css"
import WeekPicker from "./WeekPicker"
import CalendarEvent from "./CalendarEvent"
import Modal from "./Modal"
import axios from "axios"

const TimeTable = ({ dotsObject, setWeek, parentState, setParentState, modalState, setModalState, action, setAction, setStyle }) => {


  

  


  




  const renderVerticalLines = () => {
    const array = []
    for (let i = 0; i < parentState.period; i++) {
      array.push(<div key={i+"000"}></div>)
    }
    return array
  }
  
  return (
    <div className="time_table bgcolor-white">
    
      <div className="div1">
        <div className="bgcolor-BG"></div>
        <p className="text-12-semibold color-accent"></p>
        <p className="text-12-semibold color-accent">01:00</p>
        <p className="text-12-semibold color-accent">02:00</p>
        <p className="text-12-semibold color-accent">03:00</p>
        <p className="text-12-semibold color-accent">04:00</p>
        <p className="text-12-semibold color-accent">05:00</p>
        <p className="text-12-semibold color-accent">06:00</p>
        <p className="text-12-semibold color-accent">07:00</p>
        <p className="text-12-semibold color-accent">08:00</p>
        <p className="text-12-semibold color-accent">09:00</p>
        <p className="text-12-semibold color-accent">10:00</p>
        <p className="text-12-semibold color-accent">11:00</p>
        <p className="text-12-semibold color-accent">12:00</p>
        <p className="text-12-semibold color-accent">13:00</p>
        <p className="text-12-semibold color-accent">14:00</p>
        <p className="text-12-semibold color-accent">15:00</p>
        <p className="text-12-semibold color-accent">16:00</p>
        <p className="text-12-semibold color-accent">17:00</p>
        <p className="text-12-semibold color-accent">18:00</p>
        <p className="text-12-semibold color-accent">19:00</p>
        <p className="text-12-semibold color-accent">20:00</p>
        <p className="text-12-semibold color-accent">21:00</p>
        <p className="text-12-semibold color-accent">22:00</p>
        <p className="text-12-semibold color-accent">23:00</p>
        <p id="selectTime" className="text-12-semibold color-primary"></p>
        <p id="currentTime" className="text-12-semibold color-accent"></p>
      </div>
      <div id="div2_wrapper" className="div2_wrapper">
        <WeekPicker dotsObject={dotsObject} parentState={parentState} setWeek={setWeek} />
        <div id="div2_wrapperContainer" className="container">
          <div className="div2">
            <div className="horizontal_lines">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="vertical_lines">
              <div></div>
              {renderVerticalLines()}
            </div>
            {parentState.events.map((event) => event.week === "prev" ? <CalendarEvent key={event._id} event={event} /> : false)}
          </div>
          <div id="clickContainer" className="div2">
            <div className="horizontal_lines">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="vertical_lines">
              <div></div>
              {renderVerticalLines()}
            </div>
            {parentState.events.map((event) => event.week === "curr" ? <CalendarEvent key={event._id} period={parentState.period} event={event} action={action} setAction={setAction} setStyle={setStyle} /> : false)}
          </div>
          <div className="div2">
            <div className="horizontal_lines">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="vertical_lines">
              <div></div>
              {renderVerticalLines()}
            </div>
            {parentState.events.map((event) => event.week === "next" ? <CalendarEvent key={event._id} event={event} /> : false)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeTable