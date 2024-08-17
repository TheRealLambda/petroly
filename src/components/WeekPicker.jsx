import { useEffect, useState } from "react"
import "./styles/week_picker.css"
import axios from "axios"

const WeekPicker = ({ dotsObject, week }) => {

  useEffect(() => {

    document.getElementById("monthText").innerText = (() => {
      const now = new Date()
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
      const day = firstDayOfYear.getDay()
      const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
      const sunday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7)
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      if(week > -1) { 
        return months[sunday.getMonth()]
      } else {
        return months[sunday.getMonth()].substring(0, 3)+" "+sunday.getFullYear()
      }
    })()
    document.getElementById("week_picker_wrapper").scrollTo({ behavior: "instant", left: 360})
    // resetSchedule()
    
  }, [week])

  const renderDots = (n) => {
    const array = []
    for (let i = 0; i < n; i++) {
      array.push(<div key={i}></div>)
    }
    return array
  }

  let todayPrev
  let todayCurrent
  let todayNext
  const prevWeekDays2 = () => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
    const sunday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7)
    const monday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+1)
    const tuesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+2)
    const wednesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+3)
    const thursday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+4)
    const friday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+5)
    const saturday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+6)
    todayPrev = now.getTime()===sunday.getTime()?0:now.getTime()===monday.getTime()?1:now.getTime()===tuesday.getTime()?2:now.getTime()===wednesday.getTime()?3:now.getTime()===thursday.getTime()?4:now.getTime()===friday.getTime()?5:now.getTime()===saturday.getTime()?6:null 
  }
  const activeWeekDays2 = () => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
    const sunday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7)
    const monday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+1)
    const tuesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+2)
    const wednesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+3)
    const thursday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+4)
    const friday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+5)
    const saturday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+6)
    todayCurrent = now.getTime()===sunday.getTime()?0:now.getTime()===monday.getTime()?1:now.getTime()===tuesday.getTime()?2:now.getTime()===wednesday.getTime()?3:now.getTime()===thursday.getTime()?4:now.getTime()===friday.getTime()?5:now.getTime()===saturday.getTime()?6:null 
  }
  const nextWeekDays2 = () => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
    const sunday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7)
    const monday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+1)
    const tuesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+2)
    const wednesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+3)
    const thursday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+4)
    const friday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+5)
    const saturday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+6)
    todayNext = now.getTime()===sunday.getTime()?0:now.getTime()===monday.getTime()?1:now.getTime()===tuesday.getTime()?2:now.getTime()===wednesday.getTime()?3:now.getTime()===thursday.getTime()?4:now.getTime()===friday.getTime()?5:now.getTime()===saturday.getTime()?6:null 
  }
  prevWeekDays2();activeWeekDays2();nextWeekDays2()
  const prevWeekDays = () => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
    const sunday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7)
    const monday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+1)
    const tuesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+2)
    const wednesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+3)
    const thursday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+4)
    const friday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+5)
    const saturday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+6)
    return [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
  }
  const activeWeekDays = () => {
    const now = new Date()
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
    const sunday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7)
    const monday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+1)
    const tuesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+2)
    const wednesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+3)
    const thursday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+4)
    const friday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+5)
    const saturday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+6)
    return [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
  }
  const nextWeekDays = () => {
    const now = new Date()
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
    const sunday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7)
    const monday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+1)
    const tuesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+2)
    const wednesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+3)
    const thursday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+4)
    const friday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+5)
    const saturday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+6)
    return [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
  }

  return (
    <div id="week_picker_wrapper" className="week_picker_wrapper bgcolor-BG">
      <div className="container">
        <div id="first" className="week_picker">
          <div className="flex_container">
            <div className={"week_day"+(todayPrev===0?" today":"")} data-date={prevWeekDays()[0].getFullYear()+"-"+(prevWeekDays()[0].getMonth()+1)+"-"+prevWeekDays()[0].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[0].getDate()}</p>
              </div>
            </div>
            <div className={"week_day"+(todayPrev===1?" today":"")} data-date={prevWeekDays()[1].getFullYear()+"-"+(prevWeekDays()[1].getMonth()+1)+"-"+prevWeekDays()[1].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">M</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[1].getDate()}</p>
              </div>
            </div>
            <div className={"week_day"+(todayPrev===2?" today":"")} data-date={prevWeekDays()[2].getFullYear()+"-"+(prevWeekDays()[2].getMonth()+1)+"-"+prevWeekDays()[2].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[2].getDate()}</p>
              </div>
            </div>
            <div className={"week_day"+(todayPrev===3?" today":"")} data-date={prevWeekDays()[3].getFullYear()+"-"+(prevWeekDays()[3].getMonth()+1)+"-"+prevWeekDays()[3].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">W</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[3].getDate()}</p>
              </div>
            </div>
            <div className={"week_day"+(todayPrev===4?" today":"")} data-date={prevWeekDays()[4].getFullYear()+"-"+(prevWeekDays()[4].getMonth()+1)+"-"+prevWeekDays()[4].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[4].getDate()}</p>
              </div>
            </div>
            <div className={"week_day"+(todayPrev===5?" today":"")} data-date={prevWeekDays()[5].getFullYear()+"-"+(prevWeekDays()[5].getMonth()+1)+"-"+prevWeekDays()[5].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">F</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[5].getDate()}</p>
              </div>
            </div>
            <div className={"week_day"+(todayPrev===6?" today":"")} data-date={prevWeekDays()[6].getFullYear()+"-"+(prevWeekDays()[6].getMonth()+1)+"-"+prevWeekDays()[6].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[6].getDate()}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="active" className="week_picker">
          <div className="flex_container">
            <div className={"week_day"+(todayCurrent===0?" today":"")} data-date={activeWeekDays()[0].getFullYear()+"-"+(activeWeekDays()[0].getMonth()+1)+"-"+activeWeekDays()[0].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[0].getDate()}</p>
              </div>
              <div className="dots">
                {dotsObject.current && renderDots(dotsObject.current[0])}
              </div>
            </div>
            <div className={"week_day"+(todayCurrent===1?" today":"")} data-date={activeWeekDays()[1].getFullYear()+"-"+(activeWeekDays()[1].getMonth()+1)+"-"+activeWeekDays()[1].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">M</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[1].getDate()}</p>
              </div>
              <div className="dots">
                {dotsObject.current && renderDots(dotsObject.current[1])}
              </div>
            </div>
            <div className={"week_day"+(todayCurrent===2?" today":"")} data-date={activeWeekDays()[2].getFullYear()+"-"+(activeWeekDays()[2].getMonth()+1)+"-"+activeWeekDays()[2].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[2].getDate()}</p>
              </div>
              <div className="dots">
                {dotsObject.current && renderDots(dotsObject.current[2])}
              </div>
            </div>
            <div className={"week_day"+(todayCurrent===3?" today":"")} data-date={activeWeekDays()[3].getFullYear()+"-"+(activeWeekDays()[3].getMonth()+1)+"-"+activeWeekDays()[3].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">W</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[3].getDate()}</p>
              </div>
              <div className="dots">
                {dotsObject.current && renderDots(dotsObject.current[3])}
              </div>
            </div>
            <div className={"week_day"+(todayCurrent===4?" today":"")} data-date={activeWeekDays()[4].getFullYear()+"-"+(activeWeekDays()[4].getMonth()+1)+"-"+activeWeekDays()[4].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[4].getDate()}</p>
              </div>
              <div className="dots">
                {dotsObject.current && renderDots(dotsObject.current[4])}
              </div>
            </div>
            <div className={"week_day"+(todayCurrent===5?" today":"")} data-date={activeWeekDays()[5].getFullYear()+"-"+(activeWeekDays()[5].getMonth()+1)+"-"+activeWeekDays()[5].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">F</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[5].getDate()}</p>
              </div>
              <div className="dots">
                {dotsObject.current && renderDots(dotsObject.current[5])}
              </div>
            </div>
            <div className={"week_day"+(todayCurrent===6?" today":"")} data-date={activeWeekDays()[6].getFullYear()+"-"+(activeWeekDays()[6].getMonth()+1)+"-"+activeWeekDays()[6].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[6].getDate()}</p>
              </div>
              <div className="dots">
                {dotsObject.current && renderDots(dotsObject.current[6])}
              </div>
            </div>
          </div>
        </div>
        <div id="last" className="week_picker">
          <div className="flex_container">
            <div className={"week_day"+(todayNext===0?" today":"")} data-date={nextWeekDays()[0].getFullYear()+"-"+(nextWeekDays()[0].getMonth()+1)+"-"+nextWeekDays()[0].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[0].getDate()}</p>
              </div>
            </div>
            <div className={"week_day"+(todayNext===1?" today":"")} data-date={nextWeekDays()[1].getFullYear()+"-"+(nextWeekDays()[1].getMonth()+1)+"-"+nextWeekDays()[1].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">M</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[1].getDate()}</p>
              </div>
            </div>
            <div className={"week_day"+(todayNext===2?" today":"")} data-date={nextWeekDays()[2].getFullYear()+"-"+(nextWeekDays()[2].getMonth()+1)+"-"+nextWeekDays()[2].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[2].getDate()}</p>
              </div>
            </div>
            <div className={"week_day"+(todayNext===3?" today":"")} data-date={nextWeekDays()[3].getFullYear()+"-"+(nextWeekDays()[3].getMonth()+1)+"-"+nextWeekDays()[3].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">W</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[3].getDate()}</p>
              </div>
            </div>
            <div className={"week_day"+(todayNext===4?" today":"")} data-date={nextWeekDays()[4].getFullYear()+"-"+(nextWeekDays()[4].getMonth()+1)+"-"+nextWeekDays()[4].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[4].getDate()}</p>
              </div>
            </div>
            <div className={"week_day"+(todayNext===5?" today":"")} data-date={nextWeekDays()[5].getFullYear()+"-"+(nextWeekDays()[5].getMonth()+1)+"-"+nextWeekDays()[5].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">F</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[5].getDate()}</p>
              </div>
            </div>
            <div className={"week_day"+(todayNext===6?" today":"")} data-date={nextWeekDays()[6].getFullYear()+"-"+(nextWeekDays()[6].getMonth()+1)+"-"+nextWeekDays()[6].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[6].getDate()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeekPicker