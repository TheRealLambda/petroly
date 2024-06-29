import "./styles/task_item.css"

const TaskItem = ({text, circle, white}) => {

  const showTask = (event) => {
    event.currentTarget.firstChild.style.display = "fixed"
  }

  return (
    <div onClick={showTask} className="task_item">
      <div className="task_modal">
        <div className="task_modal_content bgcolor-white">
          <h3 className="color-accent">Title</h3>
          <p className="text-14-regular color-accent">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus quo eum, excepturi fuga exercitationem in iure. Esse nisi qui quam!</p>
          
        </div>
      </div>
      <div className="check_circle">
        
        {circle ? (<svg className={"fillcolor-"+(white?"white":"accent")} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>) : (<svg className={"fillcolor-"+(white?"white":"accent")} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>)}
      </div>
      <div className="details">
        <p className={"text-14-regular color-"+(white?"white":"accent")}>{text}</p>
        <div className="icons">
          <svg className={"fillcolor-"+(white?"white":"accent")} xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="M312-264q-89.86 0-152.93-63.07Q96-390.14 96-480q0-91 65.5-153.5T319-696h389q65 0 110.5 45.5T864-540q0 66-48 111t-115 45H336q-40.15 0-68.07-27.93Q240-439.85 240-480q0-41 29.09-68.5T340-576h344q15.3 0 25.65 10.29Q720-555.42 720-540.21t-10.35 25.71Q699.3-504 684-504H336q-10.4 0-17.2 6.8-6.8 6.8-6.8 17.2 0 10.4 6.8 17.2 6.8 6.8 17.2 6.8h372q35 0 59.5-24.5t24.5-59.7q0-35.19-25.5-59.5Q741-624 706-624H312q-60 0-101.5 42T168-480q-1 60 43 102t106 42h367q15.3 0 25.65 10.29Q720-315.42 720-300.21t-10.35 25.71Q699.3-264 684-264H312Z"/></svg>
          <svg className={"fillcolor-"+(white?"white":"accent")} xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm0 0v-528 528Zm84-72h360.19Q671-288 676-298t-2-19L566-461q-5.25-8-14-8t-14 8l-94 125-58-77q-5.25-8-14-8t-14 8l-71.82 96.03Q279-308 284.25-298q5.25 10 15.75 10Z"/></svg></div>
      </div>
    </div>
  )
}

export default TaskItem