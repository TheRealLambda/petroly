import "./styles/home_page.css"
import ClassWidget from "./CLassWidget"
import ClassTasksWidget from "./ClassTasksWidget"
import DotsSlider from "./DotsSlider"
import TasksSection from "./TasksSection"
import WeekSlider from "./WeekSlider"
import ScheduleToday from "./ScheduleToday"
const HomePage = () => {

  return (
    <div className="homepage">
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