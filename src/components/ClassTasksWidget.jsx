import "./styles/class_tasks_widget.css"

const ClassTasksWidget = () => {

  const expandClassTasksWidget = () => {
    const collapsedDiv = document.querySelector(".class_tasks_widget .collapsed_div")
    const expandedDiv = document.querySelector(".class_tasks_widget .expanded_div")
    console.log("DIV 1:", collapsedDiv, "DIV 2:", expandedDiv);
    collapsedDiv.style.display = "none"
    expandedDiv.style.display = "flex"
  }

  const collapseClassTasskWidget = () => {
    const collapsedDiv = document.querySelector(".class_tasks_widget .collapsed_div")
    const expandedDiv = document.querySelector(".class_tasks_widget .expanded_div")
    console.log("DIV 1:", collapsedDiv, "DIV 2:", expandedDiv);
    collapsedDiv.style.display = "flex"
    expandedDiv.style.display = "none"
  }

  return (
    <div className="class_tasks_widget bgcolor-primary">
      <div className="collapsed_div">
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
          <svg onClick={expandClassTasksWidget} className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#5f6368"><path d="M480-356q-6 0-11-2t-10-7L261-563q-9-9-8.5-21.5T262-606q9-9 21.5-9t21.5 9l175 176 176-176q9-9 21-8.5t21 9.5q9 9 9 21.5t-9 21.5L501-365q-5 5-10 7t-11 2Z"/></svg>
        </div>
      </div>
      <div className="expanded_div">
        <div className="div1">
          <h3 className="color-white">QUIZ #2</h3>
          <svg onClick={collapseClassTasskWidget} className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="M280-120q-17 0-28.5-11.5T240-160q0-17 11.5-28.5T280-200h400q17 0 28.5 11.5T720-160q0 17-11.5 28.5T680-120H280Z"/></svg>
        </div>
        <div className="div2">
          <p className="text-14-regular color-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi, ullam!</p>
          <div className="attachments">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="section_separator"></div>
        <div className="div3">
          <div className="task">
            <div className="check_circle">
              <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </div>
            <div className="details">
              <p className="text-14-regular color-white">study quiz material</p>
              <div className="icons">
                <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="M312-264q-89.86 0-152.93-63.07Q96-390.14 96-480q0-91 65.5-153.5T319-696h389q65 0 110.5 45.5T864-540q0 66-48 111t-115 45H336q-40.15 0-68.07-27.93Q240-439.85 240-480q0-41 29.09-68.5T340-576h344q15.3 0 25.65 10.29Q720-555.42 720-540.21t-10.35 25.71Q699.3-504 684-504H336q-10.4 0-17.2 6.8-6.8 6.8-6.8 17.2 0 10.4 6.8 17.2 6.8 6.8 17.2 6.8h372q35 0 59.5-24.5t24.5-59.7q0-35.19-25.5-59.5Q741-624 706-624H312q-60 0-101.5 42T168-480q-1 60 43 102t106 42h367q15.3 0 25.65 10.29Q720-315.42 720-300.21t-10.35 25.71Q699.3-264 684-264H312Z"/></svg>
                <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm0 0v-528 528Zm84-72h360.19Q671-288 676-298t-2-19L566-461q-5.25-8-14-8t-14 8l-94 125-58-77q-5.25-8-14-8t-14 8l-71.82 96.03Q279-308 284.25-298q5.25 10 15.75 10Z"/></svg></div>
            </div>
          </div>
          <div className="task">
            <div className="check_circle">
              <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </div>
            <div className="details">
              <p className="text-14-regular color-white">revision before quiz</p>
              <div className="icons">
                <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="M312-264q-89.86 0-152.93-63.07Q96-390.14 96-480q0-91 65.5-153.5T319-696h389q65 0 110.5 45.5T864-540q0 66-48 111t-115 45H336q-40.15 0-68.07-27.93Q240-439.85 240-480q0-41 29.09-68.5T340-576h344q15.3 0 25.65 10.29Q720-555.42 720-540.21t-10.35 25.71Q699.3-504 684-504H336q-10.4 0-17.2 6.8-6.8 6.8-6.8 17.2 0 10.4 6.8 17.2 6.8 6.8 17.2 6.8h372q35 0 59.5-24.5t24.5-59.7q0-35.19-25.5-59.5Q741-624 706-624H312q-60 0-101.5 42T168-480q-1 60 43 102t106 42h367q15.3 0 25.65 10.29Q720-315.42 720-300.21t-10.35 25.71Q699.3-264 684-264H312Z"/></svg>
                <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm0 0v-528 528Zm84-72h360.19Q671-288 676-298t-2-19L566-461q-5.25-8-14-8t-14 8l-94 125-58-77q-5.25-8-14-8t-14 8l-71.82 96.03Q279-308 284.25-298q5.25 10 15.75 10Z"/></svg></div>
            </div>
          </div>
          <div className="task">
            <div className="check_circle">
              <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </div>
            <div className="details">
              <p className="text-14-regular color-white">bring student ID</p>
              <div className="icons">
                <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="M312-264q-89.86 0-152.93-63.07Q96-390.14 96-480q0-91 65.5-153.5T319-696h389q65 0 110.5 45.5T864-540q0 66-48 111t-115 45H336q-40.15 0-68.07-27.93Q240-439.85 240-480q0-41 29.09-68.5T340-576h344q15.3 0 25.65 10.29Q720-555.42 720-540.21t-10.35 25.71Q699.3-504 684-504H336q-10.4 0-17.2 6.8-6.8 6.8-6.8 17.2 0 10.4 6.8 17.2 6.8 6.8 17.2 6.8h372q35 0 59.5-24.5t24.5-59.7q0-35.19-25.5-59.5Q741-624 706-624H312q-60 0-101.5 42T168-480q-1 60 43 102t106 42h367q15.3 0 25.65 10.29Q720-315.42 720-300.21t-10.35 25.71Q699.3-264 684-264H312Z"/></svg>
                <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm0 0v-528 528Zm84-72h360.19Q671-288 676-298t-2-19L566-461q-5.25-8-14-8t-14 8l-94 125-58-77q-5.25-8-14-8t-14 8l-71.82 96.03Q279-308 284.25-298q5.25 10 15.75 10Z"/></svg></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassTasksWidget