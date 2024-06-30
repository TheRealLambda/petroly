import TaskItem from "./TaskItem"
import "./styles/tasks_section.css"

const TasksSection = () => {

  return (
    <div className="taskssection">
      <h3 className="color-accent">Tasks</h3>
      <div className="tasks_list">
        <TaskItem text="prepare for meeting tomorrow" />
        <TaskItem text="Clean room and do laundry" />
        <TaskItem text="ME club activity" />
      </div>
    </div>
  )
}

export default TasksSection