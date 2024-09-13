import { useState } from "react"
import "./styles/create_task_form.css"

export default function CreateTastForm() {

  const [text, setText] = useState("")
  const [description, setDescription] = useState("")

  return (
    <div className="create_task_form">
      <div className="wrapper"></div>
      <div className="container bgcolor-BG">
        <input onChange={(e)=>setText(e.target.value)} className=" text_field text-16-medium bgcolor-BG color-accent-80" type="text" value={text} placeholder="What would you like to do"/>
        <input onChange={(e)=>setDescription(e.target.value)} className="description_field text-14-medium bgcolor-BG color-accent-80" type="text" value={description} />
        <div className="buttons">
          <div className="choose_list_button bgcolor-BG button_effect_1_dark">
            <svg className="fillcolor-accent-80" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm280-120q32 0 59-16.5t44-43.5q6-9 15-14.5t20-5.5h142v-360H200v360h142q11 0 20 5.5t15 14.5q17 27 44 43.5t59 16.5ZM200-200h560-560Z"/></svg>
          </div>
          <div className="more_button bgcolor-BG button_effect_1_dark">
            <svg className="fillcolor-accent-80" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
          </div>
          <div className="save_button bgcolor-primary button_effect_1_lighter">
            <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M176-183q-20 8-38-3.5T120-220v-180l320-80-320-80v-180q0-22 18-33.5t38-3.5l616 260q25 11 25 37t-25 37L176-183Z"/></svg>
          </div>
        </div>
      </div>
    </div>
  )
}