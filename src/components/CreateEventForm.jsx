import { useState } from "react"
import "./styles/create_event_form.css"
import axios from "axios"

const CreateEventForm = ({ setModalState, startDate, setStartDate, endDate, setEndDate}) => {

  const [color, setColor] = useState("#0000000")
  const [title, setTitle] = useState("")
  const [repeat, setRepeat] = useState(false)
  const [reminders, setReminders] = useState([])
  const [description, setDescription] = useState("")
  const [attachments, setAttachments] = useState([])

  const postEvent = async (e) => {
    const body = {
      title,
      start_time: startDate,
      end_time: endDate,
      type: "class"
    }
    const result = await axios.post("http://localhost:3001/api/events", body)
    console.log("===============================================\n",result.data);
    setModalState("closed")
  }

  const closeModal = (e) => {
    setModalState("closed")
  }

  console.log("startDate", startDate, "\nendDate", endDate);
  return (
    <div className="create_event_form">
      <div className="drag_indicator bgcolor-accent"></div>
      <div className="container">
        <div className="left">
          <svg onClick={closeModal} className="fillcolor-accent close_button" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
          <input onChange={(e)=>setColor(e.target.value)} type="color" className="color_picker"></input>
        </div>
        <div className="middle modalDragArea">
          <input onChange={(e)=>setTitle(e.target.value)} type="text" className="title text-24-regular color-accent" placeholder="Add title" />
          <div className="event_type_container">
            <div className="text-14-medium event_type chosen">Event</div>
            <div className="text-14-medium event_type">Task</div>
          </div>
        </div>
        <div className="right">
          <div onClick={postEvent} className="save_button bgcolor-primary color-white text-14-medium">Save</div>
        </div>
      </div>
      <div className="separator"></div>
      <div className="container">
        <div className="left">
          <svg className="fillcolor-accent time" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M520-496v-144q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v159q0 8 3 15.5t9 13.5l132 132q11 11 28 11t28-11q11-11 11-28t-11-28L520-496ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
          <svg className="fillcolor-accent repeat" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-17 11.5-28.5T160-480q17 0 28.5 11.5T200-440q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l34 34q12 12 11.5 28T508-630q-12 12-28.5 12.5T451-629L348-732q-12-12-12-28t12-28l103-103q12-12 28.5-11.5T508-890q11 12 11.5 28T508-834l-34 34h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z"/></svg>
        </div>
        <div className="middle">
          <p className="time text-16-regular color-accent">Time</p>
          <p className="time_and_repeat text-16-regular color-accent">{startDate.toString()}</p>
          <p className="time_and_repeat text-16-regular color-accent">{endDate.toString()}</p>
          <p className="time_and_repeat text-16-regular color-accent">Does not repeat</p>
        </div>
        <div className="right">
          <p className="time_number1 text-16-regular color-accent">16:00</p>
          <p className="time_number2 text-16-regular color-accent">17:00</p>
        </div>
      </div>
      <div className="separator"></div>
      <div className="container">
        <div className="left">
          <svg className="fillcolor-accent reminder" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200Zm280-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>
        </div>
        <div className="middle">
          <p className="reminder text-16-regular color-accent">Add reminder</p>
        </div>
        <div className="right"></div>
      </div>
      <div className="separator"></div>
      <div className="container">
        <div className="left">
          <svg className="fillcolor-accent description" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h400q17 0 28.5 11.5T600-280q0 17-11.5 28.5T560-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z"/></svg>
        </div>
        <div className="middle">
          <p className="description text-16-regular color-accent">Add description</p>
        </div>
        <div className="right"></div>
      </div>
      <div className="separator"></div>
      <div className="container">
        <div className="left">
          <svg className="attachment fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-330q0-17 11.5-28.5T400-720q17 0 28.5 11.5T440-680v330q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-350q0-17 11.5-28.5T680-720q17 0 28.5 11.5T720-680v350Z"/></svg>
        </div>
        <div className="middle">
          <p className="attachment text-16-regular color-accent">Add attachment</p>
        </div>
        <div className="right"></div>
      </div>
    </div>
  )
}

export default CreateEventForm