import "./app.css"
import DiscoverPage from "./components/DiscoverPage.jsx"
import HomePage from "./components/HomePage.jsx"
import NavBar from "./components/NavBar.jsx"
import SchedulePage from "./components/SchedulePage.jsx"
import SideMenu from "./components/SideMenu.jsx"
import TasksPage from "./components/TasksPage.jsx"
function App() {

  return (
    <main>
      {/* <NavBar /> */}
      {/* <HomePage /> */}
      {/* <SchedulePage /> */}
      {/* <DiscoverPage /> */}
      <SideMenu />
      <TasksPage />
    </main>
  )
}

export default App
