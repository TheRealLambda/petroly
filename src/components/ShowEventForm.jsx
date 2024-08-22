import { useEffect, useState } from "react"
import "./styles/edit_event_form.css"
import axios from "axios"

const ShowEventForm = ({ event, changeToEdit, closeModal, deleteEvent}) => {
  console.log(event);

  const [activities, setActivities] = useState(event.activities?event.activities:[])
  const [tasks, setTasks] = useState(event.tasks)

  const handleTaskForm = async (e) => {
    const body = {
      task: {
        title: taskTitle,
        description: taskDescription
      }
    }
    const result = await axios.patch("http://localhost:3001/api/events/"+event._id+"/task", body)
    setShowTaskForm(false)
    // setModalState("closed")
  }

  const displayDate = () => {
    let text = ""
    const dayInMilliseconds = 1*24*60*60*1000
    const date = new Date(event.start_time)
    date.setHours(0, 0, 0, 0)
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    if(date.getTime() - now.getTime() < 0 && date.getTime() - now.getTime() >= -dayInMilliseconds) {
      text += "Yesterday"
    } else if(date.getTime() - now.getTime() === 0) {
      text += "Today"
    } else if(date.getTime() - now.getTime() > 0 && date.getTime() - now.getTime() <= dayInMilliseconds) {
      text += "Tomorrow"
    } else {
      text += ["Sunday", "Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday"][date.getDay()]
    }

    text += ", "+date.getDate()+" "
    text += ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"][date.getMonth()]
    text += " • "

    const hour = String(new Date(event.start_time).getHours())
    const minute = String(new Date(event.start_time).getMinutes())
    text += (hour.length < 2 ? "0"+hour : hour) + ":" + (minute.length < 2 ? "0"+minute : minute)
    
    text += "-"

    const hourEnd = String(new Date(event.end_time).getHours())
    const minuteEnd = String(new Date(event.end_time).getMinutes())
    text += (hourEnd.length < 2 ? "0"+hourEnd : hourEnd) + ":" + (minuteEnd.length < 2 ? "0"+minuteEnd : minuteEnd)
    
    return text
  }

  const displayReminder = () => {
    console.log(event.reminder);
    const date = new Date(event.reminder)
    const formattedTime = (date.getHours()<10?"0"+date.getHours():""+date.getHours())+":"+(date.getMinutes()<10?"0"+date.getMinutes():""+date.getMinutes())
    console.log(date.getHours());
    return date.toDateString()+", "+formattedTime
  }

  return (
    <div className="edit_event_form">
      <div className="drag_indicator bgcolor-accent"></div>
      <div className="top">
        <div onClick={closeModal} className="left">
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
        </div>
        <div className="middle modalDragArea">
        </div>
        <div className="right">
          <svg onClick={()=>changeToEdit(event._id)} className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
          <svg onClick={()=>deleteEvent(event._id)} className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
        </div>
      </div>
      <div className="modalScrollContainer extra_gap">

        <div className="block">
          <div className="container no_margin">
            <div className="left">
              <div className="color_picker" style={{backgroundColor: event.color}}></div>
            </div>
            <div className="middle">
              <p className="text-24-regular color-accent opaque_1">{event.title}</p>
            </div>
            <div className="right"></div>
          </div>
          <div className="container top_margin_5">
            <div className="left">
            </div>
            <div className="middle full_width">
              <p className="text-16-regular color-accent opaque_1">{displayDate()}</p>
            </div>
          </div>
        </div>

        {event.type === "class" && <>
          <div className="block">
            <div className="container no_margin">
              <div className="left">
                <p className="text-12-semibold color-accent opaque_1">TYPE</p>
              </div>
              <div className="middle">
                <p className="text-16-regular color-accent opaque_1">LEC</p>
              </div>
              <div className="right"></div>
            </div>
          </div>

          <div className="block">
            <div className="container no_margin">
              <div className="left">
                <svg className="fillcolor-accent opaque_1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M40-272q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v32q0 33-23.5 56.5T600-160H120q-33 0-56.5-23.5T40-240v-32Zm800 112H738q11-18 16.5-38.5T760-240v-40q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v40q0 33-23.5 56.5T840-160ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
              </div>
              <div className="middle">
                <p className="text-16-regular color-accent opaque_1">Khalil B. Harrabi</p>
              </div>
              <div className="right"></div>
            </div>
          </div>

          <div className="block">
            <div className="container no_margin">
              <div className="left">
                <svg className="fillcolor-accent opaque_1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M80-200v-560q0-33 23.5-56.5T160-840h240q33 0 56.5 23.5T480-760v80h320q33 0 56.5 23.5T880-600v400q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200Zm80 0h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h320v-400H480v80h80v80h-80v80h80v80h-80v80Zm160-240v-80h80v80h-80Zm0 160v-80h80v80h-80Z"/></svg>
              </div>
              <div className="middle">
                <p className="text-16-regular color-accent opaque_1">Bld. 59 room 310</p>
              </div>
              <div className="right"></div>
            </div>
          </div>
          </>}

        {event.reminder && <div className="block">
          <div className="container no_margin">
            <div className="left">
              <svg className="fillcolor-accent opaque_1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200Zm280-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>
            </div>
            <div className="middle full_width">
              <p className="text-16-regular color-accent opaque_1">{displayReminder()}</p>
            </div>
          </div>
        </div>}

        <div className="block">
          
        </div>
        
        {event.description && <div className="block">
          <div className="container no_margin">
            <div className="left">
              <svg className="fillcolor-accent opaque_1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h400q17 0 28.5 11.5T600-280q0 17-11.5 28.5T560-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z"/></svg>
            </div>
            <div className="middle">
              <p className="text-16-regular color-accent opaque_1">{event.description}</p>
            </div>
            <div className="right"></div>
          </div>
        </div>}
      </div>
    </div>
  )
}
export default ShowEventForm