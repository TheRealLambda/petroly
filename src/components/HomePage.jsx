import "./styles/home_page.css"
import ClassWidget from "./CLassWidget"
import ClassTasksWidget from "./ClassTasksWidget"
import DotsSlider from "./DotsSlider"
import TasksSection from "./TasksSection"
import WeekSlider from "./WeekSlider"
import ScheduleToday from "./ScheduleToday"
import NavBar from "./NavBar"
const HomePage = () => {

  const hideSideMenu = (event) =>{
    const page = document.getElementsByClassName("homepage")[0]
    page.classList.remove("side_menu_open")
    document.getElementById("menu_cover").style.height = "0px"
  }

  return (
    <div className="homepage">
      <div onClick={hideSideMenu} id="menu_cover"></div>
      <NavBar />
      <ClassWidget />
      {/* <ClassTasksWidget /> */}
      {/* <DotsSlider /> */}
      <TasksSection />
      <WeekSlider />
      {/* <ScheduleToday /> */}
    </div>
  )
}

export default HomePage