import { useRef, useState } from "react"
import "./styles/search_events_modal.css"

export default function SearchEventsModal({ searchResult }) {

  const [searchText, setSearchText] = useState("")
  const searchEventsModal = useRef(null)

  const closeSearchEventsModal = (e) => {
    searchEventsModal.current.classList.remove("show")
  }

  return (
    <div ref={searchEventsModal} id="searchEventsModal" className="search_events_modal bgcolor-BG">
      <div className="search_page bgcolor-BG">
        <div className="search_field">
          <div onClick={closeSearchEventsModal} className="svg bgcolor-BG button_effect_1_dark">
            <svg className="bgcolog-BG" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
          </div>
          <input onChange={(e)=>setSearchText(e.target.value)} type="text" className="search_input text-16-medium" placeholder="search for active courses" value={searchText}/>
        </div>
        <div className="search_result">
          {/* {searchResult.map(result => {
            return (
              <div> 
                <p className="text-16-medium color-accent">Term {result.term}</p>
                <div className="search_result_list">
                  {result.acs.map(ac => <ActiveCourseWidget course={ac} deleteActiveCourse={deleteActiveCourseWrapper}/>)}
                </div>
              </div>
            )
          })} */}
        </div>
      </div>
    </div>
  )
}