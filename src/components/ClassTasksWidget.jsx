import "./styles/class_tasks_widget.css"

const ClassTasksWidget = () => {
  return (
    <div className="class_tasks_widget bgcolor-primary">
      <div className="div1">
        <div className="events">
          <div className="color-white inter-40-regular" style={{fontSize: "40px"}}>Q 1</div>
        </div>
        <div className="separator bgcolor-white"></div>
        <div className="tasks">
          <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="m434.67-322.67 155-155q10-10 23.66-9.66Q627-487 637-477q10 10 10 23.8 0 13.79-10 23.53l-179 179q-10 10-23.33 10-13.34 0-23.34-10L319-342.33q-10-9.74-10-23.54 0-13.8 10-23.8t23.67-9.66q13.66.33 23.66 9.66l68.34 67ZM186.67-80q-27 0-46.84-19.83Q120-119.67 120-146.67v-600q0-27 19.83-46.83 19.84-19.83 46.84-19.83h56.66v-32q0-14.74 9.97-24.7Q263.27-880 278-880q15.02 0 25.17 9.97 10.16 9.96 10.16 24.7v32h333.34v-32q0-14.74 9.96-24.7 9.97-9.97 24.7-9.97 15.02 0 25.18 9.97 10.16 9.96 10.16 24.7v32h56.66q27 0 46.84 19.83Q840-773.67 840-746.67v600q0 27-19.83 46.84Q800.33-80 773.33-80H186.67Zm0-66.67h586.66v-420H186.67v420Zm0-486.66h586.66v-113.34H186.67v113.34Zm0 0v-113.34 113.34Z"/></svg>
          <p className="inter-40-regular color-white">4</p>
        </div>
      </div>
      <div className="div2">
        <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#5f6368"><path d="M480-356q-6 0-11-2t-10-7L261-563q-9-9-8.5-21.5T262-606q9-9 21.5-9t21.5 9l175 176 176-176q9-9 21-8.5t21 9.5q9 9 9 21.5t-9 21.5L501-365q-5 5-10 7t-11 2Z"/></svg>
      </div>
    </div>
  )
}

export default ClassTasksWidget