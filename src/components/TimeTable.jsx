import { useEffect } from "react"
import "./styles/time_table.css"

const TimeTable = () => {

  useEffect(() => {

    const createEventDiv = (div, grid) => {
      const index = Array.from(grid.children).indexOf(div) + 1
      const row = Math.floor(index / 7)
      const column = index % 7 === 0 ? 6 : (index%7)-1
      const topHalf = (event.clientY - div.getBoundingClientRect().top) < div.clientHeight/2
      let gridIndex;
      Array.from(grid.parentNode.children).forEach((child, i) => {
        if(child == grid) {
          gridIndex = i
        }
      })
      let startDate;
      Array.from(document.getElementById("week_picker_wrapper").children).forEach((child, i) => {
        if(i === gridIndex) {
          Array.from(child.firstChild.children).forEach((childd, j) => {
            if(j === column) {
              startDate = childd.getAttribute("data-date")
            }
          })
        }
      })
      const startYear = Number(startDate.split("-")[0])
      const startMonth = Number(startDate.split("-")[1])
      const startDay = Number(startDate.split("-")[2])
      const startHour = row
      const startMinute = topHalf ? 0 : 30;
      const startDateee = new Date(startYear, startMonth, startDay, startHour, startMinute)
      // console.log(startDateee);
    
      const newDiv = document.getElementById("eventCreate")
      newDiv.classList.add("event_create")
      newDiv.style.top = (div.offsetTop + (topHalf?0:37))+"px"
      newDiv.style.left = div.offsetLeft+"px"
      newDiv.setAttribute("data-start", startDateee)
      const topSlider = newDiv.firstElementChild
      topSlider.classList.add("top_slider")
      
      const bottomSlider = newDiv.lastElementChild
      bottomSlider.classList.add("bottom_slider")
      newDiv.appendChild(topSlider)
      newDiv.appendChild(bottomSlider)
      newDiv.style.display = "block"
      grid.appendChild(newDiv)

      return [newDiv, topSlider, bottomSlider]
    }

    document.getElementById("div2_wrapper").addEventListener("click", (event) => {
      // console.log(event.target.classList.length);
      if(event.target.classList.length === 0) {
        const [tempEvent, topSlider, bottomSlider] = createEventDiv(event.target, event.target.parentNode)
        const grid = event.target.parentNode

        const slideUp = (e) => {
          const mouseY = e.clientY-e.currentTarget.getBoundingClientRect().top
          const mappedMouseY = Math.floor(Math.round(mouseY/12.5)*12.5)
          const hour = mappedMouseY*24/1800
          console.log((hour*60)%60);
          const prevHeight = tempEvent.offsetHeight
          const tempEventY = tempEvent.offsetTop
          tempEvent.style.top = mappedMouseY+"px"
          // console.log("prevHeight=", prevHeight, "tempEventY=", tempEventY, "hour=", hour, `\nRESULT: ${prevHeight+(tempEventY-hour)}     ${prevHeight}+(${tempEventY}-${hour})`, );
          if(prevHeight < 25) {
            tempEvent.style.height = "25px"
          } else {
            tempEvent.style.height = prevHeight+(tempEventY-mappedMouseY)+"px"
          }
        }
        const slideDown = (e) => {
          const mouseY = e.clientY-e.currentTarget.getBoundingClientRect().top
          const mappedMouseY = Math.floor(Math.round(mouseY/12.5)*12.5)
          const hour = mappedMouseY*24/1800
          console.log((hour*60)%60);
          const prevHeight = tempEvent.offsetHeight
          const tempEventY = tempEvent.offsetTop
          if(prevHeight < 25) {
            tempEvent.style.height = "25px"
          } else {
            tempEvent.style.height = mappedMouseY-tempEventY+"px"
          }
        }
        let initTopOffset;
        const moveTempEvent = (e) => {
          const mouseY = e.clientY-e.currentTarget.getBoundingClientRect().top
          const mappedMouseY = Math.floor(Math.round(mouseY/12.5)*12.5)
          const hour = mappedMouseY*24/1800
          // console.log((hour*60)%60);
          console.log(mappedMouseY-initTopOffset);
          const prevHeight = tempEvent.offsetHeight
          const tempEventY = tempEvent.offsetTop
          if(tempEvent.offsetTop < 0) {
            tempEvent.style.top = "0px"
          } else {
            tempEvent.style.top = (mappedMouseY-initTopOffset)+"px"
          }
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
            } else if (modal.firstElementChild.getBoundingClientRect().top < 400) {
              modal.scrollTo({top: 640, behavior: "smooth"})
            } else if (modal.firstElementChild.getBoundingClientRect().top > 600) {
              console.log("REMOVE MODAL");
              modal.scrollTo({top: 0, behavior: "instant"})
            }
            modal.addEventListener("scroll", test)
          }, 100)
        }
        const tempEventClickFunc = (e) => {
                // e.currentTarget.style.backgroundColor = "red"
                const modal = document.getElementById("eventCreateModel")
                modal.style.display = "block"
                modal.scrollTo({top: 100, behavior: "smooth"})
                
                modal.removeEventListener("Scroll", test)
                modal.addEventListener("scroll", test)
      
        }
        tempEvent.removeEventListener("click", tempEventClickFunc)
        tempEvent.addEventListener("click", tempEventClickFunc)
        
        tempEvent.addEventListener("mousedown", (e)=> {
          const temp = (e.clientY - grid.getBoundingClientRect().top) - tempEvent.offsetTop
          initTopOffset = Math.floor(Math.round(temp/12.5)*12.5)
          // console.log("OFFSET:", initTopOffset);
          console.log("e.clientY=", e.clientY - (grid.getBoundingClientRect().top), "\ntempEvent.offsetTop=", tempEvent.offsetTop);
          grid.addEventListener("mousemove", moveTempEvent)
        })
        topSlider.addEventListener("mousedown", (e)=> {
          e.stopPropagation()
          grid.addEventListener("mousemove", slideUp)
        })
        bottomSlider.addEventListener("mousedown", (e)=> {
          e.stopPropagation()
          grid.addEventListener("mousemove", slideDown)
        })
        document.addEventListener("mouseup", ()=> {
          grid.removeEventListener("mousemove", moveTempEvent)
          grid.removeEventListener("mousemove", slideUp)
          grid.removeEventListener("mousemove", slideDown)
        })
      }
    })
  }, [])

  return (
    <div className="time_table bgcolor-white">
      
      <div className="div1">
        <p className="text-12-semibold color-accent">00:00</p>
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
        <p className="text-12-semibold color-accent">24:00</p>
      </div>
      <div id="div2_wrapper" className="div2_wrapper">
        <div id="eventCreate" className="event_create">
          <div className="top_slider"></div>
          <div className="bottom_slider"></div>
        </div>
        <div className="div2">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="div2">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="div2">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default TimeTable