import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import "./styles/tasks_page.css"
import "./styles/week_picker2.css"
import axios from "axios"
import { getTasksCollections, postTasksCollection } from "../../services/tasksCollections"
import { postTask } from "../../services/tasks"
import Modal from "../../components/Modal"
const TasksPage = () => {

  const [state, setState] = useState({week: 0, day: 0, tasksCollections: []})
  const [modalState, setModalState] = useState("closed")
  const [action, setAction] = useState({type: "view", commit: false, task: null, options: {}})

  const [collectionId, setCollectionId] = useState(null)
  const [collectionName, setCollectionName] = useState(null)
  const [taskTitle, setTaskTitle] = useState(null)
  console.log(action);


  useEffect(() => {
    async function initializeState() {
      const result = await getTasksCollections()
        const firstDayOfYear = new Date(2024, 1-1, 1)
        const daysUntilFirstSunday = firstDayOfYear.getDay() === 0 ? 0 : 7-firstDayOfYear.getDay()
        
        //get first sunday after first day of year. Calculations will use this as the first day of the year
        const firstSundayOfYear = new Date(firstDayOfYear)
        firstSundayOfYear.setDate(firstSundayOfYear.getDate() + daysUntilFirstSunday)
        
        const currentDate = new Date()
        const numberOfDays = (currentDate - firstSundayOfYear) / (1*24*60*60*1000)
      
        const week = Math.floor(numberOfDays / (state.period===5?7:state.period))
        // const events = await loadEvents(week, state.period)

        const day = new Date()
        day.setHours(0, 0, 0, 0)
        const newState = {week, day, tasksCollections: result.data}
        setState(newState)
    }
    initializeState()
  }, [])



  const handleCollection = async () => {
    const result = await postTasksCollection({name: collectionName})
    console.log(result.data);
  }

  const handleTask = async () => {
    const result = postTask({title: taskTitle, tasksCollectionId: collectionId})
    console.log(result.data);
  }

  const hideSideMenu = (event) =>{
    const page = document.getElementsByClassName("tasks_page")[0]
    page.classList.remove("side_menu_open")
    document.getElementById("menu_cover").style.height = "0px"
  }

  const expandCollection = (e) => {
    const arrow = e.currentTarget.lastElementChild.lastElementChild
    const container = e.currentTarget.parentNode
    if(container.classList.contains("open")) {
      container.style.height = "40px"
      arrow.setAttribute("transform", "rotate(0)")
      container.classList.remove("open")
    } else {
      container.style.height = container.scrollHeight+"px"
      arrow.setAttribute("transform", "rotate(90)")
      container.classList.add("open")
    }
  }

  const openTask = (e) => {
    setModalState("open")
    console.log(state.tasksCollections);
    setAction({type: "view", commit: false, task: state.tasksCollections.flatMap(c=>c.tasks).find(t=>t._id===e.currentTarget.getAttribute("data-id"))})
  }

  const closeTask = () => {
    setModalState("closed")
  }

  return (
    <div className="tasks_page">
      <div onClick={hideSideMenu} id="menu_cover"></div>
      <Modal state={modalState}>
        <h1>Header</h1>
        {action.task && <div>{action.task.title}</div>}
      </Modal>
      <NavBar />
      {/* <div className="top_nav">
        <div className="div1">
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          <h4 className="color-accent">Today, <span id="monthText">June</span></h4>
        </div>
        <div className="div2">
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-280q-33 0-56.5-23.5T120-360v-240q0-33 23.5-56.5T200-680h560q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H200Zm0-80h560v-240H200v240Zm-41-400q-17 0-28-11.5T120-800q0-17 11.5-28.5T160-840h641q17 0 28 11.5t11 28.5q0 17-11.5 28.5T800-760H159Zm0 640q-17 0-28-11.5T120-160q0-17 11.5-28.5T160-200h641q17 0 28 11.5t11 28.5q0 17-11.5 28.5T800-120H159Zm41-480v240-240Z"/></svg>
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
        </div>
      </div> */}
      {/* <div id="week_picker_wrapper" className="week_picker_wrapper">
        <div id="first" className="week_picker">
          <div className="flex_container">
            <div className="week_day" data-date={prevWeekDays()[0].getFullYear()+"-"+(prevWeekDays()[0].getMonth())+"-"+prevWeekDays()[0].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[0].getDate()}</p>
              </div>
            </div>
            <div className="week_day today" data-date={prevWeekDays()[1].getFullYear()+"-"+(prevWeekDays()[1].getMonth())+"-"+prevWeekDays()[1].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">M</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[1].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={prevWeekDays()[2].getFullYear()+"-"+(prevWeekDays()[2].getMonth())+"-"+prevWeekDays()[2].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[2].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={prevWeekDays()[3].getFullYear()+"-"+(prevWeekDays()[3].getMonth())+"-"+prevWeekDays()[3].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">W</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[3].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={prevWeekDays()[4].getFullYear()+"-"+(prevWeekDays()[4].getMonth())+"-"+prevWeekDays()[4].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[4].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={prevWeekDays()[5].getFullYear()+"-"+(prevWeekDays()[5].getMonth())+"-"+prevWeekDays()[5].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">F</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[5].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={prevWeekDays()[6].getFullYear()+"-"+(prevWeekDays()[6].getMonth())+"-"+prevWeekDays()[6].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[6].getDate()}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="active" className="week_picker">
          <div className="flex_container">
            <div onClick={selectDay} className="week_day" data-date={activeWeekDays()[0].getFullYear()+"-"+(activeWeekDays()[0].getMonth())+"-"+activeWeekDays()[0].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[0].getDate()}</p>
              </div>
            </div>
            <div onClick={selectDay} className="week_day today" data-date={activeWeekDays()[1].getFullYear()+"-"+(activeWeekDays()[1].getMonth())+"-"+activeWeekDays()[1].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">M</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[1].getDate()}</p>
              </div>
            </div>
            <div onClick={selectDay} className="week_day" data-date={activeWeekDays()[2].getFullYear()+"-"+(activeWeekDays()[2].getMonth())+"-"+activeWeekDays()[2].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[2].getDate()}</p>
              </div>
            </div>
            <div onClick={selectDay} className="week_day" data-date={activeWeekDays()[3].getFullYear()+"-"+(activeWeekDays()[3].getMonth())+"-"+activeWeekDays()[3].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">W</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[3].getDate()}</p>
              </div>
            </div>
            <div onClick={selectDay} className="week_day" data-date={activeWeekDays()[4].getFullYear()+"-"+(activeWeekDays()[4].getMonth())+"-"+activeWeekDays()[4].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[4].getDate()}</p>
              </div>
            </div>
            <div onClick={selectDay} className="week_day" data-date={activeWeekDays()[5].getFullYear()+"-"+(activeWeekDays()[5].getMonth())+"-"+activeWeekDays()[5].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">F</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[5].getDate()}</p>
              </div>
            </div>
            <div onClick={selectDay} className="week_day" data-date={activeWeekDays()[6].getFullYear()+"-"+(activeWeekDays()[6].getMonth())+"-"+activeWeekDays()[6].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[6].getDate()}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="last" className="week_picker">
          <div className="flex_container">
            <div className="week_day" data-date={nextWeekDays()[0].getFullYear()+"-"+(nextWeekDays()[0].getMonth())+"-"+nextWeekDays()[0].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[0].getDate()}</p>
              </div>
            </div>
            <div className="week_day today" data-date={nextWeekDays()[1].getFullYear()+"-"+(nextWeekDays()[1].getMonth())+"-"+nextWeekDays()[1].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">M</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[1].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={nextWeekDays()[2].getFullYear()+"-"+(nextWeekDays()[2].getMonth())+"-"+nextWeekDays()[2].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[2].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={nextWeekDays()[3].getFullYear()+"-"+(nextWeekDays()[3].getMonth())+"-"+nextWeekDays()[3].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">W</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[3].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={nextWeekDays()[4].getFullYear()+"-"+(nextWeekDays()[4].getMonth())+"-"+nextWeekDays()[4].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[4].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={nextWeekDays()[5].getFullYear()+"-"+(nextWeekDays()[5].getMonth())+"-"+nextWeekDays()[5].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">F</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[5].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={nextWeekDays()[6].getFullYear()+"-"+(nextWeekDays()[6].getMonth())+"-"+nextWeekDays()[6].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[6].getDate()}</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="main">
        {state.tasksCollections && state.tasksCollections.map((collection, i) => {
          console.log(i, collection);
          return (
          <div key={collection._id} className="container bgcolor-white">
            <div onClick={expandCollection} className="top_section">
              <div className="div1">
                {/* <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm0 0v-528 528Zm84-72h360.19Q671-288 676-298t-2-19L566-461q-5.25-8-14-8t-14 8l-94 125-58-77q-5.25-8-14-8t-14 8l-71.82 96.03Q279-308 284.25-298q5.25 10 15.75 10Z"/></svg> */}
                <p className="text-12-bold color-accent">{collection.name} {collection._id}</p>
              </div>
              <div className="div2">
                <p className="text-12-bold color-accent">{collection.tasks.length}</p>
                <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"/></svg>
              </div>
            </div>
            {collection.tasks && collection.tasks.map(task => {
              return (
                <div key={task._id} onClick={openTask} className="task" data-id={task._id}>
                  <div onClick={closeTask} id="eventCreateModel" className="event_create_model">
                    <div className="content">
                      <div className="scroll">
                        <h3 className="color-accent">{task.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="div1">
                    <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm0 0v-528 528Zm84-72h360.19Q671-288 676-298t-2-19L566-461q-5.25-8-14-8t-14 8l-94 125-58-77q-5.25-8-14-8t-14 8l-71.82 96.03Q279-308 284.25-298q5.25 10 15.75 10Z"/></svg>
                    <p className="text-14-medium color-accent">{task.title} {task._id}</p>
                  </div>
                </div>
              )
            })}
          </div>)
        })}
        <form onSubmit={handleTask}>
          Create Task
          title<input name="title" onChange={(e)=>setTaskTitle(e.target.value)} value={taskTitle} /><br/>
          {state.tasksCollections.map((collection, i) => {
            return (
              <div>
                <input type="radio"  onChange={()=>setCollectionId(collection._id)}/>
                <label>{collection.name}</label>
              </div>
            )
          })}
          
        </form>
        <form onSubmit={handleCollection}>
          Create Collection
          name<input type="text" onChange={(e)=>setCollectionName(e.target.value)} value={collectionName} />
        </form>
      </div>
    </div>
  )
}

export default TasksPage