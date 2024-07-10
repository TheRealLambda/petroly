import { useCallback, useEffect } from "react"
import "./styles/week_picker.css"
import axios from "axios"

const WeekPicker = ({ page, setPage }) => {
  const handleScroll = (event) => {
    const first = document.getElementById("first")
    const offsetLeft = first.getBoundingClientRect().left-document.getElementsByClassName("schedule_page")[0].offsetLeft

    if(!check && offsetLeft > 55 && offsetLeft < 65) {
      check = true
      setTimeout(() =>{
        document.getElementById("week_picker_wrapper").classList.add("lock_scroll")  
        setPage(page => page-7)
        setTimeout(() => {
        document.getElementById("week_picker_wrapper").classList.remove("lock_scroll") 
        }, 50)
      }, 450)
    }
    const last = document.getElementById("last")
    const offsetRight = last.getBoundingClientRect().right-document.getElementsByClassName("schedule_page")[0].getBoundingClientRect().right
    if(!check && offsetRight > -5 && offsetRight < 5) {
      check = true
      setTimeout(() =>{
        document.getElementById("week_picker_wrapper").classList.add("lock_scroll")  
        setPage(page => page+7)
        setTimeout(() => {
        document.getElementById("week_picker_wrapper").classList.remove("lock_scroll") 
        }, 50)
      },450)
    }
  }

  const resetSchedule = async () => {
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
          console.log(dayDate);
          console.log(day);
          if(temp.getTime() === dayDate.getTime()) {
            console.log("DAY FOUND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            const newDiv = document.createElement("div")
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
    console.log("rendering...");
    document.getElementById("week_picker_wrapper").scrollTo({ behavior: "instant", left: 360})
    resetSchedule()
    document.getElementById("week_picker_wrapper").addEventListener("scroll", handleScroll);
    
    return () => {
      document.getElementById("week_picker_wrapper").removeEventListener("scroll", handleScroll)
    }
  }, [page])

  return (
    <div id="week_picker_wrapper" className="week_picker_wrapper">
      <div id="first" className="week_picker">
        <div className="flex_container">
          <div className="week_day" data-date={"2024-05-"+(page)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page}</p>
            </div>
          </div>
          <div className="week_day today" data-date={"2024-05-"+(page+1)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">M</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+1}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+2)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+2}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+3)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">W</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+3}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+4)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+4}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+5)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">F</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+5}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+6)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+6}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="active" className="week_picker">
        <div className="flex_container">
          <div className="week_day" data-date={"2024-05-"+(page+7)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent" >S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+7}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+8)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">M</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+8}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+9)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+9}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+10)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">W</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+10}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+11)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+11}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+12)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">F</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+12}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+13)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+13}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="last" className="week_picker">
        <div className="flex_container">
          <div className="week_day" data-date={"2024-05-"+(page+14)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+14}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+15)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">M</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+15}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+16)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+16}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+17)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">W</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+17}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+18)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+18}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+19)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">F</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+19}</p>
            </div>
          </div>
          <div className="week_day" data-date={"2024-05-"+(page+20)}>
            <div className="day_name">  
              <p className="text-14-semibold color-accent">S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+20}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeekPicker