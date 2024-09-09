import { useEffect, useState } from "react"
import "./styles/show_task_form.css"
import { patchTask } from "../../services/tasks"

export default function ShowTaskForm({ task, closeModal, setAction }) {

  console.log("[ShowTaskForm | task]", task);

  const completeTask = async () => {
    console.log(task.completed);
    if(task.completed) {
      const result = await patchTask({title: task.title, description: task.description, completed: false}, task._id)
      setAction({type: "view", commit: false, task: result.data})
    } else {
      const result = await patchTask({title: task.title, description: task.description, completed: true}, task._id)
      setAction({type: "view", commit: false, task: result.data})
    }
  }

  const switchToUpdate = () => {
    setAction(action=> ({type: "edit", commit: false, task: action.task}))
  }

  return (
    <div className="show_task_form bgcolor-BG modalScrollContainer">
      <div className="drag_indicator bgcolor-accent"></div>
      <div className="top modalDragArea">
        <div onClick={()=>closeModal()} className="close_button bgcolor-BG button_effect_1_dark">
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
        </div>
        <div onClick={switchToUpdate} className="edit_button bgcolor-BG button_effect_1_dark">
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
        </div>
        <div className="more_button bgcolor-BG button_effect_1_dark">
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
        </div>
      </div>
      <div className="title">
        <div onClick={completeTask} className="check_circle bgcolor-BG button_effect_1_dark">
          {task.completed ? 
           <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#0230477f"><path d="m424-408-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-408Zm56 328q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
           :<svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
          }
        </div>
        <p className={"task_title text-24-medium color-accent"+(task.completed&&" line_through")}>{task.title}</p>
      </div>
      <div className="description text-16-medium color-accent">{task.description}</div>
    </div>
  )
}