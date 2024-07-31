import { useEffect, useState } from "react"
import "./styles/courses_page.css"
import axios from "axios"
import { Link } from "react-router-dom"

 const CoursesPage = () => {

  const [courses, setCourses] = useState([])
  const [activeCourses, setActiveCourses] = useState([])
  const [activeTerm, setActiveTerm] = useState("241")
  const [term, setTerm] = useState("")
  const [department, setDepartment] = useState("")

  console.log(term);
  console.log(department);
  console.log(activeTerm);

  const openSearchModal = (e) => {
    const modalContainer = document.getElementById("searchModalContainer")
    modalContainer.scrollTo({top: 640, behavior: "smooth"})
    modalContainer.classList.add("open")
  }

  useEffect(() => {

    async function loadActiveCourses() {
      const result = await axios.get("http://localhost:3001/api/active-courses")
      console.log(result.data.map(temp => {
        const a = temp.course_id
        a.id = temp._id
        return a
      }));
      setActiveCourses(result.data.map(temp => {
        const a = temp.course_id
        a.id = temp._id
        return a
      }))


    } 
    loadActiveCourses()

    const modalContainer = document.getElementById("searchModalContainer")
    modalContainer.addEventListener("scrollend", (e) => {
      // console.log(e.currentTarget.scrollTop);
      if(e.currentTarget.scrollTop < 640) {
        modalContainer.classList.remove("open")
      }
    })
  }, [])

  const addCourse = async (course) => {
    console.log("CCCCCCCCCCCCCCCCCCCCC:", course);
    const body = {
      course_id: course._id
    }
    const result = await axios.post("http://localhost:3001/api/active-courses", body)
    console.log(result.data);
    setActiveCourses(activeCourses.concat(result.data._id))
  }

  const handleTermsSlider = (e) => {
    if(e.target !== e.currentTarget) {
      setActiveTerm(e.target.getAttribute("data-term"))
      Array.from(e.currentTarget.children).forEach(child => {
        child === e.target ? child.classList.add("chosen") : child.classList.remove("chosen")
      })
    }
  }

  const deleteActiveCourse = async (id) => {
    const result = await axios.delete("http://localhost:3001/api/active-courses/"+id)
    console.log(result.data);
    setActiveCourses(activeCourses.filter(activeCourse => activeCourse.id !== id))
  }

  useEffect(() => {
    const searchCourses = async (e) => {
      if(term && department) {
        const result = await axios.get("http://localhost:3001/api/courses?term="+term+"&department="+encodeURIComponent(department))
        setCourses(result.data)
      }
    }
    searchCourses();
  }, [term, department])

  return (
    <div className="courses_page">
      <div id="searchModalContainer" className="search_modal_container">
        <div className="doll_modal"></div>
        <div className="search_modal bgcolor-BG">
          <div className="drag_indicator bgcolor-accent"></div>
          <div className="search_field bgcolor-white">
            <input className="text-16-medium" placeholder="Search for courses"/>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
          </div> 
          <div className="options">
            {/* <div className="term_option bgcolor-white">
              <div className="text">
                <p className="text-16-medium">241</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M459-381 314-526q-3-3-4.5-6.5T308-540q0-8 5.5-14t14.5-6h304q9 0 14.5 6t5.5 14q0 2-6 14L501-381q-5 5-10 7t-11 2q-6 0-11-2t-10-7Z"/></svg>
              </div>
            </div>
            <div className="department_option bgcolor-white">
              <div className="text">
                <p className="text-16-medium">Department</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M459-381 314-526q-3-3-4.5-6.5T308-540q0-8 5.5-14t14.5-6h304q9 0 14.5 6t5.5 14q0 2-6 14L501-381q-5 5-10 7t-11 2q-6 0-11-2t-10-7Z"/></svg>
              </div>
            </div> */}
            <select onChange={(e)=>setTerm(e.target.value)} name="term">
              <option value="">Term</option>
              <option value="231">231</option>
              <option value="232">232</option>
              <option value="233">233</option>
              <option value="241">241</option>
            </select>
            <select onChange={(e)=>setDepartment(e.target.value)} name="department">
              <option value="">Department</option>
              <option value="Accounting & Finance">Accounting & Finance</option>
              <option value="Aerospace Engineering">Aerospace Engineering</option>
              <option value="Arch. Engg & Construction Mgt.">Arch. Engg & Construction Mgt.</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
              <option value="Computer Engineering">Computer Engineering</option>
            </select>
          </div>
          <div className="separator bgcolor-accent"></div>
          <div className="list">
            {courses.map(course => {
              console.log(activeCourses.length > 0);
              return (
                <div className="bgcolor-white">
                  <p>{course.course_name} {course.course_type}</p>
                  <p>{course.course_term} {course.course_department}</p>
                  {activeCourses.length > 0 ? (activeCourses.map(temp => {
                    console.log("HERE:", temp._id, course._id, temp.course_id === course._id);
                    if(temp._id === course._id) {
                      return <button onClick={() => window.alert("This course is already added")}>Active</button>
                    } else {
                      return <button onClick={() => addCourse(course)}>Add</button>
                    }
                  })) : (<button onClick={() => addCourse(course)}>Add</button>)}
                </div>
              )
            })}
            {/* <div className="bgcolor-white"></div>
            <div className="bgcolor-white"></div>
            <div className="bgcolor-white"></div>
            <div className="bgcolor-white"></div>
            <div className="bgcolor-white"></div>
            <div className="bgcolor-white"></div>
            <div className="bgcolor-white"></div>
            <div className="bgcolor-white"></div>
            <div className="bgcolor-white"></div> */}
          </div>
        </div>
      </div>
      <div className="top">
        <Link to="/schedule" style={{textDecoration: "none"}}>
          <div className="bgcolor-white">
            <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z"/></svg>
          </div>
        </Link>
        <div className="bgcolor-white">
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
        </div>
      </div>
      <p className="text-24-medium color-accent header">Courses</p>
      <div onClick={handleTermsSlider} className="terms">
        <div data-term="241" className="text-14-medium bgcolor-white color-accent chosen">241</div>
        <div data-term="233" className="text-14-medium bgcolor-white color-accent">233</div>
        <div data-term="232" className="text-14-medium bgcolor-white color-accent">232</div>
        <div data-term="231" className="text-14-medium bgcolor-white color-accent">231</div>
      </div>
      <div className="courses">
        {activeCourses.map(course => {
          console.log("HERE:", course.course_term, activeTerm, course.course_term === activeTerm);
          if(course.course_term === activeTerm) {
            return <div className="bgcolor-white">{course.course_name} {course._id}<button onClick={()=>deleteActiveCourse(course.id)}>Delete</button></div>
          }
        })}
      </div>
      <div onClick={openSearchModal} className="add_button bgcolor-primary">
        <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440v120q0 17 11.5 28.5T480-280q17 0 28.5-11.5T520-320v-120h120q17 0 28.5-11.5T680-480q0-17-11.5-28.5T640-520H520v-120q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v120H320q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440h120Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
        <p className="text-16-medium color-white">Add course</p>
      </div>
    </div>
  )
 }

 export default CoursesPage