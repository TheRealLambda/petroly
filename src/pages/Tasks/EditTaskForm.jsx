import { useState } from "react"
import "./styles/edit_task_form.css"
import { patchTask } from "../../services/tasks"

export default function EditTaskForm({ task, closeModal }) {

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [completed, setCompleted] = useState(task.completed)

  const updateTask = async () => {
    const body = {
      title,
      description,
      completed
    }
    const result = await patchTask(body, task._id)
    console.log(result.data);
  }

  return (
    <div className="edit_task_form bgcolor-BG modalScrollContainer">
      <div className="drag_indicator bgcolor-accent"></div>
      <div className="top modalDragArea">
        <div onClick={()=>closeModal()} className="close_button bgcolor-BG button_effect_1_dark">
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
        </div>
        <div onClick={updateTask} className="save_button">save</div>
      </div>
      <div className="title">
        <div onClick={()=>setCompleted(!completed)} className="check_circle bgcolor-BG button_effect_1_dark">
          {completed ? 
           <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#0230477f"><path d="m424-408-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-408Zm56 328q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
           :<svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
          }
        </div>
        <input onChange={(e)=>setTitle(e.target.value)} className={"task_title text-24-medium color-accent"+(completed&&" line_through")} value={title}/>
      </div>
      <textarea onChange={(e)=>setDescription(e.target.value)} className="description text-16-medium color-accent">{description}</textarea>
    </div>
  )
}