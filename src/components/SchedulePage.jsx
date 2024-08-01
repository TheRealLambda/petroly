import MenuBar from "./MenuBar"
import WeekPicker from "./WeekPicker"
import NavBar from "./NavBar"
import "./styles/schedule_page.css"
import TimeTable from "./TimeTable"
import { useEffect, useState } from "react"
import axios from "axios"
import CreateEventForm from "./CreateEventForm"
import ShowEventForm from "./ShowEventForm"
import EditEventForm from "./EditEventForm"

const SchedulePage = () => {

  // week is 0-indexed
  const [week, setWeek] = useState(() => {
    const firstDayOfYear = new Date(2024, 1-1, 1)
    const daysUntilFirstSunday = firstDayOfYear.getDay() === 0 ? 0 : 7-firstDayOfYear.getDay()
    
    //get first sunday after first day of year. Calculations will use this as the first day of the year
    const firstSundayOfYear = new Date(firstDayOfYear)
    firstSundayOfYear.setDate(firstSundayOfYear.getDate() + daysUntilFirstSunday)
    
    const currentDate = new Date()
    const numberOfDays = (currentDate - firstSundayOfYear) / (1*24*60*60*1000)
  
    const numberOfWeeks = Math.floor(numberOfDays / 7)
    return numberOfWeeks
  })

  
  const [eventModalId, setEventModalId] = useState({id: "", edit: false})

  console.log("[week]", week);

  const hideSideMenu = (event) =>{
    const page = document.getElementsByClassName("schedule_page")[0]
    page.classList.remove("side_menu_open")
    document.getElementById("menu_cover").style.height = "0px"
  }

  const handleScroll1 = () => {
    const div1 = document.getElementById("week_picker_wrapper")
    const div2 = document.getElementById("div2_wrapper")
    div2.removeEventListener("scroll", handleScroll2)
    if(div1.classList.contains("lock_scroll")) {
      div2.scrollTo({behavior: "instant", left: div1.scrollLeft})
    } else {
      div2.scrollTo({behavior: "smooth", left: div1.scrollLeft})
    }
    window.requestAnimationFrame(() => {
      div2.addEventListener("scroll", handleScroll2)
    })
  }
  const handleScroll2 = () => {
    const div1 = document.getElementById("week_picker_wrapper")
    const div2 = document.getElementById("div2_wrapper")
    div1.removeEventListener("scroll", handleScroll1)
    div1.scrollTo({behavior: "smooth", left: div2.scrollLeft})
    window.requestAnimationFrame(() => {
      div1.addEventListener("scroll", handleScroll1)
    })
    // console.log("div2");
  }

  const resetSchedule = async () => {
    document.getElementById("eventCreateModel").scrollTo({top: 0, behavior: "smooth"})
    document.getElementById("eventCreate").style.display = "none"
    // console.log("Schedule reset...");
    Array.from(document.querySelectorAll(".event_create.testingHAHA")).forEach((div => div.remove()))
    const events = await axios.get("http://localhost:3001/api/events")
    // console.log("events=", events);
    Array.from(document.getElementById("week_picker_wrapper").children).forEach((week, i) => {
      Array.from(week.firstElementChild.children).forEach((day, j) => {
        // console.log(i, j, (day.offsetLeft-66)%360);
        // console.log(day);
        events.data.forEach(event => {
          const eventDate = new Date(event.start_time)
          const endDate = new Date(event.end_time)
          const temp = new Date(event.start_time)
          temp.setHours(0, 0, 0, 0)

          // console.log("eventDate=", eventDate);
          const dayDateAttrib = day.getAttribute("data-date").split("-")
          const dayDate = new Date(Number(dayDateAttrib[0]), Number(dayDateAttrib[1]), Number(dayDateAttrib[2]))
          // console.log("dayDateAttrib=", dayDateAttrib);
          // console.log(dayDate);
          // console.log(day);
          if(temp.getTime() === dayDate.getTime()) {
            // console.log("DAY FOUND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            const newDiv = document.createElement("div")
            newDiv.innerText = event.title
            newDiv.classList.add("event_create")
            newDiv.classList.add("testingHAHA")
            newDiv.style.top = (eventDate.getHours()+eventDate.getMinutes()/60)*75+"px"
            // console.log("top=", (eventDate.getHours()+eventDate.getMinutes()/60)*75);

            newDiv.style.left = ((day.offsetLeft-66)%360)+"px"
            // console.log("left=", day.offsetLeft);

            const height = (endDate.getHours()+endDate.getMinutes()/60)*75 - (eventDate.getHours()+eventDate.getMinutes()/60)*75
            newDiv.style.height = height+"px"
            newDiv.style.display = "block"
            // console.log(document.querySelectorAll("#div2_wrapper .div2")[1]);
            document.querySelectorAll("#div2_wrapper .div2")[i].appendChild(newDiv)
          }
        })
      })
    })
  }

  const postEvent = (e) => {
    const tempEvent = document.getElementById("eventCreate")
    // console.log(tempEvent.getAttribute("data-start"));
    const object = {
      start_time: tempEvent.getAttribute("data-start"),
      end_time: tempEvent.getAttribute("data-end"),
      title: "test",
      desc: "description for testing"
    }
    axios.post("http://localhost:3001/api/events", object).then(result => {
      console.log(result);
      resetSchedule()
    })
  }

  useEffect(() => {
    // console.log("ATTACHING SCROLL EVENT");
    const div1 = document.getElementById("week_picker_wrapper")
    const div2 = document.getElementById("div2_wrapper")
    div1.addEventListener("scroll", handleScroll1)
    // div2.addEventListener("scroll", handleScroll2)
  }, [])

  console.log(eventModalId);


  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())


  return (
    <div className="schedule_page">
      <div onClick={hideSideMenu} id="menu_cover"></div>
      <div id="eventCreateModel" className="event_create_model">
        <div className="content">
          {!eventModalId.id  && <CreateEventForm startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />}
          {eventModalId.id && !eventModalId.edit && <ShowEventForm eventModalId={eventModalId} setEventModalId={setEventModalId} />}
          {eventModalId.id && eventModalId.edit && <EditEventForm eventModalId={eventModalId} setEventModalId={setEventModalId} />}
        </div>
      </div>
      <NavBar />
      <MenuBar />
      <WeekPicker week={week} setWeek={setWeek} setEventModalId={setEventModalId} />
      <TimeTable week={week} setWeek={setWeek} setEventModalId={setEventModalId} setStartDate={setStartDate} setEndDate={setEndDate} />
    </div>
  )
}

export default SchedulePage