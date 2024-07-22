import "./styles/create_event_form.css"

const CreateEventForm = () => {

  return (
    <div className="create_event_form">
      <div className="drag_indicator bgcolor-accent"></div>
      <div className="container">
        <div className="left">
          <svg className="fillcolor-accent close_button" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
          <div className="color_picker"></div>
        </div>
        <div className="middle">
          <input type="text" className="title text-24-regular color-accent" placeholder="Add title" />
          <div className="event_type_container">
            <div className="text-14-medium event_type chosen">Event</div>
            <div className="text-14-medium event_type">Task</div>
          </div>
        </div>
        <div className="right">
          <div className="save_button bgcolor-primary color-white text-14-medium">Save</div>
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
          <p className="time_and_repeat text-16-regular color-accent">Mon, 12 Jul 2024</p>
          <p className="time_and_repeat text-16-regular color-accent">Mon, 12 Jul 2024</p>
          <p className="time_and_repeat text-16-regular color-accent">Does not repeat</p>
        </div>
        <div className="right"></div>
      </div>
    </div>
  )
}

export default CreateEventForm