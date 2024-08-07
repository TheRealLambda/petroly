import "./app.css"
import ClassPage from "./components/ClassPage.jsx"
import CoursesPage from "./components/CoursesPage.jsx"
import DiscoverPage from "./components/DiscoverPage.jsx"
import HomePage from "./components/HomePage.jsx"
import NavBar from "./components/NavBar.jsx"
import SandBox from "./components/SandBox.jsx"
import SchedulePage from "./components/SchedulePage.jsx"
import SideMenu from "./components/SideMenu.jsx"
import TasksPage from "./components/TasksPage.jsx"
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
function App() {

  return (
    <main>
      <SideMenu />
      <Router>
        <Routes>
          <Route path="/sandbox" element={<SandBox/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/schedule" element={<SchedulePage/>} />
          <Route path="/schedule/courses" element={<CoursesPage/>} />
          <Route path="/discover" element={<DiscoverPage/>} />
          <Route path="/tasks" element={<TasksPage/>} />
          <Route path="/class" element={<ClassPage/>} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
