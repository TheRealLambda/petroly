import { useEffect, useState } from "react"
import "./styles/week_picker.css"
import axios from "axios"

const WeekPicker = ({ week, setEventModalId }) => {


  const resetSchedule = async () => {
    setModalState("closed")
    // document.getElementById("eventCreateModel").scrollTo({top: 0, behavior: "smooth"})
    // document.getElementById("eventCreate").style.display = "none"
    // console.log("Schedule reset...");
    Array.from(document.querySelectorAll(".event_create.testingHAHA")).forEach((div => div.remove()))
    const events = await axios.get("http://localhost:3001/api/events")
    console.log("events=", events);
    Array.from(document.getElementById("week_picker_wrapper").firstElementChild.children).forEach((week, i) => {
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
            // newDiv.setAttribute("data-id", event._id)
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
            newDiv.addEventListener("click", (e) => {
              setEventModalId({id: event._id, edit: false})
              setModalState("open")
              // document.getElementById("eventCreateModel").scrollTo({top: 640, behavior: "smooth"})
              // document.getElementById("eventCreate").style.display = "none"
            })
            document.querySelectorAll("#div2_wrapper .div2")[i].appendChild(newDiv)
          }
        })
      })
    })
    let timeout = null
    const test = (e) => {
      const modal = document.getElementById("eventCreateModel")
      if(timeout !== null) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(()=>{
        console.log("SCROLLING");
        modal.removeEventListener("scroll", test)
        if(modal.firstElementChild.getBoundingClientRect().top > 300 && modal.firstElementChild.getBoundingClientRect().top < 600) {  
          modal.scrollTo({top: 100, behavior: "smooth"})
        } else if (modal.firstElementChild.getBoundingClientRect().top < 400 && modal.firstElementChild.getBoundingClientRect().top > 0) {
          modal.scrollTo({top: 640, behavior: "smooth"})
        } else if (modal.firstElementChild.getBoundingClientRect().top > 600) {
          console.log("REMOVE MODAL");
          modal.scrollTo({top: 0, behavior: "instant"})
          // tempEvent.style.display = "none"
        }
        modal.addEventListener("scroll", test)
      }, 100)
    }
    const tempEventClickFunc = (e) => {
            // e.currentTarget.style.backgroundColor = "red"
            // const modal = document.getElementById("eventCreateModel")
            // modal.style.display = "block"
            // modal.scrollTo({top: 640, behavior: "smooth"})
            
            // modal.removeEventListener("Scroll", test)
            // modal.addEventListener("scroll", test)
            setModalState("partial")
    }
    Array.from(document.getElementsByClassName("event_create")).forEach(div => {
      // console.log(div);
      div.removeEventListener("click", tempEventClickFunc)
      div.addEventListener("click", tempEventClickFunc)
    })
  }


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
    document.getElementById("week_picker_wrapper").scrollTo({ behavior: "instant", left: 360})
    // resetSchedule()
    
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
    <div id="week_picker_wrapper" className="week_picker_wrapper bgcolor-BG">
      <div className="container">
        <div id="first" className="week_picker">
          <div className="flex_container">
            <div className="week_day" data-date={prevWeekDays()[0].getFullYear()+"-"+(prevWeekDays()[0].getMonth()+1)+"-"+prevWeekDays()[0].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[0].getDate()}</p>
              </div>
            </div>
            <div className="week_day today" data-date={prevWeekDays()[1].getFullYear()+"-"+(prevWeekDays()[1].getMonth()+1)+"-"+prevWeekDays()[1].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">M</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[1].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={prevWeekDays()[2].getFullYear()+"-"+(prevWeekDays()[2].getMonth()+1)+"-"+prevWeekDays()[2].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[2].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={prevWeekDays()[3].getFullYear()+"-"+(prevWeekDays()[3].getMonth()+1)+"-"+prevWeekDays()[3].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">W</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[3].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={prevWeekDays()[4].getFullYear()+"-"+(prevWeekDays()[4].getMonth()+1)+"-"+prevWeekDays()[4].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[4].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={prevWeekDays()[5].getFullYear()+"-"+(prevWeekDays()[5].getMonth()+1)+"-"+prevWeekDays()[5].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">F</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{prevWeekDays()[5].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={prevWeekDays()[6].getFullYear()+"-"+(prevWeekDays()[6].getMonth()+1)+"-"+prevWeekDays()[6].getDate()}>
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
            <div className="week_day" data-date={activeWeekDays()[0].getFullYear()+"-"+(activeWeekDays()[0].getMonth()+1)+"-"+activeWeekDays()[0].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[0].getDate()}</p>
              </div>
            </div>
            <div className="week_day today" data-date={activeWeekDays()[1].getFullYear()+"-"+(activeWeekDays()[1].getMonth()+1)+"-"+activeWeekDays()[1].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">M</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[1].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={activeWeekDays()[2].getFullYear()+"-"+(activeWeekDays()[2].getMonth()+1)+"-"+activeWeekDays()[2].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[2].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={activeWeekDays()[3].getFullYear()+"-"+(activeWeekDays()[3].getMonth()+1)+"-"+activeWeekDays()[3].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">W</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[3].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={activeWeekDays()[4].getFullYear()+"-"+(activeWeekDays()[4].getMonth()+1)+"-"+activeWeekDays()[4].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[4].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={activeWeekDays()[5].getFullYear()+"-"+(activeWeekDays()[5].getMonth()+1)+"-"+activeWeekDays()[5].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">F</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{activeWeekDays()[5].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={activeWeekDays()[6].getFullYear()+"-"+(activeWeekDays()[6].getMonth()+1)+"-"+activeWeekDays()[6].getDate()}>
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
            <div className="week_day" data-date={nextWeekDays()[0].getFullYear()+"-"+(nextWeekDays()[0].getMonth()+1)+"-"+nextWeekDays()[0].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">S</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[0].getDate()}</p>
              </div>
            </div>
            <div className="week_day today" data-date={nextWeekDays()[1].getFullYear()+"-"+(nextWeekDays()[1].getMonth()+1)+"-"+nextWeekDays()[1].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">M</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[1].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={nextWeekDays()[2].getFullYear()+"-"+(nextWeekDays()[2].getMonth()+1)+"-"+nextWeekDays()[2].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[2].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={nextWeekDays()[3].getFullYear()+"-"+(nextWeekDays()[3].getMonth()+1)+"-"+nextWeekDays()[3].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">W</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[3].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={nextWeekDays()[4].getFullYear()+"-"+(nextWeekDays()[4].getMonth()+1)+"-"+nextWeekDays()[4].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">T</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[4].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={nextWeekDays()[5].getFullYear()+"-"+(nextWeekDays()[5].getMonth()+1)+"-"+nextWeekDays()[5].getDate()}>
              <div className="day_name">  
                <p className="text-14-semibold color-accent">F</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">{nextWeekDays()[5].getDate()}</p>
              </div>
            </div>
            <div className="week_day" data-date={nextWeekDays()[6].getFullYear()+"-"+(nextWeekDays()[6].getMonth()+1)+"-"+nextWeekDays()[6].getDate()}>
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
    </div>
  )
}

export default WeekPicker