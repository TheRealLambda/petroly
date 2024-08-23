import { useEffect, useState } from "react"
import "./styles/edit_event_form.css"
import axios from "axios"

const ShowEventForm = ({ event, updateEvent, changeToEdit, closeModal, deleteEvent}) => {
  console.log(event);
  const [activityForm, setActivityForm] = useState(false)
  const [activityFormTitle, setActivityFormTitle] = useState("")
  const [activityFormDescription, setActivityFormDescription] = useState("")
  const [taskForm, setTaskForm] = useState(false)
  const [taskFormTitle, setTaskFormTitle] = useState("")
  const [taskFormDescription, setTaskFormDescription] = useState("")

  useEffect(() => {
    console.log("RENDERED");
  }, [])
  
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

  const handleActivityForm = async (e) => {
    const body = {
      title: activityFormTitle,
      description: activityFormDescription
    }
    console.log(body);
    // const result = await axios.patch("http://localhost:3001/api/events/"+event._id+"/activity", body)
    updateEvent(event._id, {...event, activities: event.activities.concat(body)})
    setActivityForm(false)
  }

  const handleTaskForm = async (e) => {
    const body = {
      title: taskFormTitle,
      description: taskFormDescription
    }
    console.log(body);
    updateEvent(event._id, {...event, tasks: event.tasks.concat(body)})
    setTaskForm(false)
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

        <div className="block">
          {event.activities && event.activities.map((activity,i) => {
            console.log(activity, i);
            return (
              <>
              
                {activity && <div key={activity._id} className={"container"+(i===0?" no_margin":" top_margin_20")}>
                  <div className="left">
                    {i===0 && <svg className="fillcolor-accent opaque_1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-80q-50 0-85-35t-35-85q0-39 22.5-69.5T160-313v-334q-35-13-57.5-43.5T80-760q0-50 35-85t85-35q39 0 69.5 22.5T313-800h334q12-35 42.5-57.5T760-880q50 0 85 35t35 85q0 40-22.5 70.5T800-647v334q35 13 57.5 43.5T880-200q0 50-35 85t-85 35q-39 0-69.5-22.5T647-160H313q-13 35-43.5 57.5T200-80Zm0-640q17 0 28.5-11.5T240-760q0-17-11.5-28.5T200-800q-17 0-28.5 11.5T160-760q0 17 11.5 28.5T200-720Zm560 0q17 0 28.5-11.5T800-760q0-17-11.5-28.5T760-800q-17 0-28.5 11.5T720-760q0 17 11.5 28.5T760-720ZM313-240h334q9-26 28-45t45-28v-334q-26-9-45-28t-28-45H313q-9 26-28 45t-45 28v334q26 9 45 28t28 45Zm447 80q17 0 28.5-11.5T800-200q0-17-11.5-28.5T760-240q-17 0-28.5 11.5T720-200q0 17 11.5 28.5T760-160Zm-560 0q17 0 28.5-11.5T240-200q0-17-11.5-28.5T200-240q-17 0-28.5 11.5T160-200q0 17 11.5 28.5T200-160Zm0-600Zm560 0Zm0 560Zm-560 0Z"/></svg>}
                  </div>
                  <div className="middle text-14-regular opaque_1 color-accent">
                    {activity._id}
                  </div>
                  <div className="right"></div>
                </div>}
                {i===event.activities.length-1 && <div key={activity._id+"000"} className={"container"+((!activity&&i===0)?" no_margin":" top_margin_20")}>
                  <div className="left">
                    {!activity && i===0 && <svg className="fillcolor-accent opaque_1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-80q-50 0-85-35t-35-85q0-39 22.5-69.5T160-313v-334q-35-13-57.5-43.5T80-760q0-50 35-85t85-35q39 0 69.5 22.5T313-800h334q12-35 42.5-57.5T760-880q50 0 85 35t35 85q0 40-22.5 70.5T800-647v334q35 13 57.5 43.5T880-200q0 50-35 85t-85 35q-39 0-69.5-22.5T647-160H313q-13 35-43.5 57.5T200-80Zm0-640q17 0 28.5-11.5T240-760q0-17-11.5-28.5T200-800q-17 0-28.5 11.5T160-760q0 17 11.5 28.5T200-720Zm560 0q17 0 28.5-11.5T800-760q0-17-11.5-28.5T760-800q-17 0-28.5 11.5T720-760q0 17 11.5 28.5T760-720ZM313-240h334q9-26 28-45t45-28v-334q-26-9-45-28t-28-45H313q-9 26-28 45t-45 28v334q26 9 45 28t28 45Zm447 80q17 0 28.5-11.5T800-200q0-17-11.5-28.5T760-240q-17 0-28.5 11.5T720-200q0 17 11.5 28.5T760-160Zm-560 0q17 0 28.5-11.5T240-200q0-17-11.5-28.5T200-240q-17 0-28.5 11.5T160-200q0 17 11.5 28.5T200-160Zm0-600Zm560 0Zm0 560Zm-560 0Z"/></svg>}
                  </div>
                  <div className="middle">
                  {activityForm ?
                     (
                      <div className="activity_form">
                        <input onChange={(e)=>setActivityFormTitle(e.target.value)} type="text" placeholder="title" value={activityFormTitle}/><br/>
                        <input onChange={(e)=>setActivityFormDescription(e.target.value)} type="text" placeholder="description" value={activityFormDescription}/><br/>
                        <button onClick={()=>setActivityForm(false)}>Cancel</button>
                        <button onClick={handleActivityForm}>Create</button>
                      </div>
                     ) :
                     (
                      <div onClick={()=>setActivityForm(true)} className="activity_form_hidden text-14-regular opaque_1 color-accent">
                        Add new activity
                      </div>
                     )}
                  </div>
                  <div className="right">
                    <svg className="fillcolor-accent opaque_1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                  </div>
                </div>}

              </>
            )
          })}

          {event.activities && event.activities.length < 1 && 
          <div key="111" className="container no_margin">
            <div className="left">
              <svg className="fillcolor-accent opaque_1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-80q-50 0-85-35t-35-85q0-39 22.5-69.5T160-313v-334q-35-13-57.5-43.5T80-760q0-50 35-85t85-35q39 0 69.5 22.5T313-800h334q12-35 42.5-57.5T760-880q50 0 85 35t35 85q0 40-22.5 70.5T800-647v334q35 13 57.5 43.5T880-200q0 50-35 85t-85 35q-39 0-69.5-22.5T647-160H313q-13 35-43.5 57.5T200-80Zm0-640q17 0 28.5-11.5T240-760q0-17-11.5-28.5T200-800q-17 0-28.5 11.5T160-760q0 17 11.5 28.5T200-720Zm560 0q17 0 28.5-11.5T800-760q0-17-11.5-28.5T760-800q-17 0-28.5 11.5T720-760q0 17 11.5 28.5T760-720ZM313-240h334q9-26 28-45t45-28v-334q-26-9-45-28t-28-45H313q-9 26-28 45t-45 28v334q26 9 45 28t28 45Zm447 80q17 0 28.5-11.5T800-200q0-17-11.5-28.5T760-240q-17 0-28.5 11.5T720-200q0 17 11.5 28.5T760-160Zm-560 0q17 0 28.5-11.5T240-200q0-17-11.5-28.5T200-240q-17 0-28.5 11.5T160-200q0 17 11.5 28.5T200-160Zm0-600Zm560 0Zm0 560Zm-560 0Z"/></svg>
            </div>
            <div className="middle">
            {activityForm ?
               (
                <div className="activity_form">
                  <input onChange={(e)=>setActivityFormTitle(e.target.value)} type="text" placeholder="title" value={activityFormTitle}/><br/>
                  <input onChange={(e)=>setActivityFormDescription(e.target.value)} type="text" placeholder="description" value={activityFormDescription}/><br/>
                  <button onClick={()=>setActivityForm(false)}>Cancel</button>
                  <button onClick={handleActivityForm}>Create</button>
                </div>
               ) :
               (
                <div onClick={()=>setActivityForm(true)} className="activity_form_hidden text-14-regular opaque_1 color-accent">
                  Add new activity
                </div>
               )}
            </div>
            <div className="right">
              <svg className="fillcolor-accent opaque_1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </div>
          </div>}
        </div>

        <div className="block">
          {event.tasks && event.tasks.map((task,i) => {
            console.log(task, i);
            return (
              <>
              
                {task && <div key={task._id} className={"container"+(i===0?" no_margin":" top_margin_20")}>
                  <div className="left">
                    {i===0 && <svg className="fillcolor-accent opaque_1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/></svg>}
                  </div>
                  <div className="middle text-14-regular opaque_1 color-accent">
                    {task._id}
                  </div>
                  <div className="right"></div>
                </div>}
                {i===event.tasks.length-1 && <div key={task._id+"000"} className={"container"+((!task&&i===0)?" no_margin":" top_margin_20")}>
                  <div className="left">
                    {!task && i===0 && <svg className="fillcolor-accent opaque_1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/></svg>}
                  </div>
                  <div className="middle">
                  {taskForm ?
                     (
                      <div className="activity_form">
                        <input onChange={(e)=>setTaskFormTitle(e.target.value)} type="text" placeholder="title" value={taskFormTitle}/><br/>
                        <input onChange={(e)=>setTaskFormDescription(e.target.value)} type="text" placeholder="description" value={taskFormDescription}/><br/>
                        <button onClick={()=>setTaskForm(false)}>Cancel</button>
                        <button onClick={handleTaskForm}>Create</button>
                      </div>
                     ) :
                     (
                      <div onClick={()=>setActivityForm(true)} className="activity_form_hidden text-14-regular opaque_1 color-accent">
                        Add new task
                      </div>
                     )}
                  </div>
                  <div className="right"></div>
                </div>}

              </>
            )
          })}

          {event.tasks && event.tasks.length < 1 && 
          <div key="111" className="container no_margin">
            <div className="left">
            <svg className="fillcolor-accent opaque_1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/></svg>
            </div>
            <div className="middle">
            {taskForm ?
               (
                <div className="task_form">
                  <input onChange={(e)=>setTaskFormTitle(e.target.value)} type="text" placeholder="title" value={taskFormTitle}/><br/>
                  <input onChange={(e)=>setTaskFormDescription(e.target.value)} type="text" placeholder="description" value={taskFormDescription}/><br/>
                  <button onClick={()=>setTaskForm(false)}>Cancel</button>
                  <button onClick={handleTaskForm}>Create</button>
                </div>
               ) :
               (
                <div onClick={()=>setTaskForm(true)} className="activity_form_hidden text-14-regular opaque_1 color-accent">
                  Add new task
                </div>
               )}
            </div>
            <div className="right"></div>
          </div>}
        </div>
      </div>
    </div>
  )
}
export default ShowEventForm