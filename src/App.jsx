import "./app.css"
import ClassPage from "./components/ClassPage.jsx"
import DiscoverPage from "./components/DiscoverPage.jsx"
import HomePage from "./components/HomePage.jsx"
import NavBar from "./components/NavBar.jsx"
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
          <Route path="/home" element={<HomePage/>} />
          <Route path="/schedule" element={<SchedulePage/>} />
          <Route path="/discover" element={<DiscoverPage/>} />
          <Route path="/tasks" element={<TasksPage/>} />
          <Route path="/class" element={<ClassPage/>} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
