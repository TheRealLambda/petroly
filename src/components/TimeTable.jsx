import { useEffect, useState } from "react"
import "./styles/time_table.css"
import WeekPicker from "./WeekPicker"
const TimeTable = ({ setModalState, setEventModalId, week, setWeek, setStartDate, setEndDate }) => {









  const createEventDiv = (div, grid) => {
    const index = Array.from(grid.children).indexOf(div) + 1
    const row = Math.floor(index / 7)
    const column = index % 7 === 0 ? 6 : (index%7)-1
    const topHalf = (event.clientY - div.getBoundingClientRect().top) < div.clientHeight/2
    
    let gridIndex;
    Array.from(document.querySelectorAll("#div2_wrapper .div2")).forEach((child, i) => {
      if(child == grid) {
        gridIndex = i
      }
    })

    let startDate;
    console.log(Array.from(document.getElementById("week_picker_wrapper").firstElementChild.children));
    Array.from(document.getElementById("week_picker_wrapper").firstElementChild.children).forEach((child, i) => {
      if(i === gridIndex) {
        Array.from(child.firstChild.children).forEach((childd, j) => {
          if(j === column) {
            startDate = childd.getAttribute("data-date")
            console.log("101010101010101010101010101010\n10101010101010");
          }
        })
      }
    })
    const newDiv = document.getElementById("eventCreate")

    const startYear = Number(startDate.split("-")[0])
    const startMonth = Number(startDate.split("-")[1])
    const startDay = Number(startDate.split("-")[2]) 
    
    const yStart = Math.floor(Math.round((div.offsetTop < 0 ? 0 : div.offsetTop)/12.5)*12.5)
    const startHour = Math.floor(yStart*24/1800)
    
    const startMinute = topHalf ? 0 : 30;
    const startDateee = new Date(startYear, startMonth, startDay, startHour, startMinute)
    const temp1 = new Date(newDiv.getAttribute("data-end"))
    const temp2 = new Date(newDiv.getAttribute("data-start"))
    const diff = temp1 - temp2 === 0 ? 3600000 : temp1 - temp2
    const endDateee = new Date(startDateee.getTime() + diff) 
  
    newDiv.classList.add("event_create")
    newDiv.style.top = (div.offsetTop + (topHalf?0:37))+"px"
    newDiv.style.left = div.offsetLeft+"px"
    newDiv.setAttribute("data-start", startDateee)
    newDiv.setAttribute("data-end",endDateee)
    const topSlider = newDiv.firstElementChild
    topSlider.classList.add("top_slider")
    
    const bottomSlider = newDiv.lastElementChild
    bottomSlider.classList.add("bottom_slider")
    newDiv.appendChild(topSlider)
    newDiv.appendChild(bottomSlider)
    newDiv.style.display = "block"
    grid.appendChild(newDiv)

    setStartDate(startDateee)
    setEndDate(endDateee)

    return [newDiv, topSlider, bottomSlider]
  }

  const funcOne = (e) => {
    const container = document.getElementById("clickContainer")
    const mouseX = e.clientX - container.getBoundingClientRect().left
    const mouseY = e.clientY - container.getBoundingClientRect().top
    console.log("mouseX:", mouseX, "mouseY:", mouseY);
  }


  const clickFunc = (event) => {
    if(!event.target.classList.contains("testingHAHA")) {
      setEventModalId({id: "", edit: false})
    }
    // console.log(event.target.classList.length);
    if(1/*event.target.classList.length === 0*/) {
      const [tempEvent, topSlider, bottomSlider] = createEventDiv(event.target, event.target.parentNode)
      const grid = event.target.parentNode

      // document.querySelector("#eventCreateModel button").removeEventListener("click", postEvent)
      // document.querySelector("#eventCreateModel button").addEventListener("click", postEvent)

      const slideUp = (e) => {
        const mouseY = e.clientY-e.currentTarget.getBoundingClientRect().top
        const mappedMouseY = Math.floor(Math.round(mouseY/12.5)*12.5)
        const hour = Math.floor(mappedMouseY*24/1800)
        const minute = Math.round(((mappedMouseY*24/1800)*60)%60)
        const newDate = new Date(tempEvent.getAttribute("data-start"))
        newDate.setHours(hour, minute)
        tempEvent.setAttribute("data-start", newDate)
        // console.log(minute);
        const prevHeight = tempEvent.offsetHeight
        const tempEventY = tempEvent.offsetTop
        tempEvent.style.top = mappedMouseY+"px"

        // console.log(hourEnd+":"+minuteEnd);
        // console.log(hourEnd+":"+minuteEnd);
        // console.log("prevHeight=", prevHeight, "tempEventY=", tempEventY, "hour=", hour, `\nRESULT: ${prevHeight+(tempEventY-hour)}     ${prevHeight}+(${tempEventY}-${hour})`, );
        if(prevHeight < 25) {
          tempEvent.style.height = "25px"
        } else {
          tempEvent.style.height = prevHeight+(tempEventY-mappedMouseY)+"px"
        }
        const yEnd = Math.floor(Math.round((tempEvent.offsetTop+tempEvent.scrollHeight-1)/12.5)*12.5)
        const hourEnd = Math.floor(yEnd*24/1800)
        const minuteEnd = Math.round(((yEnd*24/1800)*60)%60)
        const newDateEnd = new Date(tempEvent.getAttribute("data-end"))
        newDateEnd.setHours(hourEnd, minuteEnd)
        tempEvent.setAttribute("data-end", newDateEnd)
        // console.log(tempEvent.getAttribute("data-end"));

        setStartDate(newDate)
        setEndDate(newDateEnd)
      }
      const slideDown = (e) => {
        const mouseY = e.clientY-e.currentTarget.getBoundingClientRect().top
        const mappedMouseY = Math.floor(Math.round(mouseY/12.5)*12.5)
        const hour = Math.floor(mappedMouseY*24/1800)
        const minute = Math.round(((mappedMouseY*24/1800)*60)%60)
        const newDate = new Date(tempEvent.getAttribute("data-end"))
        newDate.setHours(hour, minute)
        if(newDate.getTime() >= new Date(tempEvent.getAttribute("data-start")).getTime()+20*60*1000) {
          tempEvent.setAttribute("data-end", newDate)
          console.log(newDate);
        }
        const prevHeight = tempEvent.offsetHeight
        const tempEventY = tempEvent.offsetTop
        if(prevHeight < 25) {
          tempEvent.style.height = "25px"
        } else {
          tempEvent.style.height = mappedMouseY-tempEventY+"px"
        }

        setEndDate(newDate)
      }
      let initTopOffset;
      const moveTempEvent = (e) => {
        const mouseY = e.clientY-e.currentTarget.getBoundingClientRect().top
        const mappedMouseY = Math.floor(Math.round(mouseY/12.5)*12.5)
        const hour = mappedMouseY*24/1800
        // console.log((hour*60)%60);
        // console.log(mappedMouseY-initTopOffset);
        const prevHeight = tempEvent.offsetHeight
        const tempEventY = tempEvent.offsetTop
        if(tempEvent.offsetTop < 0) {
          tempEvent.style.top = "0px"
        } else {
          tempEvent.style.top = (mappedMouseY-initTopOffset)+"px"
        }
        const yStart = Math.floor(Math.round((tempEvent.offsetTop < 0 ? 0 : tempEvent.offsetTop)/12.5)*12.5)
        const hourStart = Math.floor(yStart*24/1800)
        const minuteStart = Math.round(((yStart*24/1800)*60)%60)
        const newDateStart = new Date(tempEvent.getAttribute("data-start"))
        newDateStart.setHours(hourStart, minuteStart)
        tempEvent.setAttribute("data-start", newDateStart)
        // console.log(tempEvent.getAttribute("data-start"));
        // console.log(tempEvent.offsetTop < 0 ? 0 : tempEvent.offsetTop);

        const yEnd = Math.floor(Math.round(((tempEvent.offsetTop < 0 ? 0 : tempEvent.offsetTop)+tempEvent.scrollHeight-1)/12.5)*12.5)
        const hourEnd = Math.floor(yEnd*24/1800)
        const minuteEnd = Math.round(((yEnd*24/1800)*60)%60)
        const newDateEnd = new Date(tempEvent.getAttribute("data-end"))
        newDateEnd.setHours(hourEnd, minuteEnd)
        tempEvent.setAttribute("data-end", newDateEnd)
        // console.log(tempEvent.getAttribute("data-end"));
        // console.log(yEnd);

        setStartDate(newDateStart)
        setEndDate(newDateEnd)
      }


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
            tempEvent.style.display = "none"
          }
          modal.addEventListener("scroll", test)
        }, 100)
      }
      const tempEventClickFunc = (e) => {
              // e.currentTarget.style.backgroundColor = "red"
              // const modal = document.getElementById("eventCreateModel")
              // modal.style.display = "block"
              // modal.scrollTo({top: 100, behavior: "smooth"})
              
              // modal.removeEventListener("Scroll", test)
              // modal.addEventListener("scroll", test)
              setModalState("partial")
              console.log("\nSETTING MODAL\n");
    
      }
      tempEvent.removeEventListener("click", tempEventClickFunc)
      tempEvent.addEventListener("click", tempEventClickFunc)
      // Array.from(document.getElementsByClassName("event_create")).forEach(div => {
      //   console.log("LOOOOOOOOOOOOOOOOOOOOOOOOOOOoo");
      //   div.removeEventListener("click", tempEventClickFunc)
      //   div.addEventListener("click", tempEventClickFunc)
      // })
      
      tempEvent.addEventListener("pointerdown", (e)=> {
        const temp = (e.clientY - grid.getBoundingClientRect().top) - tempEvent.offsetTop
        initTopOffset = Math.floor(Math.round(temp/12.5)*12.5)
        // console.log("OFFSET:", initTopOffset);
        console.log("e.clientY=", e.clientY - (grid.getBoundingClientRect().top), "\ntempEvent.offsetTop=", tempEvent.offsetTop);
        grid.addEventListener("pointermove", moveTempEvent)
      })
      topSlider.addEventListener("pointerdown", (e)=> {
        e.stopPropagation()
        grid.addEventListener("pointermove", slideUp)
      })
      bottomSlider.addEventListener("pointerdown", (e)=> {
        e.stopPropagation()
        grid.addEventListener("pointermove", slideDown)
      })
      document.addEventListener("pointerup", ()=> {
        grid.removeEventListener("pointermove", moveTempEvent)
        grid.removeEventListener("pointermove", slideUp)
        grid.removeEventListener("pointermove", slideDown)
      })
    }
  }











  const [state, setState] = useState({pos: "middle", trans: true})
  let weekPicker
  let timetable
  let container
  let clicked = false
  let mouseDown = false
  let initialMouseX
  let initialMouseY
  let initialOffsetX
  let initialOffsetY
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
    initialOffsetX = e.clientX - container.getBoundingClientRect().left
                     + weekPicker.getBoundingClientRect().left
    initialOffsetY = document.getElementsByClassName("time_table")[0].scrollTop
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
    const left = (mouseX-initialOffsetX)
    const top = -(mouseY-initialMouseY)+initialOffsetY
    if(mouseDown && !boolian && (mouseY < initialMouseY-10 || mouseY > initialMouseY+10)) {
      lockSwipe = true
      boolian = true
    } else if(mouseDown && !boolian && (mouseX < initialMouseX-10 || mouseX > initialMouseX+10)) {
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
    else if (mouseDown && lockSwipe && boolian) {
      document.getElementsByClassName("time_table")[0].scrollTo({top: top})
    }
  }
  const pointerUp = (e) => {

    mouseDown = false
    container.style.transition = ""
    document.getElementsByClassName("time_table")[0].style = ""
    const finalMouseX = e.clientX
    const left = finalMouseX-initialOffsetX
    if(clicked && boolian && !lockSwipe && finalMouseX > initialMouseX) {
      //swipe left
      setState({pos: "left", trans: true})
    } else if(clicked && boolian && !lockSwipe && finalMouseX < initialMouseX) {
      //swipe right
      setState({pos: "right", trans: true})
    } else if(clicked && !boolian) {
      //click
      funcOne(e)
    } else if(boolian && !lockSwipe && left > -150) {
      //drag to left
      setState({pos: "left", trans: true})
    } else if(boolian && !lockSwipe && left < -450) {
      //drag to right
      setState({pos: "right", trans: true})
    } else if(boolian && !lockSwipe) {
      //drag to middle
      setState({pos: "middle", trans: true})
    }
  }


  useEffect(() => {

    weekPicker = document.getElementById("div2_wrapper")
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





  

  return (
    <div className="time_table bgcolor-white">
      
      <div className="div1">
        <div className="bgcolor-BG"></div>
        <p className="text-12-semibold color-accent">01:00</p>
        <p className="text-12-semibold color-accent">02:00</p>
        <p className="text-12-semibold color-accent">03:00</p>
        <p className="text-12-semibold color-accent">04:00</p>
        <p className="text-12-semibold color-accent">05:00</p>
        <p className="text-12-semibold color-accent">06:00</p>
        <p className="text-12-semibold color-accent">07:00</p>
        <p className="text-12-semibold color-accent">08:00</p>
        <p className="text-12-semibold color-accent">09:00</p>
        <p className="text-12-semibold color-accent">10:00</p>
        <p className="text-12-semibold color-accent">11:00</p>
        <p className="text-12-semibold color-accent">12:00</p>
        <p className="text-12-semibold color-accent">13:00</p>
        <p className="text-12-semibold color-accent">14:00</p>
        <p className="text-12-semibold color-accent">15:00</p>
        <p className="text-12-semibold color-accent">16:00</p>
        <p className="text-12-semibold color-accent">17:00</p>
        <p className="text-12-semibold color-accent">18:00</p>
        <p className="text-12-semibold color-accent">19:00</p>
        <p className="text-12-semibold color-accent">20:00</p>
        <p className="text-12-semibold color-accent">21:00</p>
        <p className="text-12-semibold color-accent">22:00</p>
        <p className="text-12-semibold color-accent">23:00</p>
      </div>
      <div id="div2_wrapper" className="div2_wrapper">
        <div id="eventCreate" className="event_create">
          <div className="top_slider"></div>
          <div className="bottom_slider"></div>
        </div>
        <WeekPicker setModalState={setModalState} week={week} setWeek={setWeek} setEventModalId={setEventModalId} />
        <div id="div2_wrapperContainer" className="container">
          <div className="div2">
           
          </div>
          <div id="clickContainer" className="div2">
            
          </div>
          <div className="div2">

          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeTable