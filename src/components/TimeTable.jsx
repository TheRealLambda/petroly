import { useEffect, useRef, useState } from "react"
import "./styles/time_table.css"
import "./styles/week_picker.css"
import CalendarEvent from "./CalendarEvent"
import Modal from "./Modal"
import axios from "axios"

const TimeTable = ({ dotsObject, state, setState, setWeek, setModalState, action, setAction, setStyle }) => {



  const funcOne = (e) => {
    

    if(action.type === "create" && !action.commit && e.target.matches(".vertical_lines")) {
        const events = state.events.filter(event => event._id !== "0")
        const newState = {...state, events}
        setState(newState)
        setAction({type: "view", commit: false, event: action.event, options: {}})
        setModalState("closed")
    } else if(action.type === "view" && e.target.matches(".vertical_lines")) {
        const now = new Date()
      const container = document.getElementById("clickContainer")
      const mouseX = e.clientX - container.getBoundingClientRect().left
      const mouseY = e.clientY - container.getBoundingClientRect().top
      const height = container.offsetHeight
      const rowHeight = height / 24 / 2
      const rowIndex = Math.floor(mouseY/rowHeight)
      const hour = Math.floor(rowIndex/6)
      const minute = (rowIndex % 6)*10
      const width = container.offsetWidth
      const columnWidth = width / state.period
      const columnIndex = Math.floor(mouseX/columnWidth)
      const daysArray = []
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
      const temp = firstDayOfYear.getDay()
      const toFirstSundayOfYear = temp === 0 ? 0 : 7 - temp
        for (let i = 0; i < state.period; i++) {
          const element = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(state.week)*(state.period === 5 ? 7 : state.period)+i)
          daysArray.push(element)
        }
        const date = daysArray[columnIndex]
      const startDate = new Date(date)
      startDate.setHours(hour, minute)
      console.log("startDate", date);
      const rowIndexEnd = Math.round((mouseY+75)/rowHeight)
      const hourEnd = Math.floor(rowIndexEnd/6)
      const minuteEnd = (rowIndexEnd % 6)*10
      const endDate = new Date(date)
      endDate.setHours(hourEnd, minuteEnd)
      const event = {
        _id: "0",
        color: "#00a36c",
        title: "(no title)",
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        type: "event",
        state: "create",
        week: "curr",
        style: {curr: {left: columnIndex*columnWidth, top: rowIndex*rowHeight, height: 75, width: columnWidth}, prev: {left: columnIndex*columnWidth, top: rowIndex*rowHeight, height: 75, width: columnWidth}}
      }
      const events = state.events.concat(event)
      const newState = {...state, events}
      console.log(event);
      setState(newState)
      setAction({type: "create", commit: false, event})
      setModalState("partial")
    } else if(action.type === "view" && e.target.matches(".calendar_event.view .wrapper")) {
        //clicked on an event
        const clickedEventId = e.target.parentNode.getAttribute("data-id")
        const event = state.events.find(event => event._id === clickedEventId)
        const newAction = {type: "view", commit: false, event, options: {}}
        setAction(newAction)
        setModalState("partial")
        console.log("click", event);
    }

     
  }


  const div2Wrapper = useRef(null)
  const timetable = useRef(null)
  const container = useRef(null)
  let clicked = false
  let mouseDown = false
  let initialMouseX
  let initialMouseY
  let initialOffsetX
  let initialOffsetY
  let timeout
  let timeout2
  let lockHorizontalScrolling = false
  let lockScrolling = false
  let boolian = false


  const stateLeft = () => {
    container.current.style = ""
    timetable.current.style = ""
    container.current.classList.add("transition")
    timetable.current.classList.add("transition")
    lockScrolling = true
    clearTimeout(timeout2)
    timeout2 = setTimeout(() => {
      container.current.classList.remove("transition")
      timetable.current.classList.remove("transition")
      setWeek(-1)
      setModalState("closed")
    }, 200) // same time as transition duration
    container.current.classList.remove("middle")
    container.current.classList.remove("right")
    container.current.classList.add("left")
    timetable.current.classList.remove("middle")
    timetable.current.classList.remove("right")
    timetable.current.classList.add("left")
  }
  const stateMiddle = (trans) => {
    container.current.style = ""
    timetable.current.style = ""
    if(trans) {
      container.current.classList.add("transition")
      timetable.current.classList.add("transition")
      clearTimeout(timeout2)
      timeout2 = setTimeout(() => {
        container.current.classList.remove("transition")
        timetable.current.classList.remove("transition")
      }, 200) // same time as transition duration
    }
    container.current.classList.remove("left")
    container.current.classList.remove("right")
    container.current.classList.add("middle")
    timetable.current.classList.remove("left")
    timetable.current.classList.remove("right")
    timetable.current.classList.add("middle")
  }
  const stateRight = () => {
    container.current.style = ""
    timetable.current.style = ""
    container.current.classList.add("transition")
    timetable.current.classList.add("transition")
    lockScrolling = true
    clearTimeout(timeout2)
    timeout2 = setTimeout(() => {
      container.current.classList.remove("transition")
      timetable.current.classList.remove("transition")
      setWeek(1)
      setModalState("closed")
    }, 200) // same time as transition duration
    container.current.classList.remove("left")
    container.current.classList.remove("middle")
    container.current.classList.add("right")
    timetable.current.classList.remove("left")
    timetable.current.classList.remove("middle")
    timetable.current.classList.add("right")
  }
  

  const pointerDown = (e) => {
    
    initialMouseX = e.clientX
    initialMouseY = e.clientY
    initialOffsetX = e.clientX - container.current.getBoundingClientRect().left
                     + div2Wrapper.current.getBoundingClientRect().left
    initialOffsetY = document.getElementsByClassName("time_table")[0].scrollTop
    if(!lockScrolling && e.target.matches(".vertical_lines, .calendar_event .wrapper")) {
      mouseDown = true
    }
    clicked = true
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      clicked = false
    }, 500)
  }
  const pointerMove = (e) => {

    const mouseX = e.clientX
    const mouseY = e.clientY
    const left = (mouseX-initialOffsetX)
    const top = -(mouseY-initialMouseY)+initialOffsetY
    
    if(mouseDown && !boolian && (mouseY < initialMouseY-10 || mouseY > initialMouseY+10)) {
      //scroll vertically
      lockHorizontalScrolling = true
      boolian = true
    } else if(mouseDown && !boolian && (mouseX < initialMouseX-10 || mouseX > initialMouseX+10)) {
      //scroll horizontally
      lockHorizontalScrolling = false
      boolian = true
    }
    if(mouseDown && action.type === "view" && !lockHorizontalScrolling && boolian) {
      if(left <= 0 && left >= -600) {
        timetable.current.style.left = left+"px"
        container.current.style.left = left+"px"
      } else if(left > 0) {
        timetable.current.style.left = "0px"
        container.current.style.left = "0px"
      } else if(left < -600) {
        timetable.current.style.left = "-600px"
        container.current.style.left = "-600px"
      }
    }
    else if (mouseDown && lockHorizontalScrolling && boolian) {
      document.getElementsByClassName("time_table")[0].scrollTo({top: top})
    }
  }
  const pointerUp = (e) => {
    container.current.style.transition = ""
    document.getElementsByClassName("time_table")[0].style = ""
    const finalMouseX = e.clientX
    const left = finalMouseX-initialOffsetX
    if(clicked && action.type === "view" && boolian && !lockHorizontalScrolling && finalMouseX > initialMouseX) {
      //swipe left
      stateLeft()
    } else if(clicked && action.type === "view" && boolian && !lockHorizontalScrolling && finalMouseX < initialMouseX) {
      //swipe right
      stateRight()
    } else if(clicked && !boolian) {
      //click
      funcOne(e)
    } else if(boolian && action.type === "view" && !lockHorizontalScrolling && left > -150) {
      //drag to left
      stateLeft()
    } else if(boolian && action.type === "view" && !lockHorizontalScrolling && left < -450) {
      //drag to right
      stateRight()
    } else if(boolian && !lockHorizontalScrolling) {
      //drag to middle
      stateMiddle(true)
    }

    mouseDown = false
    lockHorizontalScrolling = false
    boolian = false
  }
  
  useEffect(() => {
    // div2Wrapper = document.getElementById("div2_wrapper")
    // container = document.getElementById("week_picker_wrapper").firstElementChild
    // timetable = document.getElementById("div2_wrapperContainer")
    div2Wrapper.current.addEventListener("pointerdown", pointerDown)
    div2Wrapper.current.addEventListener("pointermove", pointerMove)
    div2Wrapper.current.addEventListener("pointerup", pointerUp)

    stateMiddle()

    return () => {
      if(div2Wrapper.current) {
        div2Wrapper.current.removeEventListener("pointerdown", pointerDown)
        div2Wrapper.current.removeEventListener("pointermove", pointerMove)
        div2Wrapper.current.removeEventListener("pointerup", pointerUp)
      }
    }
  }, [state])


  let realWeek
    const firstDayOfYear = new Date(2024, 1-1, 1)
    const daysUntilFirstSunday = firstDayOfYear.getDay() === 0 ? 0 : 7-firstDayOfYear.getDay()
    
    //get first sunday after first day of year. Calculations will use this as the first day of the year
    const firstSundayOfYear = new Date(firstDayOfYear)
    firstSundayOfYear.setDate(firstSundayOfYear.getDate() + daysUntilFirstSunday)
    
    const day1 = new Date(firstSundayOfYear.getFullYear(), 0, firstSundayOfYear.getDate()+(state.week)*(state.period===5?7:state.period))
    const numberOfDays = (day1 - firstSundayOfYear) / (1*24*60*60*1000)
    realWeek = Math.floor(numberOfDays / 7)



  const renderVerticalLines = () => {
    const array = []
    for (let i = 0; i < state.period; i++) {
      array.push(<div key={i+"000"}></div>)
    }
    return array
  }






  useEffect(() => {

    document.getElementById("monthText").innerText = (() => {
      const now = new Date()
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
      const day = firstDayOfYear.getDay()
      const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
      const day1 = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(state.week)*(state.period===5?7:state.period))
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      if(state.week > -1) { 
        return months[day1.getMonth()]
      } else {
        return months[day1.getMonth()].substring(0, 3)+" "+day1.getFullYear()
      }
    })()
    document.getElementById("week_picker_wrapper").scrollTo({ behavior: "instant", left: 360})
    
  }, [state])

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
    
    for (let i = 0; i < state.period; i++) {
      const element = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(state.week-1)*(state.period===5?7:state.period)+i)
      daysPrev.push(element)
      if(now.getTime() === element.getTime()) {
        todayPrev = i
      }
    }

  }
  prevWeekDays()

  const currentWeekDays = () => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
    
    for (let i = 0; i < state.period; i++) {
      const element = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(state.week)*(state.period===5?7:state.period)+i)
      daysCurrent.push(element)
      if(now.getTime() === element.getTime()) {
        todayCurrent = i
      }
    }

  }
  currentWeekDays()

  const nextWeekDays = () => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
    
    for (let i = 0; i < state.period; i++) {
      const element = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(state.week+1)*(state.period===5?7:state.period)+i)
      daysNext.push(element)
      if(now.getTime() === element.getTime()) {
        todayNext = i
      }
    }

  }
  nextWeekDays()



  return (
    <div className="time_table bgcolor-white">
    
      <div className="div1">
        <div className="bgcolor-BG text-12-medium">week: {realWeek}</div>
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
      <div ref={div2Wrapper} id="div2_wrapper" className="div2_wrapper">
        <div id="week_picker_wrapper" className="week_picker_wrapper bgcolor-BG">
          <div ref={container} className="container">
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
                        {renderDots(dotsObject.prev[i])}
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
                        {renderDots(dotsObject.curr[i])}
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
                        {renderDots(dotsObject.next[i])}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div ref={timetable} id="div2_wrapperContainer" className="container">
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
            {state.events.map((event) => event.week === "prev" ? <CalendarEvent key={event._id} event={event} /> : false)}
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
            {state.events.map((event) => event.week === "curr" ? <CalendarEvent key={event._id} period={state.period} event={event} action={action} setAction={setAction} setStyle={setStyle} /> : false)}
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
            {state.events.map((event) => event.week === "next" ? <CalendarEvent key={event._id} event={event} /> : false)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeTable