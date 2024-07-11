import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import "./styles/tasks_page.css"
import "./styles/week_picker2.css"
import axios from "axios"
const TasksPage = () => {

  let now = new Date();
  now.setHours(0, 0, 0, 0)
  // now.setDate(now.getDate()+1+4)
  console.log(now.getDay());
  let onejan = new Date(now.getFullYear(), 0, 1);
  onejan.setHours(0, 0, 0, 0)
  let week1 = Math.floor((((now.getTime() - onejan.getTime()) / 86400000) + 1) / 7)
  
  console.log("today?", (((now.getTime() - onejan.getTime()) / 86400000) + 1) % 7);
  console.log("week?", Math.floor((((now.getTime() - onejan.getTime()) / 86400000)  + 1) / 7));
  // console.log(onejan.getDay());

  const [week, setWeek] = useState(week1)

  const [collections, setCollections] = useState([])

  const hideSideMenu = (event) =>{
    const page = document.getElementsByClassName("tasks_page")[0]
    page.classList.remove("side_menu_open")
    document.getElementById("menu_cover").style.height = "0px"
  }

  const createTask1 = async (e) => {
    const result = await axios.post("http://localhost:3001/api/tasks", {title: "WaW!", categoryName: "a"})
    const newCollections = collections.map(collection => {
      console.log(collection);
      if(collection.name === "a") {
        return result.data
      } else {
        return collection
      }
    })
    setCollections(newCollections)
  }
  const createTask2 = async (e) => {
    const result = await axios.post("http://localhost:3001/api/tasks", {title: "WaW!", categoryName: "b"})
    const newCollections = collections.map(collection => {
      if(collection.name === "b") {
        return result.data
      } else {
        return collection
      }
    })
    setCollections(newCollections)
  }
  const createTask3 = async (e) => {
    const result = await axios.post("http://localhost:3001/api/tasks", {title: "WaW!", categoryName: "c"})
    const newCollections = collections.map(collection => {
      if(collection.name === "c") {
        return result.data
      } else {
        return collection
      }
    })
    setCollections(newCollections)
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

  let check = false
  const handleScroll = (event) => {
    const first = document.getElementById("first")
    const offsetLeft = first.getBoundingClientRect().left-document.getElementsByClassName("tasks_page")[0].offsetLeft
    if(!check && offsetLeft > -5 && offsetLeft < 5) {
      check = true
      document.getElementById("week_picker_wrapper").classList.add("lock_scroll")  
      setTimeout(() =>{
        setWeek(week => week-1)
        setTimeout(() => {
        document.getElementById("week_picker_wrapper").classList.remove("lock_scroll") 
        // document.getElementById("week_picker_wrapper").scrollTo({ behavior: "instant", left: 360})
        }, 50)
      }, 450)
    }
    const last = document.getElementById("last")
    const offsetRight = last.getBoundingClientRect().left-document.getElementsByClassName("tasks_page")[0].getBoundingClientRect().left
    if(!check && offsetRight > -5 && offsetRight < 5) {
      check = true
      document.getElementById("week_picker_wrapper").classList.add("lock_scroll")  
      setTimeout(() =>{
        setWeek(week => week+1)
        setTimeout(() => {
        document.getElementById("week_picker_wrapper").classList.remove("lock_scroll") 
        // document.getElementById("week_picker_wrapper").scrollTo({ behavior: "instant", left: 360})
        }, 50)
      },450)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("http://localhost:3001/api/tasks")
      console.log(result.data);
      setCollections(result.data)
    }
    fetchData()

    // console.log("left:", document.getElementById("active").getBoundingClientRect().left);
    
  }, [])

  useEffect(() => {
    
    document.getElementById("week_picker_wrapper").scrollTo({ behavior: "instant", left: 360})
    document.getElementById("week_picker_wrapper").addEventListener("scroll", handleScroll);
    // console.log("left:", document.getElementById("first ").getBoundingClientRect().left-document.getElementsByClassName("tasks_page")[0].offsetLeft);
    
    return () => {
      if(document.getElementById("week_picker_wrapper")) {
        document.getElementById("week_picker_wrapper").removeEventListener("scroll", handleScroll)
      }
    }
  }, [week])

  const prevWeekDays = () => {
    const now = new Date()
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = -day
    const sunday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7)
    const monday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+1)
    const tuesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+2)
    const wednesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+3)
    const thursday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+4)
    const friday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+5)
    const saturday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+6)
    return [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
  }
  const activeWeekDays = () => {
    const now = new Date()
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = -day
    const sunday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7)
    // console.log(sunday);
    const monday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+1)
    const tuesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+2)
    const wednesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+3)
    const thursday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+4)
    const friday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+5)
    const saturday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+6)
    return [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
  }
  console.log(activeWeekDays()[0]);
  const nextWeekDays = () => {
    const now = new Date()
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = -day
    const sunday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7)
    const monday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+1)
    const tuesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+2)
    const wednesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+3)
    const thursday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+4)
    const friday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+5)
    const saturday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+6)
    return [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
  }

  console.log(collections);
  return (
    <div className="tasks_page">
      <div onClick={hideSideMenu} id="menu_cover"></div>
      <NavBar />
      <div className="top_nav">
        <div className="div1">
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          <h4 className="color-accent">Today, June</h4>
        </div>
        <div className="div2">
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-280q-33 0-56.5-23.5T120-360v-240q0-33 23.5-56.5T200-680h560q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H200Zm0-80h560v-240H200v240Zm-41-400q-17 0-28-11.5T120-800q0-17 11.5-28.5T160-840h641q17 0 28 11.5t11 28.5q0 17-11.5 28.5T800-760H159Zm0 640q-17 0-28-11.5T120-160q0-17 11.5-28.5T160-200h641q17 0 28 11.5t11 28.5q0 17-11.5 28.5T800-120H159Zm41-480v240-240Z"/></svg>
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
        </div>
      </div>
      <div id="week_picker_wrapper" className="week_picker_wrapper">
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
            <div className="week_day" data-date={activeWeekDays()[0].getFullYear()+"-"+(activeWeekDays()[0].getMonth())+"-"+activeWeekDays()[0].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[0].getDate()}</p>
              </div>
            </div>
            <div className="week_day today" data-date={activeWeekDays()[1].getFullYear()+"-"+(activeWeekDays()[1].getMonth())+"-"+activeWeekDays()[1].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">M</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[1].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={activeWeekDays()[2].getFullYear()+"-"+(activeWeekDays()[2].getMonth())+"-"+activeWeekDays()[2].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[2].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={activeWeekDays()[3].getFullYear()+"-"+(activeWeekDays()[3].getMonth())+"-"+activeWeekDays()[3].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">W</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[3].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={activeWeekDays()[4].getFullYear()+"-"+(activeWeekDays()[4].getMonth())+"-"+activeWeekDays()[4].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[4].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={activeWeekDays()[5].getFullYear()+"-"+(activeWeekDays()[5].getMonth())+"-"+activeWeekDays()[5].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">F</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[5].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={activeWeekDays()[6].getFullYear()+"-"+(activeWeekDays()[6].getMonth())+"-"+activeWeekDays()[6].getDate()}>
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
      </div>
      <div className="main">
        {collections && collections.map(collection => {
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
                <div key={task._id} className="task">
                  <div className="div1">
                    <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm0 0v-528 528Zm84-72h360.19Q671-288 676-298t-2-19L566-461q-5.25-8-14-8t-14 8l-94 125-58-77q-5.25-8-14-8t-14 8l-71.82 96.03Q279-308 284.25-298q5.25 10 15.75 10Z"/></svg>
                    <p className="text-14-medium color-accent">{task.title} {task._id}</p>
                  </div>
                </div>
              )
            })}
          </div>)
        })}
        <button onClick={createTask1}>CREATE</button>
        <button onClick={createTask2}>CREATE</button>
        <button onClick={createTask3}>CREATE</button>
      </div>
    </div>
  )
}

export default TasksPage