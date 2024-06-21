import MenuBar from "./MenuBar"
import WeekPicker from "./WeekPicker"
import NavBar from "./NavBar"
import "./styles/schedule_page.css"
import TimeTable from "./TimeTable"

const SchedulePage = () => {

  return (
    <div className="schedule_page">
      <NavBar />
      <MenuBar />
      <WeekPicker />
      <TimeTable />
    </div>
  )
}

export default SchedulePage