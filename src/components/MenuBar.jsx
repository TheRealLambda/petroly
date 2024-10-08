import { Link } from "react-router-dom"
import "./styles/menu_bar.css"
import { useRef, useState } from "react"
import MonthsPicker from "./MonthsPicker"
import MonthsSlider from "./MonthsSlider"
import SearchEventsModal from "./SearchEventsModal"
import axios from "axios"

const MenuBar = ({ resetWeek, changeWeek, state, setPeriod}) => {

  const [showSearchField, setShowSearchField] = useState(false)
  const [searchStartDate, setSearchStartDate] = useState(null)
  const [searchEndDate, setSearchEndDate] = useState(null)
  const [searchEventsResult, setSearchEventsResult] = useState([])
  const menuBar = useRef(null)
  const monthButtonArrow = useRef(null)
  
  const currentDay = new Date().getDate() 

  const openSideMenu = (e) => {
    const sideMenu = document.getElementById("sideMenu")
    sideMenu.classList.add("open")
  }

  const closeSideMenu = (e) => {
    const target = e.target
    console.log(target);
    if(target.classList.contains("wrapper")) {
      target.parentNode.classList.remove("open")
    }
  }

  const handleDivClick = (e) => {
    resetWeek()
  }

  const dayView = () => {
    setPeriod(1)
    const sideMenu = document.getElementById("sideMenu")
    sideMenu.classList.remove("open")
  }
  const threeDaysView = () => {
    setPeriod(3)
    const sideMenu = document.getElementById("sideMenu")
    sideMenu.classList.remove("open")
  }
  const fiveDaysView = () => {
    setPeriod(5)
    const sideMenu = document.getElementById("sideMenu")
    sideMenu.classList.remove("open")
  }
  const weekView = () => {
    setPeriod(7)
    const sideMenu = document.getElementById("sideMenu")
    sideMenu.classList.remove("open")
  }

  const openMonthsPicker = () => {
    menuBar.current.style.height = "300px"
    monthButtonArrow.current.setAttribute("transform", "rotate(-180)")
    document.getElementById("annoyingDiv").style.top = "320px"
    document.getElementById("navBar").style.top = "640px"
    document.getElementById("blockPointerEvents").style.display = "block"
  }

  const closeMonthsPicker = () => {
    menuBar.current.style.height = "40px"
    monthButtonArrow.current.setAttribute("transform", "rotate(0)")
    document.getElementById("annoyingDiv").style.top = "60px"
    document.getElementById("navBar").style.top = "570px"
    document.getElementById("blockPointerEvents").style.display = "none"
  }
  const handleShowMonthsButton = () => {
    if(menuBar.current.style.height === "300px") {
      closeMonthsPicker()
    } else {
      openMonthsPicker()
    }
  }

  const searchEvents = async () => {
    const body = {
      search_text: document.getElementById("searchText").value,
      start_time: searchStartDate,
      end_time: searchEndDate
    }
    const result = await axios.post("http://localhost:3001/api/events/search", body)
    setSearchEventsResult(result.data)
    console.log(result.data);
    document.getElementById("searchEventsModal").classList.add("show")
  }

  const handleShowSearchField = () => {
    menuBar.current.style.height = "80px"
    document.getElementById("annoyingDiv").style.top = "100px"
    setShowSearchField(true)
  }

  const handleCloseSearchField = () => {
    menuBar.current.style.height = "40px"
    document.getElementById("annoyingDiv").style.top = "60px"
    setShowSearchField(false)
  }

  return (
    <div ref={menuBar} className="menu_bar bgcolor-primary">
      <div id="sideMenu" className="side_menu">
        <div onClick={closeSideMenu} className="wrapper bgcolor-accent">
          <div className="menu bgcolor-primary">
            <div className="bgcolor-primary button_effect_1_darker_se" onClick={dayView}>
              <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-280q-33 0-56.5-23.5T120-360v-240q0-33 23.5-56.5T200-680h560q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H200Zm-41-480q-17 0-28-11.5T120-800q0-17 11.5-28.5T160-840h641q17 0 28 11.5t11 28.5q0 17-11.5 28.5T800-760H159Zm0 640q-17 0-28-11.5T120-160q0-17 11.5-28.5T160-200h641q17 0 28 11.5t11 28.5q0 17-11.5 28.5T800-120H159Z"/></svg>
              <p className="text-14-semibold color-white">Day</p>
            </div>
            <div className="bgcolor-primary button_effect_1_darker_se" onClick={threeDaysView}>
              <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M600-120q-33 0-56.5-23.5T520-200v-560q0-33 23.5-56.5T600-840h160q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600Zm-400 0q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h160q33 0 56.5 23.5T440-760v560q0 33-23.5 56.5T360-120H200Z"/></svg>
              <p className="text-14-semibold color-white">3 days</p>
            </div>
            <div className="bgcolor-primary button_effect_1_darker_se" onClick={fiveDaysView}>
              <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h53q33 0 56.5 23.5T293-720v480q0 33-23.5 56.5T213-160h-53Zm294 0q-33 0-56.5-23.5T374-240v-480q0-33 23.5-56.5T454-800h53q33 0 56.5 23.5T587-720v480q0 33-23.5 56.5T507-160h-53Zm293 0q-33 0-56.5-23.5T667-240v-480q0-33 23.5-56.5T747-800h53q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160h-53Z"/></svg>
              <p className="text-14-semibold color-white">5 days</p>
            </div>
            <div className="bgcolor-primary button_effect_1_darker_se" onClick={weekView}>
              <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M550-200q-17 0-28.5-11.5T510-240v-480q0-17 11.5-28.5T550-760h55q17 0 28.5 11.5T645-720v480q0 17-11.5 28.5T605-200h-55Zm-195 0q-17 0-28.5-11.5T315-240v-480q0-17 11.5-28.5T355-760h55q17 0 28.5 11.5T450-720v480q0 17-11.5 28.5T410-200h-55Zm-195 0q-17 0-28.5-11.5T120-240v-480q0-17 11.5-28.5T160-760h55q17 0 28.5 11.5T255-720v480q0 17-11.5 28.5T215-200h-55Zm585 0q-17 0-28.5-11.5T705-240v-480q0-17 11.5-28.5T745-760h55q17 0 28.5 11.5T840-720v480q0 17-11.5 28.5T800-200h-55Z"/></svg>
              <p className="text-14-semibold color-white">Week</p>
            </div>
            <div className="separator bgcolor-white"></div>
            <Link to="/app/schedule/courses" style={{textDecoration: "none"}}>
              <div className="bgcolor-primary button_effect_1_darker_se">
                <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm200-720v245q0 12 9.5 17.5t20.5-.5l49-29q10-6 20.5-6t20.5 6l49 29q11 6 21 .5t10-17.5v-245H440Z"/></svg>
                <p className="text-14-semibold color-white">Courses</p>
              </div>
            </Link>
            <div className="separator bgcolor-white"></div>
            <div className="bgcolor-primary button_effect_1_darker_se">
              <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M433-80q-27 0-46.5-18T363-142l-9-66q-13-5-24.5-12T307-235l-62 26q-25 11-50 2t-39-32l-47-82q-14-23-8-49t27-43l53-40q-1-7-1-13.5v-27q0-6.5 1-13.5l-53-40q-21-17-27-43t8-49l47-82q14-23 39-32t50 2l62 26q11-8 23-15t24-12l9-66q4-26 23.5-44t46.5-18h94q27 0 46.5 18t23.5 44l9 66q13 5 24.5 12t22.5 15l62-26q25-11 50-2t39 32l47 82q14 23 8 49t-27 43l-53 40q1 7 1 13.5v27q0 6.5-2 13.5l53 40q21 17 27 43t-8 49l-48 82q-14 23-39 32t-50-2l-60-26q-11 8-23 15t-24 12l-9 66q-4 26-23.5 44T527-80h-94Zm49-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z"/></svg>
              <p className="text-14-semibold color-white">Settings</p>
            </div>
          </div>
        </div>
      </div>
      <div onClick={()=>closeMonthsPicker()} id="blockPointerEvents" className="block_pointer_events"></div>
        {showSearchField ? 
          <>
            <SearchEventsModal searchResult={searchEventsResult} />
            <div className="events_search_field">
              <div onClick={handleCloseSearchField} className="close_button bgcolor-primary button_effect_1_darker">
                <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
              </div>
              <input id="searchText" className="bgcolor-primary color-white text-14-medium" type="text" placeholder="search for events"/>
              <div onClick={searchEvents} className="search_button bgcolor-primary button_effect_1_darker">
                <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
              </div>
            </div>
            <div className="search_field_options">
              <div className="time_constraint color-white text-14-medium">
                <span>Between</span><input onChange={(e)=>setSearchStartDate(new Date(e.target.value))} type="date" /><span>and</span><input onChange={(e)=>setSearchEndDate(new Date(e.target.value))} type="date" />
              </div>
            </div>
          </> : 
        <><div className="flex_row">
          <div className="div1">
            <div onClick={openSideMenu} className="burger_icon bgcolor-primary button_effect_1_darker">
              <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
            </div>
            <div onClick={handleShowMonthsButton} className="today bgcolor-primary button_effect_1_darker">
              <h5 id="monthText" className="color-white">June</h5>
              <svg ref={monthButtonArrow} className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M459-381 314-526q-3-3-4.5-6.5T308-540q0-8 5.5-14t14.5-6h304q9 0 14.5 6t5.5 14q0 2-6 14L501-381q-5 5-10 7t-11 2q-6 0-11-2t-10-7Z"/></svg>
            </div>
          </div>
          <div className="div2">
            <div onClick={handleShowSearchField} className="search_icon bgcolor-primary button_effect_1_darker">
              <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
            </div>
            <div className="bgcolor-primary button_effect_1_darker">
              <div onClick={handleDivClick} className="current_day"><div className="text-12-bold color-white">{currentDay}</div></div>
            </div>
            <div className="profile_icon bgcolor-primary button_effect_1_darker">
              <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
            </div>
          </div>
        </div>
        <MonthsPicker />
        <MonthsSlider changeWeek={changeWeek} state={state} /></>}
    </div>
  )
}

export default MenuBar