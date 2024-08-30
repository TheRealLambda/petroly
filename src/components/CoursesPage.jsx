import { useEffect, useRef, useState } from "react"
import "./styles/courses_page.css"
import axios from "axios"
import { Link } from "react-router-dom"
import ActiveCourseWidget from "./ActiveCourseWidget"
import CustomSelect from "./CustomSelect"
import CustomSelectOption from "./CustomSelectOption"
import { deleteActiveCourse, getActiveCourses, postActiveCourse, searchCourses } from "../services/activeCourses"
import ActiveCourseSRWidget from "./ActiveCourseSRWidget"

 const CoursesPage = () => {

  const [courses, setCourses] = useState([])
  const [activeCourses, setActiveCourses] = useState([])
  const [activeTerm, setActiveTerm] = useState("241")
  const [term, setTerm] = useState("")
  const [department, setDepartment] = useState("")

  const [searchText, setSearchText] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const searchPage = useRef(null) 

  const openSearchModal = (e) => {
    const modalContainer = document.getElementById("searchModalContainer")
    modalContainer.scrollTo({top: 640, behavior: "smooth"})
    modalContainer.classList.add("open")
  }

  useEffect(() => {

    async function loadActiveCourses() {
      const result = await getActiveCourses()
      // console.log(result.data.map(temp => {
      //   const a = temp.course_id
      //   a.id = temp._id
      //   return a
      // }));
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
    console.log("Adding course:", course);
    const body = {
      course_id: course._id,
      term
    }
    const result = await postActiveCourse(body)
    console.log(result.data);
    const activeCourse = result.data.course_id
    activeCourse.id = result.data._id
    setActiveCourses(activeCourses.concat(activeCourse))
  }

  const handleTermsSlider = (e) => {
    if(e.target !== e.currentTarget) {
      setActiveTerm(e.target.getAttribute("data-term"))
      Array.from(e.currentTarget.children).forEach(child => {
        child === e.target ? child.classList.add("chosen") : child.classList.remove("chosen")
      })
    }
  }

  const deleteActiveCourseWrapper = async (id) => {
    const result = await deleteActiveCourse(id)
    console.log(result.data);
    setActiveCourses(activeCourses.filter(activeCourse => activeCourse.id !== id))
  }

  useEffect(() => {
    const searchCoursesWrapper = async (e) => {
      if(term && department) {
        const result = await searchCourses(term, department)
        setCourses(result.data)
      }
    }
    searchCoursesWrapper();
  }, [term, department])

  const openSearchPage = () => {
    searchPage.current.classList.add("show")
  }

  const closeSearchPage = () => {
    setSearchText("")
    setSearchResult([])
    searchPage.current.classList.remove("show")
  }

  useEffect(() => {
    if(searchText.trim()) {
      console.log(searchText);
      const result = []
      activeCourses.forEach(ac => {
        if(ac.course_name.toLowerCase().includes(searchText.trim().toLowerCase())) {
          let exists = false
          result.forEach(r => {
            if(r.term === ac.course_term) {
              exists = true
              r.acs.push(ac)
            }
          })
          if(!exists) result.push({term: ac.course_term, acs: [ac]})
        }
      })
      console.log(result);
      setSearchResult(result)
    }
  }, [searchText])


  return (
    <div className="courses_page">
      <div ref={searchPage} className="search_page bgcolor-BG">
        <div onClick={closeSearchPage} className="search_field">
          <div className="svg bgcolor-BG">
            <svg className="bgcolog-BG" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
          </div>
          <input onChange={(e)=>setSearchText(e.target.value)} type="text" className="search_input text-16-medium" placeholder="search for active courses" value={searchText}/>
        </div>
        <div className="search_result">
          {searchResult.map(result => {
            return (
              <div> 
                <p className="text-16-medium color-accent">Term {result.term}</p>
                <div className="search_result_list">
                  {result.acs.map(ac => <ActiveCourseWidget course={ac} deleteActiveCourse={deleteActiveCourseWrapper}/>)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div id="searchModalContainer" className="search_modal_container">
        <div className="doll_modal"></div>
        <div className="search_modal bgcolor-BG">
          <div className="drag_indicator bgcolor-accent"></div>
          <div className="search_field bgcolor-white">
            <input className="text-16-medium" placeholder="Search for courses"/>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
          </div> 
          <div className="options">
            
            {/* <select onChange={(e)=>setTerm(e.target.value)} name="term">
              <option value="">Term</option>
              <option value="231">231</option>
              <option value="232">232</option>
              <option value="233">233</option>
              <option value="241">241</option>
            </select> */}
            <CustomSelect className="term_option" onChange={(e)=>setTerm(e.target.value)} defaultValue="Term">
              <CustomSelectOption selectValue="241"/>
              <CustomSelectOption selectValue="233"/>
              <CustomSelectOption selectValue="232"/>
              <CustomSelectOption selectValue="231"/>
              <CustomSelectOption selectValue="231"/>
              <CustomSelectOption selectValue="231"/>
              <CustomSelectOption selectValue="231"/>
              <CustomSelectOption selectValue="231"/>
              <CustomSelectOption selectValue="231"/>
              <CustomSelectOption selectValue="231"/>
            </CustomSelect>

            <CustomSelect className="department_option" onChange={(e)=>setDepartment(e.target.value)} defaultValue="Department" >
              <CustomSelectOption selectValue="Accounting & Finance"/>
              <CustomSelectOption selectValue="Aerospace Engineering"/>
              <CustomSelectOption selectValue="Arch. Engg & Construction Mgt."/>
              <CustomSelectOption selectValue="Chemical Engineering"/>
              <CustomSelectOption selectValue="Computer Engineering"/>
            </CustomSelect>
          </div>
          <div className="separator bgcolor-accent"></div>
          <div className="list">
            {courses.map(course => {
              const found = activeCourses.some(activeCourse => activeCourse._id === course._id)
              return (
                <ActiveCourseSRWidget course={course} found={found} addActiveCourse={addCourse}/>
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
        <Link to="/app/schedule" style={{textDecoration: "none"}}>
          <div className="bgcolor-white">
            <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z"/></svg>
          </div>
        </Link>
        <div onClick={openSearchPage} className="bgcolor-white">
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
          if(course.course_term === activeTerm) {
            return <ActiveCourseWidget course={course} deleteActiveCourse={deleteActiveCourseWrapper} />
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