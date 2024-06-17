import "./styles/home_page.css"
import ClassWidget from "./CLassWidget"
import ClassTasksWidget from "./ClassTasksWidget"
import DotsSlider from "./DotsSlider"
import TasksSection from "./TasksSection"
const HomePage = () => {

  return (
    <div className="homepage">
      <ClassWidget />
      <ClassTasksWidget />
      <DotsSlider />
      <TasksSection />
    </div>
  )
}

export default HomePage