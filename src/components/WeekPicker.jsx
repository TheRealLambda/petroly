import { useCallback, useEffect } from "react"
import "./styles/week_picker.css"
import axios from "axios"

const WeekPicker = ({ week, setWeek }) => {
  const handleScroll = (event) => {
    const first = document.getElementById("first")
    const offsetLeft = first.getBoundingClientRect().left-document.getElementsByClassName("schedule_page")[0].offsetLeft

    if(!check && offsetLeft > 55 && offsetLeft < 65) {
      check = true
      document.getElementById("week_picker_wrapper").classList.add("lock_scroll")  
      setTimeout(() =>{
        setWeek(week => week-1)
        setTimeout(() => {
        document.getElementById("week_picker_wrapper").classList.remove("lock_scroll") 
        }, 50)
      }, 450)
    }
    const last = document.getElementById("last")
    const offsetRight = last.getBoundingClientRect().right-document.getElementsByClassName("schedule_page")[0].getBoundingClientRect().right
    if(!check && offsetRight > -5 && offsetRight < 5) {
      check = true
      document.getElementById("week_picker_wrapper").classList.add("lock_scroll")  
      setTimeout(() =>{
        setWeek(week => week+1)
        setTimeout(() => {
        document.getElementById("week_picker_wrapper").classList.remove("lock_scroll") 
        }, 50)
      },450)
    }
  }

  const resetSchedule = async () => {
    document.getElementById("eventCreateModel").scrollTo({top: 0, behavior: "smooth"})
    document.getElementById("eventCreate").style.display = "none"
    // console.log("Schedule reset...");
    Array.from(document.querySelectorAll(".event_create.testingHAHA")).forEach((div => div.remove()))
    const events = await axios.get("http://localhost:3001/api/events")
    console.log("events=", events);
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


  let check = false
  useEffect(() => {
    document.getElementById("monthText").innerText = (() => {
      const now = new Date()
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
      const day = firstDayOfYear.getDay()
      const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
      const sunday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7)
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      if(week > -1) { 
        return months[sunday.getMonth()]
      } else {
        return months[sunday.getMonth()].substring(0, 3)+" "+sunday.getFullYear()
      }
    })()
    // console.log("rendering...");
    document.getElementById("week_picker_wrapper").scrollTo({ behavior: "instant", left: 360})
    resetSchedule()
    document.getElementById("week_picker_wrapper").addEventListener("scroll", handleScroll);
    
    return () => {
      if(document.getElementById("week_picker_wrapper")) {
        document.getElementById("week_picker_wrapper").removeEventListener("scroll", handleScroll)
      }
    }
  }, [week])

  const prevWeekDays = () => {
    const now = new Date()
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
    const sunday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7)
    const monday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+1)
    const tuesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+2)
    const wednesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+3)
    const thursday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+4)
    const friday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+5)
    const saturday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week-1)*7+6)
    return [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
  }
  const activeWeekDays = () => {
    const now = new Date()
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
    const sunday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7)
    // console.log(sunday);
    const monday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+1)
    const tuesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+2)
    const wednesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+3)
    const thursday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+4)
    const friday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+5)
    const saturday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week)*7+6)
    return [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
  }
  console.log(activeWeekDays()[0]);
  const nextWeekDays = () => {
    const now = new Date()
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const day = firstDayOfYear.getDay()
    const toFirstSundayOfYear = day === 0 ? 0 : 7 - day
    const sunday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7)
    const monday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+1)
    const tuesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+2)
    const wednesday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+3)
    const thursday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+4)
    const friday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+5)
    const saturday = new Date(now.getFullYear(), 0, 1+toFirstSundayOfYear+(week+1)*7+6)
    return [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
  }

  return (
    <div id="week_picker_wrapper" className="week_picker_wrapper">
      <div id="first" className="week_picker">
        <div className="flex_container">
          <div className="week_day" data-date={prevWeekDays()[0].getFullYear()+"-"+(prevWeekDays()[0].getMonth())+"-"+prevWeekDays()[0].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{prevWeekDays()[0].getDate()}</p>
            </div>
          </div>
          <div className="week_day today" data-date={prevWeekDays()[1].getFullYear()+"-"+(prevWeekDays()[1].getMonth())+"-"+prevWeekDays()[1].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">M</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{prevWeekDays()[1].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={prevWeekDays()[2].getFullYear()+"-"+(prevWeekDays()[2].getMonth())+"-"+prevWeekDays()[2].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{prevWeekDays()[2].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={prevWeekDays()[3].getFullYear()+"-"+(prevWeekDays()[3].getMonth())+"-"+prevWeekDays()[3].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">W</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{prevWeekDays()[3].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={prevWeekDays()[4].getFullYear()+"-"+(prevWeekDays()[4].getMonth())+"-"+prevWeekDays()[4].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{prevWeekDays()[4].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={prevWeekDays()[5].getFullYear()+"-"+(prevWeekDays()[5].getMonth())+"-"+prevWeekDays()[5].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">F</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{prevWeekDays()[5].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={prevWeekDays()[6].getFullYear()+"-"+(prevWeekDays()[6].getMonth())+"-"+prevWeekDays()[6].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{prevWeekDays()[6].getDate()}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="active" className="week_picker">
        <div className="flex_container">
          <div className="week_day" data-date={activeWeekDays()[0].getFullYear()+"-"+(activeWeekDays()[0].getMonth())+"-"+activeWeekDays()[0].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{activeWeekDays()[0].getDate()}</p>
            </div>
          </div>
          <div className="week_day today" data-date={activeWeekDays()[1].getFullYear()+"-"+(activeWeekDays()[1].getMonth())+"-"+activeWeekDays()[1].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">M</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{activeWeekDays()[1].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={activeWeekDays()[2].getFullYear()+"-"+(activeWeekDays()[2].getMonth())+"-"+activeWeekDays()[2].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{activeWeekDays()[2].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={activeWeekDays()[3].getFullYear()+"-"+(activeWeekDays()[3].getMonth())+"-"+activeWeekDays()[3].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">W</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{activeWeekDays()[3].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={activeWeekDays()[4].getFullYear()+"-"+(activeWeekDays()[4].getMonth())+"-"+activeWeekDays()[4].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{activeWeekDays()[4].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={activeWeekDays()[5].getFullYear()+"-"+(activeWeekDays()[5].getMonth())+"-"+activeWeekDays()[5].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">F</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{activeWeekDays()[5].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={activeWeekDays()[6].getFullYear()+"-"+(activeWeekDays()[6].getMonth())+"-"+activeWeekDays()[6].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{activeWeekDays()[6].getDate()}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="last" className="week_picker">
        <div className="flex_container">
          <div className="week_day" data-date={nextWeekDays()[0].getFullYear()+"-"+(nextWeekDays()[0].getMonth())+"-"+nextWeekDays()[0].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{nextWeekDays()[0].getDate()}</p>
            </div>
          </div>
          <div className="week_day today" data-date={nextWeekDays()[1].getFullYear()+"-"+(nextWeekDays()[1].getMonth())+"-"+nextWeekDays()[1].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">M</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{nextWeekDays()[1].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={nextWeekDays()[2].getFullYear()+"-"+(nextWeekDays()[2].getMonth())+"-"+nextWeekDays()[2].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{nextWeekDays()[2].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={nextWeekDays()[3].getFullYear()+"-"+(nextWeekDays()[3].getMonth())+"-"+nextWeekDays()[3].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">W</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{nextWeekDays()[3].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={nextWeekDays()[4].getFullYear()+"-"+(nextWeekDays()[4].getMonth())+"-"+nextWeekDays()[4].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{nextWeekDays()[4].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={nextWeekDays()[5].getFullYear()+"-"+(nextWeekDays()[5].getMonth())+"-"+nextWeekDays()[5].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">F</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{nextWeekDays()[5].getDate()}</p>
            </div>
          </div>
          <div className="week_day" data-date={nextWeekDays()[6].getFullYear()+"-"+(nextWeekDays()[6].getMonth())+"-"+nextWeekDays()[6].getDate()}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{nextWeekDays()[6].getDate()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeekPicker