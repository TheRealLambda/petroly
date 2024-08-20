import { useEffect, useState } from "react"
import "./styles/week_picker.css"
import axios from "axios"

const WeekPicker = ({ dotsObject, parentState }) => {
  useEffect(() => {

    document.getElementById("monthText").innerText = (() => {
      const now = new Date()
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
      const day = firstDayOfYear.getDay()
      const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
      const day1 = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(parentState.week)*parentState.period)
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      if(parentState.week > -1) { 
        return months[day1.getMonth()]
      } else {
        return months[day1.getMonth()].substring(0, 3)+" "+day1.getFullYear()
      }
    })()
    document.getElementById("week_picker_wrapper").scrollTo({ behavior: "instant", left: 360})
    // resetSchedule()
    
  }, [parentState])

  const renderDots = (n) => {
    const array = []
    for (let i = 0; i < n; i++) {
      array.push(<div key={i+"04"}></div>)
    }
    return array
  }

  let todayPrev
  let todayCurrent
  let todayNext
  const daysPrev = []
  const daysCurrent = []
  const daysNext = []

  const prevWeekDays = () => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
    
    for (let i = 0; i < (parentState.period===5?7:parentState.period); i++) {
      const element = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(parentState.week-1)*(parentState.period===5?7:parentState.period)+i)
      daysPrev.push(element)
      if(now.getTime() === element.getTime()) {
        todayPrev = i
      }
    }
    daysPrev.pop()
    daysPrev.pop()
  }
  prevWeekDays()

  const currentWeekDays = () => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
    
    for (let i = 0; i < (parentState.period===5?7:parentState.period); i++) {
      const element = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(parentState.week)*(parentState.period===5?7:parentState.period)+i)
      daysCurrent.push(element)
      if(now.getTime() === element.getTime()) {
        todayCurrent = i
      }
    }
    daysCurrent.pop()
    daysCurrent.pop()
  }
  currentWeekDays()

  const nextWeekDays = () => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
    
    for (let i = 0; i < (parentState.period===5?7:parentState.period); i++) {
      const element = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(parentState.week+1)*(parentState.period===5?7:parentState.period)+i)
      daysNext.push(element)
      if(now.getTime() === element.getTime()) {
        todayNext = i
      }
    }
    daysNext.pop()
    daysNext.pop()
  }
  nextWeekDays()

  return (
    <div id="week_picker_wrapper" className="week_picker_wrapper bgcolor-BG">
      <div className="container">
        <div id="first" className="week_picker">
          <div className="flex_container">
            {daysPrev.map((day,i) => {
              return (
                <div key={i+"01"} className={"week_day"+(todayPrev===i?" today":"")} data-date={day.toISOString()}>
                  <div className="day_name">  
                    <p className="text-14-semibold color-accent">{
                      ["S","M","T","W","T","F","S"][day.getDay()]
                    }</p>
                  </div>
                  <div className="day_number">
                    <p className="text-14-medium color-accent">{day.getDate()}</p>
                  </div>
                  <div className="dots">
                    {renderDots(dotsObject.current.prev[i])}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div id="active" className="week_picker">
          <div className="flex_container">
            {daysCurrent.map((day,i) => {
              return (
                <div key={i+"02"} className={"week_day"+(todayCurrent===i?" today":"")} data-date={day.toISOString()}>
                  <div className="day_name">  
                    <p className="text-14-semibold color-accent">{
                      ["S","M","T","W","T","F","S"][day.getDay()]
                    }</p>
                  </div>
                  <div className="day_number">
                    <p className="text-14-medium color-accent">{day.getDate()}</p>
                  </div>
                  <div className="dots">
                    {renderDots(dotsObject.current.curr[i])}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div id="last" className="week_picker">
          <div className="flex_container">
            {daysNext.map((day,i) => {
              return (
                <div key={i+"03"} className={"week_day"+(todayNext===i?" today":"")} data-date={day.toISOString()}>
                  <div className="day_name">  
                    <p className="text-14-semibold color-accent">{
                      ["S","M","T","W","T","F","S"][day.getDay()]
                    }</p>
                  </div>
                  <div className="day_number">
                    <p className="text-14-medium color-accent">{day.getDate()}</p>
                  </div>
                  <div className="dots">
                    {renderDots(dotsObject.current.next[i])}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeekPicker