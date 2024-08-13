import MenuBar from "./MenuBar"
import WeekPicker from "./WeekPicker"
import NavBar from "./NavBar"
import "./styles/schedule_page.css"
import TimeTable from "./TimeTable"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import CreateEventForm from "./CreateEventForm"
import ShowEventForm from "./ShowEventForm"
import EditEventForm from "./EditEventForm"
import Modal from "./Modal"

const SchedulePage = () => {

  
  const options = {swipeDownToClose: false, dragDownToClose: false}

  /*
    State declarations
  */

  //week represents the current week of the year starting from week 0
  const [week, setWeek] = useState(() => {
    const firstDayOfYear = new Date(2024, 1-1, 1)
    const daysUntilFirstSunday = firstDayOfYear.getDay() === 0 ? 0 : 7-firstDayOfYear.getDay()
    
    //get first sunday after first day of year. Calculations will use this as the first day of the year
    const firstSundayOfYear = new Date(firstDayOfYear)
    firstSundayOfYear.setDate(firstSundayOfYear.getDate() + daysUntilFirstSunday)
    
    const currentDate = new Date()
    const numberOfDays = (currentDate - firstSundayOfYear) / (1*24*60*60*1000)
  
    const numberOfWeeks = Math.floor(numberOfDays / 7)
    return numberOfWeeks
  })
  const [eventModalId, setEventModalId] = useState({id: "", edit: false})
  //form is used to decide what type of form to render with its corresponding event
  const [form, setForm] = useState({type: "show", event: null}) 

  /*
    End of state declarations
  */


  const hideSideMenu = (event) =>{
    const page = document.getElementsByClassName("schedule_page")[0]
    page.classList.remove("side_menu_open")
    document.getElementById("menu_cover").style.height = "0px"
  }

  // const handleScroll1 = () => {
  //   const div1 = document.getElementById("week_picker_wrapper")
  //   const div2 = document.getElementById("div2_wrapper")
  //   div2.removeEventListener("scroll", handleScroll2)
  //   if(div1.classList.contains("lock_scroll")) {
  //     div2.scrollTo({behavior: "instant", left: div1.scrollLeft})
  //   } else {
  //     div2.scrollTo({behavior: "smooth", left: div1.scrollLeft})
  //   }
  //   window.requestAnimationFrame(() => {
  //     div2.addEventListener("scroll", handleScroll2)
  //   })
  // }
  // const handleScroll2 = () => {
  //   const div1 = document.getElementById("week_picker_wrapper")
  //   const div2 = document.getElementById("div2_wrapper")
  //   div1.removeEventListener("scroll", handleScroll1)
  //   div1.scrollTo({behavior: "smooth", left: div2.scrollLeft})
  //   window.requestAnimationFrame(() => {
  //     div1.addEventListener("scroll", handleScroll1)
  //   })
  // }
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    // const div1 = document.getElementById("week_picker_wrapper")
    // const div2 = document.getElementById("div2_wrapper")
    // div1.addEventListener("scroll", handleScroll1)
  }, [])


  return (
    <div className="schedule_page">
      <div onClick={hideSideMenu} id="menu_cover"></div>

      <NavBar />
      <MenuBar />
      <TimeTable week={week} setWeek={setWeek} setEventModalId={setEventModalId} setStartDate={setStartDate} setEndDate={setEndDate} />
    </div>
  )
}

export default SchedulePage