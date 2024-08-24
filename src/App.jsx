import "./app.css"
import ClassPage from "./components/ClassPage.jsx"
import CoursesPage from "./components/CoursesPage.jsx"
import DiscoverPage from "./components/DiscoverPage.jsx"
import HomePage from "./components/HomePage.jsx"
import SandBox from "./components/SandBox.jsx"
import SchedulePage from "./components/SchedulePage.jsx"
import SideMenu from "./components/SideMenu.jsx"
import TasksPage from "./components/TasksPage.jsx"
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import { useEffect, useState } from "react"
import LoginPage from "./components/LoginPage.jsx"
import { setToken } from "./services/events.js"


function App() {

  const [userAuthToken, setUserAuthToken] = useState(localStorage.getItem("userAuthToken"))
  if(userAuthToken) {
    setToken(userAuthToken)
  }

  /*
    This effect will run only once after the initial rendering.
    It will look if there is already a save token. If there is 
    a token, it will be put in the state. if there is not, 
    localStorage.getItem() will return null and nothing happens.
    ONLY LOGGED IN USERS CAN USE THIS APP!!
  */
  // useEffect(() => {
  //   const storedUserAuthToken = localStorage.getItem("userAuthToken")
  //   console.log(storedUserAuthToken);
  //   setUserAuthToken(storedUserAuthToken)
  // }, [])


  //If no token found, redirect to login page. Else proceed with the app
  return (
    <main>
      {userAuthToken === null ? 
      (
        <Router>
          <Routes>
            <Route path="*" element={<LoginPage setUserAuthToken={setUserAuthToken}/>} />
          </Routes>
        </Router>
      ) :
      (
        <>
          <SideMenu />
          <Router>
            <Routes>
              <Route path="/app/sandbox" element={<SandBox userAuthToken={userAuthToken}/>} />
              <Route path="/app/schedule" element={<SchedulePage userAuthToken={userAuthToken}/>} />
              <Route path="/app/schedule/courses" element={<CoursesPage userAuthToken={userAuthToken}/>} />
              <Route path="/app/discover" element={<DiscoverPage userAuthToken={userAuthToken}/>} />
              <Route path="/app/tasks" element={<TasksPage userAuthToken={userAuthToken}/>} />
              <Route path="/app/class" element={<ClassPage userAuthToken={userAuthToken}/>} />
              <Route path="/app/*" element={<HomePage userAuthToken={userAuthToken}/>} />
            </Routes>
          </Router>
        </>
      )}
    </main>
  )
}

export default App
