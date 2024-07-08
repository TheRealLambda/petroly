import MenuBar from "./MenuBar"
import WeekPicker from "./WeekPicker"
import NavBar from "./NavBar"
import "./styles/schedule_page.css"
import TimeTable from "./TimeTable"
import { useEffect } from "react"

const SchedulePage = () => {

  const hideSideMenu = (event) =>{
    const page = document.getElementsByClassName("schedule_page")[0]
    page.classList.remove("side_menu_open")
    document.getElementById("menu_cover").style.height = "0px"
  }

  const handleScroll1 = () => {
    const div1 = document.getElementById("week_picker_wrapper")
    const div2 = document.getElementById("div2_wrapper")
    div2.removeEventListener("scroll", handleScroll2)
    div2.scrollTo({behavior: "smooth", left: div1.scrollLeft})
    window.requestAnimationFrame(() => {
      div2.addEventListener("scroll", handleScroll2)
    })
    console.log("div1");
  }
  const handleScroll2 = () => {
    const div1 = document.getElementById("week_picker_wrapper")
    const div2 = document.getElementById("div2_wrapper")
    div1.removeEventListener("scroll", handleScroll1)
    div1.scrollTo({behavior: "smooth", left: div2.scrollLeft})
    window.requestAnimationFrame(() => {
      div1.addEventListener("scroll", handleScroll1)
    })
    console.log("div2");
  }

  useEffect(() => {
    console.log("ATTACHING SCROLL EVENT");
    const div1 = document.getElementById("week_picker_wrapper")
    const div2 = document.getElementById("div2_wrapper")
    div1.addEventListener("scroll", handleScroll1)
    div2.addEventListener("scroll", handleScroll2)
  }, [])

  return (
    <div className="schedule_page">
      <div onClick={hideSideMenu} id="menu_cover"></div>
      <div id="eventCreateModel" className="event_create_model">
        <div className="content">
          <div className="scroll"></div>
        </div>
      </div>
      <NavBar />
      <MenuBar />
      <WeekPicker />
      <TimeTable />
    </div>
  )
}

export default SchedulePage