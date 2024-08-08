import { useEffect, useState } from "react"
import "./styles/week_picker.css"
import axios from "axios"

const WeekPicker = ({ setModalState, week, setWeek, setEventModalId }) => {

  const [state, setState] = useState({pos: "middle", trans: true})
  console.log("[state]", state);
  let weekPicker
  let timetable
  let container
  let clicked = false
  let mouseDown = false
  let initialMouseX
  let initialMouseY
  let initialOffset
  let timeout
  let timeout2
  let lockSwipe = false
  let boolian = false


  const stateLeft = () => {
    container.style = ""
    timetable.style = ""
    state.trans ? container.classList.add("transition") : 0
    state.trans ? timetable.classList.add("transition") : 0
    clearTimeout(timeout2)
    timeout2 = setTimeout(() => {
      container.classList.remove("transition")
      timetable.classList.remove("transition")
      setWeek(prev => prev-1)
      setState({pos: "middle", trans: false})
    }, 200) // same time as transition duration
    container.classList.remove("middle")
    container.classList.remove("right")
    container.classList.add("left")
    timetable.classList.remove("middle")
    timetable.classList.remove("right")
    timetable.classList.add("left")
  }
  const stateMiddle = () => {
    container.style = ""
    timetable.style = ""
    state.trans ? container.classList.add("transition") : 0
    state.trans ? timetable.classList.add("transition") : 0
    clearTimeout(timeout2)
    timeout2 = setTimeout(() => {
      container.classList.remove("transition")
      timetable.classList.remove("transition")
    }, 200) // same time as transition duration
    container.classList.remove("left")
    container.classList.remove("right")
    container.classList.add("middle")
    timetable.classList.remove("left")
    timetable.classList.remove("right")
    timetable.classList.add("middle")
  }
  const stateRight = () => {
    console.log("====stateRight");
    container.style = ""
    timetable.style = ""
    state.trans ? container.classList.add("transition") : 0
    state.trans ? timetable.classList.add("transition") : 0
    clearTimeout(timeout2)
    timeout2 = setTimeout(() => {
      container.classList.remove("transition")
      timetable.classList.remove("transition")
      setWeek(prev => prev+1)
      setState({pos: "middle", trans: false})
    }, 200) // same time as transition duration
    container.classList.remove("left")
    container.classList.remove("middle")
    container.classList.add("right")
    timetable.classList.remove("left")
    timetable.classList.remove("middle")
    timetable.classList.add("right")
  }
  

  const pointerDown = (e) => {
    
    initialMouseX = e.clientX
    initialMouseY = e.clientY
    initialOffset = e.clientX - container.getBoundingClientRect().left
                    + weekPicker.getBoundingClientRect().left
    mouseDown = true
    clicked = true
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      clicked = false
    }, 500)
  }
  const pointerMove = (e) => {
    const mouseX = e.clientX
    const mouseY = e.clientY
    const left = (mouseX-initialOffset)
    console.log(left);
    if(!boolian && (mouseY < initialMouseY-10 || mouseY > initialMouseY+10)) {
      console.log("--------------lock horizontal--------------");
      lockSwipe = true
      boolian = true
    } else if(!boolian && (mouseX < initialMouseX-10 || mouseX > initialMouseX+10)) {
      console.log("--------------lock vertical--------------");
      document.getElementsByClassName("time_table")[0].style.overflow = "hidden"
      boolian = true
    }
    if(mouseDown && !lockSwipe && boolian) {
      if(left <= 0 && left >= -600) {
        timetable.style.left = left+"px"
        container.style.left = left+"px"
      } else if(left > 0) {
        timetable.style.left = "0px"
        container.style.left = "0px"
      } else if(left < -600) {
        timetable.style.left = "-600px"
        container.style.left = "-600px"
      }
    }
  }
  const pointerUp = (e) => {
    
    mouseDown = false
    container.style.transition = ""
    document.getElementsByClassName("time_table")[0].style = ""
    const finalMouseX = e.clientX
    const left = finalMouseX-initialOffset
    console.log("====UP====", boolian, lockSwipe);  
    if(clicked && boolian && !lockSwipe && finalMouseX > initialMouseX) {
      //swipe left
      console.log("====swipe left");
      setState({pos: "left", trans: true})
    } else if(clicked && boolian && !lockSwipe && finalMouseX < initialMouseX) {
      //swipe right
      console.log("====swipe right");
      setState({pos: "right", trans: true})
    } else if(boolian && !lockSwipe && left > -150) {
      //drag to left
      console.log("left====");
      setState({pos: "left", trans: true})
    } else if(boolian && !lockSwipe && left < -450) {
      //drag to right
      setState({pos: "right", trans: true})
    } else if(boolian && !lockSwipe) {
      //drag to middle
      setState({pos: "middle", trans: true})
    }
    lockSwipe = false
    boolian = false
  }


  useEffect(() => {

    weekPicker = document.getElementById("div2_wrapper")
    // weekPicker = document.getElementById("week_picker_wrapper")
    container = document.getElementById("week_picker_wrapper").firstElementChild
    timetable = document.getElementById("div2_wrapperContainer")
    weekPicker.addEventListener("pointerdown", pointerDown)
    weekPicker.addEventListener("pointermove", pointerMove)
    weekPicker.addEventListener("pointerup", pointerUp)

    if(state.pos === "left") {
      stateLeft()
    } else if(state.pos === "middle") {
      stateMiddle()
    } else if(state.pos === "right") {
      stateRight()
    }

    return () => {
      document.getElementById("div2_wrapper").removeEventListener("pointerdown", pointerDown)
      document.getElementById("div2_wrapper").removeEventListener("pointermove", pointerMove)
      document.getElementById("div2_wrapper").removeEventListener("pointerup", pointerUp)
    }
  }, [state])


  // const handleScroll = (event) => {
  //   const first = document.getElementById("first")
  //   const offsetLeft = first.getBoundingClientRect().left-document.getElementsByClassName("schedule_page")[0].offsetLeft

  //   if(!check && offsetLeft > 55 && offsetLeft < 65) {
  //     check = true
  //     document.getElementById("week_picker_wrapper").classList.add("lock_scroll")  
  //     setTimeout(() =>{
  //       setWeek(week => week-1)
  //       setTimeout(() => {
  //       document.getElementById("week_picker_wrapper").classList.remove("lock_scroll") 
  //       }, 100)
  //     }, 500)
  //   }
  //   const last = document.getElementById("last")
  //   const offsetRight = last.getBoundingClientRect().right-document.getElementsByClassName("schedule_page")[0].getBoundingClientRect().right
  //   if(!check && offsetRight > -5 && offsetRight < 5) {
  //     check = true
  //     document.getElementById("week_picker_wrapper").classList.add("lock_scroll")  
  //     setTimeout(() =>{
  //       setWeek(week => week+1)
  //       setTimeout(() => {
  //       document.getElementById("week_picker_wrapper").classList.remove("lock_scroll") 
  //       }, 100)
  //     },500)
  //   }
  // }

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
    // document.getElementById("week_picker_wrapper").addEventListener("scroll", handleScroll);
    
    

    return () => {

      if(document.getElementById("week_picker_wrapper")) {
        // document.getElementById("week_picker_wrapper").removeEventListener("scroll", handleScroll)
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
    </div>
  )
}

export default WeekPicker