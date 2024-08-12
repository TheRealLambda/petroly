import { useEffect, useState } from "react"
import "./styles/show_event_form.css"
import axios from "axios"

const ShowEventForm = ({ askForConfirmation, setModalState, setForm, eventModalId, setEventModalId }) => {

  const [event, setEvent] = useState({title: "Loading"})
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [taskTitle, setTaskTitle] = useState("")
  const [taskDescription, setTaskDescription] = useState("")

  useEffect(() => {
    async function loadEvent() {
      const result = await axios.get("http://localhost:3001/api/events/"+eventModalId.id)
      setEvent(result.data)
    }
    loadEvent()
  }, [eventModalId])

  const changeToEdit = (e) => {
    setForm({type: "edit", event: event})
  }

  const deleteEvent = async (e) => {
    const result = await axios.delete("http://localhost:3001/api/events/"+eventModalId.id)
  }

  const closeModal = (e) => {
    if(askForConfirmation) {
      if(confirm("Close modal?")) {
        setModalState("closed")
      }
    } else {
      setModalState("closed")
    }
  }

  const handleTaskForm = async (e) => {
    const body = {
      task: {
        title: taskTitle,
        description: taskDescription
      }
    }
    const result = await axios.patch("http://localhost:3001/api/events/"+event._id+"/task", body)
    setShowTaskForm(false)
    setModalState("closed")
  }

  return (
    <div className="show_event_form modalScrollContainer">
      <div className="drag_indicator bgcolor-accent"></div>
      <div className="container">
        <div className="left">
          <svg onClick={closeModal} className="fillcolor-accent close_button" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
          <div className="color_picker"></div>
        </div>
        <div className="middle modalDragArea">
          <p type="text" className="title text-24-regular color-accent" placeholder="Add title">{event && event.title}</p>
          <p className="date_text text-16-regular color-accent opaque">tomorrow, 17 Jul • 16:00-17:00</p>
        </div>
        <div className="right">
          <svg onClick={changeToEdit} className="edit_and_more fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
          <svg onClick={deleteEvent} className="edit_and_more fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
        </div>
      </div>
      {event.type === "class" && <>
        <div className="container extra_margin">
          <div className="left">
            <p className="text-16-semibold color-accent opaque">TYPE</p>
          </div>
          <div className="middle">
            <p className="text-16-regular color-accent opaque">{event.course_type}</p>
          </div>
        </div>
        <div className="container">
          <div className="left">
            <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M40-272q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v32q0 33-23.5 56.5T600-160H120q-33 0-56.5-23.5T40-240v-32Zm800 112H738q11-18 16.5-38.5T760-240v-40q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v40q0 33-23.5 56.5T840-160ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
          </div>
          <div className="middle">
            <p className="text-16-regular color-accent opaque">{event.course_instructor}</p>
          </div>
        </div>
        <div className="container">
          <div className="left">
            <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M80-200v-560q0-33 23.5-56.5T160-840h240q33 0 56.5 23.5T480-760v80h320q33 0 56.5 23.5T880-600v400q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200Zm80 0h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h320v-400H480v80h80v80h-80v80h80v80h-80v80Zm160-240v-80h80v80h-80Zm0 160v-80h80v80h-80Z"/></svg>
          </div>
          <div className="middle">
            <p className="text-16-regular color-accent opaque">{event.course_location}</p>
          </div>
        </div>
      </>}
      <div className="container">
        <div className="left">
          <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-80q-50 0-85-35t-35-85q0-39 22.5-69.5T160-313v-334q-35-13-57.5-43.5T80-760q0-50 35-85t85-35q39 0 69.5 22.5T313-800h334q12-35 42.5-57.5T760-880q50 0 85 35t35 85q0 40-22.5 70.5T800-647v334q35 13 57.5 43.5T880-200q0 50-35 85t-85 35q-39 0-69.5-22.5T647-160H313q-13 35-43.5 57.5T200-80Zm0-640q17 0 28.5-11.5T240-760q0-17-11.5-28.5T200-800q-17 0-28.5 11.5T160-760q0 17 11.5 28.5T200-720Zm560 0q17 0 28.5-11.5T800-760q0-17-11.5-28.5T760-800q-17 0-28.5 11.5T720-760q0 17 11.5 28.5T760-720ZM313-240h334q9-26 28-45t45-28v-334q-26-9-45-28t-28-45H313q-9 26-28 45t-45 28v334q26 9 45 28t28 45Zm447 80q17 0 28.5-11.5T800-200q0-17-11.5-28.5T760-240q-17 0-28.5 11.5T720-200q0 17 11.5 28.5T760-160Zm-560 0q17 0 28.5-11.5T240-200q0-17-11.5-28.5T200-240q-17 0-28.5 11.5T160-200q0 17 11.5 28.5T200-160Zm0-600Zm560 0Zm0 560Zm-560 0Z"/></svg>
        </div>
        <div className="middle">
          <p className="text-16-regular color-accent opaque">Some activity</p>
        </div>
      </div>
      {/* <div className="container">
        <div className="left">
          <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/></svg>
        </div>
        <div className="middle">
          <p className="text-16-regular color-accent opaque">Some task</p>
          <div>
            <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/></svg>
            <p className="text-16-regular color-accent opaque">Add task</p>
          </div>
        </div>
      </div> */}




      {event.tasks ? (
        event.tasks.length < 1 ? (
          <div className="container">
            <div className="left">
              <svg className="fillcolor-accent opaque_1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/></svg>
            </div>
            {showTaskForm ? (
              <div className="middle">
                <div className="activity_form">
                  <input onChange={(e)=>setTaskTitle(e.target.value)} type="text" className="title" />
                  <textarea onChange={(e)=>setTaskDescription(e.target.value)} className="description"></textarea>
                  <button onClick={handleTaskForm}>Save</button>
                  <button onClick={()=>setShowTaskForm(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div onClick={()=>setShowTaskForm(true)} className="middle">
              <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/></svg>
                <p className="text-16-regular color-accent opaque_1">Add task</p>
              </div>
            )}
            <div className="right">
            </div>
          </div>
        ) : (
          event.tasks.map((task, i) => {
            if(i === 0) {
              return (
                <div className="container">
                  <div className="left">
                    <svg className="fillcolor-accent opaque_1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/></svg>
                  </div>
                  <div className="middle">
                    <p className="text-16-medium color-accent">{task.title}</p>
                    <p className="text-14-medium color-accent">{task.description}</p>
                  </div>
                  <div className="right">
                  </div>
                </div>
              )
            } else {
              return (
                <div className="container">
                  <div className="left">
                  </div>
                  <div className="middle">
                    <p className="text-16-medium color-accent">{task.title}</p>
                    <p className="text-14-medium color-accent">{task.description}</p>
                  </div>
                  <div className="right">
                  </div>
                </div>
              )
            }
          })
        )
      ) : 0}
      
      
      {event.tasks && event.tasks.length > 0 ? (
        <div className="container">
          <div className="left">
          </div>
          {showTaskForm ? (
            <div className="middle">
              <div className="activity_form">
                <input onChange={(e)=>setTaskTitle(e.target.value)} type="text" className="title" />
                <textarea onChange={(e)=>setTaskDescription(e.target.value)} className="description"></textarea>
                <button onClick={handleTaskForm}>Save</button>
                <button onClick={()=>setShowTaskForm(false)}>Cancel</button>
              </div>
            </div>
            ) : (
              <div onClick={()=>setShowTaskForm(true)} className="middle">
                <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/></svg>
                <p className="text-16-regular color-accent opaque_1">Add task</p>
              </div>
            )}
          <div className="right">
          </div>
        </div>
      ) : 0}




     <div className="container">
        <div className="left">
          <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200Zm280-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>
        </div>
        <div className="middle">
          <p className="text-16-regular color-accent opaque">30 mins</p>
        </div>
      </div>
      <div className="container">
        <div className="left">
          <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h400q17 0 28.5 11.5T600-280q0 17-11.5 28.5T560-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z"/></svg>
        </div>
        <div className="middle">
          <p className="text-16-regular color-accent opaque">Some description</p>
        </div>
      </div>
      <div className="container">
        <div className="left">
          <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-330q0-17 11.5-28.5T400-720q17 0 28.5 11.5T440-680v330q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-350q0-17 11.5-28.5T680-720q17 0 28.5 11.5T720-680v350Z"/></svg>
        </div>
        <div className="middle">
          <p className="text-16-regular color-accent opaque">Some attachments</p>
        </div>
      </div>
      <div className="container">
        <div className="left">
          <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-330q0-17 11.5-28.5T400-720q17 0 28.5 11.5T440-680v330q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-350q0-17 11.5-28.5T680-720q17 0 28.5 11.5T720-680v350Z"/></svg>
        </div>
        <div className="middle">
          <p className="text-16-regular color-accent opaque">Some attachments</p>
        </div>
      </div>
      <div className="container">
        <div className="left">
          <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-330q0-17 11.5-28.5T400-720q17 0 28.5 11.5T440-680v330q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-350q0-17 11.5-28.5T680-720q17 0 28.5 11.5T720-680v350Z"/></svg>
        </div>
        <div className="middle">
          <p className="text-16-regular color-accent opaque">Some attachments</p>
        </div>
      </div>
      <div className="container">
        <div className="left">
          <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-330q0-17 11.5-28.5T400-720q17 0 28.5 11.5T440-680v330q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-350q0-17 11.5-28.5T680-720q17 0 28.5 11.5T720-680v350Z"/></svg>
        </div>
        <div className="middle">
          <p className="text-16-regular color-accent opaque">Some attachments</p>
        </div>
      </div>
      <div className="container">
        <div className="left">
          <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-330q0-17 11.5-28.5T400-720q17 0 28.5 11.5T440-680v330q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-350q0-17 11.5-28.5T680-720q17 0 28.5 11.5T720-680v350Z"/></svg>
        </div>
        <div className="middle">
          <p className="text-16-regular color-accent opaque">Some attachments</p>
        </div>
      </div>
      <div className="container">
        <div className="left">
          <svg className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-330q0-17 11.5-28.5T400-720q17 0 28.5 11.5T440-680v330q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-350q0-17 11.5-28.5T680-720q17 0 28.5 11.5T720-680v350Z"/></svg>
        </div>
        <div className="middle">
          <p className="text-16-regular color-accent opaque">Some attachments</p>
        </div>
      </div>
    </div>
  )
}
export default ShowEventForm