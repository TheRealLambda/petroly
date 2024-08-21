import MenuBar from "./MenuBar"
import WeekPicker from "./WeekPicker"
import NavBar from "./NavBar"
import "./styles/schedule_page.css"
import TimeTable from "./TimeTable"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import CreateEventForm from "./CreateEventForm"
import ShowEventForm from "./ShowEventForm"
import EditEventForm from "./EditEventForm"
import Modal from "./Modal"



const SchedulePage = () => {

  const [state, setState] = useState({week: 0, period: 7, events: []})
  const [modalState, setModalState] = useState("closed")
  const [action, setAction] = useState({type: "view", commit: false, event: {_id:"",title:"loading",color:"#00a36c"}, options: {}})
  const dotsObject = useRef({prev: [0,0,0,0,0,0,0], curr: [0,0,0,0,0,0,0], next: [0,0,0,0,0,0,0]})
  

    const updateEvent = async (id, color, title, start_time, end_time) => {
        console.log("updateEVent(");
        
        if(action.type === "edit") {
            const result = await axios.patch("http://localhost:3001/api/events/"+id, {color, title, start_time, end_time})

            const events = state.events.map(event => {
                const newEvent = {...event}
                if(newEvent._id === id) {

                    newEvent.state = "view"
                    newEvent.color = color
                    newEvent.title = title
                    newEvent.start_time = start_time
                    newEvent.end_time = end_time
                }
                return newEvent
            })
            setState({...state, events})
            setModalState("closed")
            setAction({type: "view", commit: false, event: {_id:"",title:"loading",color:"#00a36c"}, options: {}})
        } else if(action.type === "create") {
            const result = await axios.post("http://localhost:3001/api/events/", {color, title, start_time, end_time})

            const events = state.events.map(event => {
                const newEvent = {...event}
                if(newEvent._id === id) {
                    newEvent.state = "view"
                    newEvent._id = result.data._id
                    newEvent.state = "view"
                    newEvent.color = color
                    newEvent.title = title
                    newEvent.start_time = start_time
                    newEvent.end_time = end_time
                }
                return newEvent
            })
            setState({...state, events})
            setModalState("closed")
            setAction({type: "view", commit: false, event: {_id:"",title:"loading",color:"#00a36c"}, options: {}})
        }
    }

  const setStyle = (id, left, top, height, width) => {
    console.log(id, left, top, height, width);
      const events = state.events.map(event => {
          const newEvent = {...event}
          if(newEvent._id === id) {
            newEvent.style.curr = {left, top, height, width}
        }
        return newEvent
    })
    const newState = {...state, events}
    setState(newState)
  }

  const changeToEdit = (id) => {
    const events = state.events.map(event => {
        const newEvent = {...event}
        if(newEvent._id === id) {
            newEvent.state = "edit"
        }
        return newEvent 
    })
    const newState = {...state, events}
    setState(newState)
    setAction({type: "edit", commit: false, event: action.event, options: action.options})
    setModalState("open")
  }

  const closeModal = () => {
    if(action.type === "create") {
        if(action.commit) {
            if(confirm("dismiss event?")) {
                const events = state.events.filter(event => event._id !== "0")
                const newState = {...state, events}
                setState(newState)
                setAction({type: "view", commit: false, event: action.event, options: {}})
                setModalState("closed")
            }
        } else {
            const events = state.events.filter(event => event._id !== "0")
            const newState = {...state, events}
            setState(newState)
            setAction({type: "view", commit: false, event: action.event, options: {}})
            setModalState("closed")
        }
        
    } else {
      if(action.commit) {
          if(confirm("Dismiss changes?")) {
              const events = state.events.map(event => {
                  const newEvent = {...event}
                  if(newEvent._id === action.event._id) {
                      newEvent.style.curr = newEvent.style.prev
                      newEvent.state = "view"
                  }
                  return newEvent
              })
              setState({...state, events})
              setModalState("closed")
              setAction({type: "view", commit: false, event: {_id:"",title:"loading",color:"#00a36c"}, options: {}})
          }
      } else {
          const events = state.events.map(event => {
              const newEvent = {...event}
              if(newEvent._id === action.event._id) {
                  newEvent.state = "view"
              }
              return newEvent
          })
          setState({...state, events})
          setModalState("closed")
          setAction({type: "view", commit: false, event: {_id:"",title:"loading",color:"#00a36c"}, options: {}})
          setModalState("closed")
      }
    }
  }

  const deleteEvent = (id) => {
    const events = state.events.filter(event => event._id !== id)
    const newState = {...state, events}
    setState(newState)
    setModalState("closed")
  }


  const funcOne = (e) => {
    

    if(action.type === "create" && !action.commit && e.target.matches(".vertical_lines")) {
        const events = state.events.filter(event => event._id !== "0")
        const newState = {...state, events}
        setState(newState)
        setAction({type: "view", commit: false, event: action.event, options: {}})
        setModalState("closed")
    } else if(action.type === "view" && e.target.matches(".vertical_lines")) {
        const now = new Date(   )
      const container = document.getElementById("clickContainer")
      const mouseX = e.clientX - container.getBoundingClientRect().left
      const mouseY = e.clientY - container.getBoundingClientRect().top
      const height = container.offsetHeight
      const rowHeight = height / 24 / 6
      const rowIndex = Math.round(mouseY/rowHeight)
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
        setAction({type: "view", commit: false, event})
        setModalState("partial")
    }

     
  }


  let weekPicker
  let timetable
  let container
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
    container.style = ""
    timetable.style = ""
    container.classList.add("transition")
    timetable.classList.add("transition")
    lockScrolling = true
    clearTimeout(timeout2)
    timeout2 = setTimeout(() => {
      container.classList.remove("transition")
      timetable.classList.remove("transition")
      setWeek(-1)
    }, 200) // same time as transition duration
    container.classList.remove("middle")
    container.classList.remove("right")
    container.classList.add("left")
    timetable.classList.remove("middle")
    timetable.classList.remove("right")
    timetable.classList.add("left")
  }
  const stateMiddle = (trans) => {
    container.style = ""
    timetable.style = ""
    if(trans) {
      container.classList.add("transition")
      timetable.classList.add("transition")
      clearTimeout(timeout2)
      timeout2 = setTimeout(() => {
        container.classList.remove("transition")
        timetable.classList.remove("transition")
      }, 200) // same time as transition duration
    }
    container.classList.remove("left")
    container.classList.remove("right")
    container.classList.add("middle")
    timetable.classList.remove("left")
    timetable.classList.remove("right")
    timetable.classList.add("middle")
  }
  const stateRight = () => {
    container.style = ""
    timetable.style = ""
    container.classList.add("transition")
    timetable.classList.add("transition")
    lockScrolling = true
    clearTimeout(timeout2)
    timeout2 = setTimeout(() => {
      container.classList.remove("transition")
      timetable.classList.remove("transition")
      setWeek(1)
    }, 200) // same time as transition duration
    container.classList.remove("left")
    container.classList.remove("middle")
    container.classList.add("right")
    timetable.classList.remove("left")
    timetable.classList.remove("middle")
    timetable.classList.add("right")
  }
  

  const pointerDown = (e) => {
    
    initialMouseX = e.clientX
    initialMouseY = e.clientY
    initialOffsetX = e.clientX - container.getBoundingClientRect().left
                     + weekPicker.getBoundingClientRect().left
    initialOffsetY = document.getElementsByClassName("time_table")[0].scrollTop
    if(!lockScrolling && action.type === "view" && e.target.matches(".vertical_lines, .calendar_event .wrapper")) {
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
    if(mouseDown && !lockHorizontalScrolling && boolian) {
      if(left <= 0 && left >= -600) {
        timetable.style.left = left+"px"
        container.style.left = left+"px"
      } else if(left > 0) {
        timetable.style.left = "0px"
        container.style.left = "0px"
      } else if(left < -600) {
        timetable.style.left = "-600px"
        container.style.left = "-600px"
      }
    }
    else if (mouseDown && lockHorizontalScrolling && boolian) {
      document.getElementsByClassName("time_table")[0].scrollTo({top: top})
    }
  }
  const pointerUp = (e) => {
    container.style.transition = ""
    document.getElementsByClassName("time_table")[0].style = ""
    const finalMouseX = e.clientX
    const left = finalMouseX-initialOffsetX
    if(clicked && boolian && !lockHorizontalScrolling && finalMouseX > initialMouseX) {
      //swipe left
      stateLeft()
    } else if(clicked && boolian && !lockHorizontalScrolling && finalMouseX < initialMouseX) {
      //swipe right
      stateRight()
    } else if(clicked && !boolian) {
      //click
      funcOne(e)
    } else if(boolian && !lockHorizontalScrolling && left > -150) {
      //drag to left
      stateLeft()
    } else if(boolian && !lockHorizontalScrolling && left < -450) {
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
    weekPicker = document.getElementById("div2_wrapper")
    container = document.getElementById("week_picker_wrapper").firstElementChild
    timetable = document.getElementById("div2_wrapperContainer")
    weekPicker.addEventListener("pointerdown", pointerDown)
    weekPicker.addEventListener("pointermove", pointerMove)
    weekPicker.addEventListener("pointerup", pointerUp)

    stateMiddle()

    return () => {
      weekPicker.removeEventListener("pointerdown", pointerDown)
      weekPicker.removeEventListener("pointermove", pointerMove)
      weekPicker.removeEventListener("pointerup", pointerUp)
    }
  }, [state])







  const getEvents = async (week, period) => {

    const dots = {prev: [0,0,0,0,0,0,0], curr: [0,0,0,0,0,0,0], next: [0,0,0,0,0,0,0]}

    const result = await axios.get("http://localhost:3001/api/events?week="+week+"&period="+(period === 5 ? 7 : period))

    const modifiedResult = result.data.map(event => {
      if(period === 5 && (new Date(event.start_time).getDay() === 5 || new Date(event.start_time).getDay() === 6)) {
        return null
      }
      const container = document.getElementById("clickContainer")
      const width = container.offsetWidth
      const height = container.offsetHeight
      const columnWidth = width / period
      const rowHeight = height / 24 / 6
      
      const columnIndex = (() => {
        
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        
        const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
        const temp = firstDayOfYear.getDay()
        const toFirstSundayOfYear = temp === 0 ? 0 : 7 - temp
        
        const daysArray = []

        for (let i = 0; i < period; i++) {
          const element = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(event.week==="prev"?week-1:event.week==="curr"?week:event.week==="next"?week+1:null)*(period === 5 ? 7 : period)+i)
          daysArray.push(element)
        }

        let index
        daysArray.forEach((day, i) => {
          const date2 = new Date(event.start_time)
          date2.setHours(0, 0, 0, 0)
          if(day.getTime() === date2.getTime()) {
            index = i
            event.week==="prev"?dots.prev[i]+=1:event.week==="curr"?dots.curr[i]+=1:event.week==="next"?dots.next[i]+=1:null
          }
        })      
        return index
      })()

      const rowIndex = Math.floor((new Date(event.start_time).getHours()*60 + new Date(event.start_time).getMinutes()) / 10)
      const rowIndexEnd = Math.floor((new Date(event.end_time).getHours()*60 + new Date(event.end_time).getMinutes()) / 10)
      const divHeight = (rowIndexEnd-rowIndex)*rowHeight
      const style = {left: columnIndex*columnWidth, top: rowIndex*rowHeight, height: divHeight, width: columnWidth}
      return {...event, state: "view", style: {curr: style, prev: style}}
    }).filter(a => a !== null)
    
    dotsObject.current = dots
    // console.log(JSON.stringify(modifiedResult));
    return modifiedResult

  }

  const calculateWeek = (period) => {
    const firstDayOfYear = new Date(2024, 1-1, 1)
    const daysUntilFirstSunday = firstDayOfYear.getDay() === 0 ? 0 : 7-firstDayOfYear.getDay()
    
    //get first sunday after first day of year. Calculations will use this as the first day of the year
    const firstSundayOfYear = new Date(firstDayOfYear)
    firstSundayOfYear.setDate(firstSundayOfYear.getDate() + daysUntilFirstSunday)
    
    const selectedDate = new Date(firstSundayOfYear.getFullYear(), 1-1, 1+daysUntilFirstSunday+(state.week)*(state.period===5?7:state.period))
    const numberOfDays = (selectedDate.getTime() - firstSundayOfYear.getTime()) / (1*24*60*60*1000)
  
    const week = Math.floor(numberOfDays / period)
    return week
  }

  const setWeek = async (n) => {

    const events = await getEvents(state.week+n, state.period)
    const newState = {week: state.week+n, period: state.period, events}
    console.log(newState);
    setState(newState)
  }

  const resetWeek = () => {
    const firstDayOfYear = new Date(2024, 1-1, 1)
    const daysUntilFirstSunday = firstDayOfYear.getDay() === 0 ? 0 : 7-firstDayOfYear.getDay()
    
    //get first sunday after first day of year. Calculations will use this as the first day of the year
    const firstSundayOfYear = new Date(firstDayOfYear)
    firstSundayOfYear.setDate(firstSundayOfYear.getDate() + daysUntilFirstSunday)
    
    const currentDate = new Date()
    const numberOfDays = (currentDate - firstSundayOfYear) / (1*24*60*60*1000)
  
    const week = Math.floor(numberOfDays / period)
    const events = getEvents(week, period)

    const newState = {week, period: state.period, events}
    setState(newState)
  }

  const setPeriod = async (period) => {
    const week = calculateWeek(period===5?7:period)
    const events = await getEvents(week, period)
    const newState = {week, period, events}
    setState(newState)
  }

  // useEffect(() => {
  //   setWeek(week => {
  //     const now = new Date()
  //     const firstDayOfYear = new Date(2024, 1-1, 1)
  //     const daysUntilFirstSunday = firstDayOfYear.getDay() === 0 ? 0 : 7-firstDayOfYear.getDay()
      
  //     //get first sunday after first day of year. Calculations will use this as the first day of the year
  //     const firstSundayOfYear = new Date(firstDayOfYear)
  //     firstSundayOfYear.setDate(firstSundayOfYear.getDate() + daysUntilFirstSunday)
      
  //     const selectedDate = new Date(now.getFullYear(), 1-1, 1+daysUntilFirstSunday+(week)*period.prev)

  //     const numberOfDays = (selectedDate - firstSundayOfYear) / (1*24*60*60*1000)
    
  //     const numberOfWeeks = Math.floor(numberOfDays / period.current)
  //     return numberOfWeeks
  //   })
  // }, [period])


  const hideSideMenu = (event) =>{
    const page = document.getElementsByClassName("schedule_page")[0]
    page.classList.remove("side_menu_open")
    document.getElementById("menu_cover").style.height = "0px"
  }



  useEffect(() => {
    async function initializeEvents() {
      const firstDayOfYear = new Date(2024, 1-1, 1)
      const daysUntilFirstSunday = firstDayOfYear.getDay() === 0 ? 0 : 7-firstDayOfYear.getDay()
      
      //get first sunday after first day of year. Calculations will use this as the first day of the year
      const firstSundayOfYear = new Date(firstDayOfYear)
      firstSundayOfYear.setDate(firstSundayOfYear.getDate() + daysUntilFirstSunday)
      
      const currentDate = new Date()
      const numberOfDays = (currentDate - firstSundayOfYear) / (1*24*60*60*1000)
      
      const period = 7
      const week = Math.floor(numberOfDays / period)
      
      const events = await getEvents(week, period)
      setState({week, period, events})
    }
    initializeEvents()
  }, [])



  return (
    <div className="schedule_page">
      <div onClick={hideSideMenu} id="menu_cover"></div>

      <NavBar />
      <Modal state={modalState} setState={setModalState} options={action.options}>
        {
          action.type === "create" ? <EditEventForm state={state} event={action.event} setStyle={setStyle} action={action} setAction={setAction} updateEvent={updateEvent} closeModal={closeModal} /> :
          action.type === "view" ? <ShowEventForm event={action.event} changeToEdit={changeToEdit} closeModal={closeModal} deleteEvent={deleteEvent} /> :
          action.type === "edit" ? <EditEventForm state={state} event={action.event} action={action} setAction={setAction} updateEvent={updateEvent} closeModal={closeModal} /> :
          <div>No suitable form were found</div>
        }
      </Modal>
      <MenuBar setWeek={setWeek} restWeek={resetWeek} setPeriod={setPeriod} />
      <TimeTable dotsObject={dotsObject} setWeek={setWeek} parentState={state} setParentState={setState} modalState={modalState} setModalState={setModalState} action={action} setAction={setAction} setStyle={setStyle} />
    </div>
  )
}

export default SchedulePage