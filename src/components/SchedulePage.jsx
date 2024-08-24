import MenuBar from "./MenuBar"
import NavBar from "./NavBar"
import "./styles/schedule_page.css"
import TimeTable from "./TimeTable"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import ShowEventForm from "./ShowEventForm"
import EditEventForm from "./EditEventForm"
import Modal from "./Modal"
import { postEvent } from "../services/events"




const SchedulePage = ({ userAuthToken }) => {


  const [state, setState] = useState({week: 0, period: 7, events: []})
  const [modalState, setModalState] = useState("closed")
  const [action, setAction] = useState({type: "view", commit: false, event: null, options: {}})
  const [dotsObject, setDotsObject] = useState({prev: [0,0,0,0,0,0,0], curr: [0,0,0,0,0,0,0], next: [0,0,0,0,0,0,0]})
  

  const updateEvent = async (id, body) => {
        
    let result
    if(action.type === "create") {
      result = await postEvent(body)
    } else {
      result = await axios.patch("http://localhost:3001/api/events/"+id, body, config)
    } 
    console.log("RESULT", result);
    
    let updatedEvent
    const events = state.events.map(event => {
        const newEvent = {...event}
        if(newEvent._id === id) {
            newEvent._id = action.type==="create"?result.data._id:newEvent._id
            newEvent.state = "view"
            newEvent.color = body.color
            newEvent.title = body.title
            newEvent.reminder = body.reminder
            newEvent.description = body.description
            newEvent.activities = result.data.activities
            newEvent.tasks = result.data.tasks
            newEvent.start_time = body.start_time
            newEvent.end_time = body.end_time
            updatedEvent = {...newEvent}
        }
        return newEvent
    })
    const newState = {...state, events}
    setState(newState)
    if(action.type === "edit") setModalState("closed")
    setAction({type: "view", commit: false, event: updatedEvent, options: {}})
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
              setAction({type: "view", commit: false, event: action.event, options: {}})
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
          setAction({type: "view", commit: false, event: action.event, options: {}})
          setModalState("closed")
      }
    }
  }

  const deleteEvent = async (id) => {

    const result = await axios.delete("http://localhost:3001/api/events/"+id)
    const events = state.events.filter(event => event._id !== id)
    const newState = {...state, events}
    setState(newState)
    setModalState("closed")
  }





 





  const getEvents = async (week, period) => {

    const dots = {prev: [0,0,0,0,0,0,0], curr: [0,0,0,0,0,0,0], next: [0,0,0,0,0,0,0]}

    const config = {
      headers: { Authorization: `Bearer ${userAuthToken}` },
    }

    const result = await axios.get("http://localhost:3001/api/events?week="+week+"&period="+(period === 5 ? 7 : period), config)

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
    
    setDotsObject(dots)
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

  const resetWeek = async () => {
    const firstDayOfYear = new Date(2024, 1-1, 1)
    const daysUntilFirstSunday = firstDayOfYear.getDay() === 0 ? 0 : 7-firstDayOfYear.getDay()
    
    //get first sunday after first day of year. Calculations will use this as the first day of the year
    const firstSundayOfYear = new Date(firstDayOfYear)
    firstSundayOfYear.setDate(firstSundayOfYear.getDate() + daysUntilFirstSunday)
    
    const currentDate = new Date()
    const numberOfDays = (currentDate - firstSundayOfYear) / (1*24*60*60*1000)
  
    const week = Math.floor(numberOfDays / (state.period===5?7:state.period))
    const events = await getEvents(week, state.period)

    const newState = {week, period: state.period, events}
    setState(newState)
  }

  const setPeriod = async (period) => {
    const week = calculateWeek(period===5?7:period)
    const events = await getEvents(week, period)
    const newState = {week, period, events}
    setState(newState)
  }



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

    async function setupReminders() {
      if(Notification.permission === "granted") {
        const allEvents = await axios.get("http://localhost:3001/api/events/all")
        setInterval(() => {
          // console.log("==================================================");
          const now = new Date()
          allEvents.data.forEach(event => {
            // console.log(event.reminder);
            if(event.reminder) {

              const reminderDate = new Date(event.reminder)
              const eventDate = new Date(event.start_time)
              if(now.getTime() > reminderDate.getTime() && false) {
                const time = (eventDate.getHours()<10?"0"+eventDate.getHours():""+eventDate.getHours())+":"+(eventDate.getMinutes()<10?"0"+eventDate.getMinutes():""+eventDate.getMinutes())
                new Notification(event.title, {
                  body: "Your event will start at "+time,
                  tag: event._id})
              }
            } 
          })
          // console.log("==================================================");
        }, 1000*10)
      } else {
        Notification.requestPermission().then(permission => {
          if(permission === "default") {
            console.log("[Notification] Permission is Default")
          } else if(permission === "granted") {
            console.log("[Notification] Permission Granted");
          } else if(permission === "denied") {
            console.log("[Notification] Permission Denied");
          }
        })
      }
    }
    // setupReminders()
  }, [])



  return (
    <div className="schedule_page">
      <div onClick={hideSideMenu} id="menu_cover"></div>

      <NavBar />
      <Modal state={modalState} setState={setModalState} options={action.options}>
        {
          action.type === "create" ? <EditEventForm state={state} event={action.event} setStyle={setStyle} action={action} setAction={setAction} updateEvent={updateEvent} closeModal={closeModal} /> :
          (action.type === "view"&&action.event) ? <ShowEventForm event={action.event} updateEvent={updateEvent} changeToEdit={changeToEdit} closeModal={closeModal} deleteEvent={deleteEvent} /> :
          action.type === "edit" ? <EditEventForm state={state} event={action.event} setStyle={setStyle} action={action} setAction={setAction} updateEvent={updateEvent} closeModal={closeModal} /> :
          <div>No suitable form were found</div>
        }
      </Modal>
      <MenuBar resetWeek={resetWeek} setPeriod={setPeriod} />
      <TimeTable dotsObject={dotsObject} state={state} setState={setState} setWeek={setWeek} parentState={state} setParentState={setState} modalState={modalState} setModalState={setModalState} action={action} setAction={setAction} setStyle={setStyle} />
    </div>
  )
}

export default SchedulePage