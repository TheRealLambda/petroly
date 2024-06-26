import MenuBar from "./MenuBar"
import WeekPicker from "./WeekPicker"
import NavBar from "./NavBar"
import "./styles/schedule_page.css"
import TimeTable from "./TimeTable"

const SchedulePage = () => {

  const hideSideMenu = (event) =>{
    const page = document.getElementsByClassName("schedule_page")[0]
    page.classList.remove("side_menu_open")
    document.getElementById("menu_cover").style.height = "0px"
  }

  return (
    <div className="schedule_page">
      <div onClick={hideSideMenu} id="menu_cover"></div>
      <NavBar />
      <MenuBar />
      <WeekPicker />
      <TimeTable />
    </div>
  )
}

export default SchedulePage