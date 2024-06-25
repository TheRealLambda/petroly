import "./styles/home_page.css"
import ClassWidget from "./CLassWidget"
import ClassTasksWidget from "./ClassTasksWidget"
import DotsSlider from "./DotsSlider"
import TasksSection from "./TasksSection"
import WeekSlider from "./WeekSlider"
import ScheduleToday from "./ScheduleToday"
import NavBar from "./NavBar"
const HomePage = () => {

  return (
    <div className="homepage">
      {/* <div id="menu_cover"></div> */}
      <NavBar />
      <ClassWidget />
      <ClassTasksWidget />
      <DotsSlider />
      <TasksSection />
      <WeekSlider />
      <ScheduleToday />
    </div>
  )
}

export default HomePage