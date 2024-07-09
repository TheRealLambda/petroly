import { useEffect } from "react"
import "./styles/week_picker.css"

const WeekPicker = ({ page, setPage }) => {

  let check = false
  // console.log("HERE", check);
  useEffect(() => {
    console.log("HERE", check);
    document.getElementById("week_picker_wrapper").scrollTo({behavior: "instant", left: 360})
    document.getElementById("week_picker_wrapper").addEventListener("scroll", (event) => {
      const first = document.getElementById("first")
      const offsetLeft = first.getBoundingClientRect().left-document.getElementsByClassName("schedule_page")[0].offsetLeft
      // console.log(offsetLeft); // 60

      if(!check && offsetLeft > 50 && offsetLeft < 70) {
        check = true
        console.log("Reached first slide!")
        setTimeout(() =>{
          const div = document.getElementById("week_picker_wrapper")
          // div.classList.add("lock_scroll")
          // div.scrollTo({behavior: "instant", left: 360})
          setTimeout(() => {
            // document.getElementById("week_picker_wrapper").classList.remove("lock_scroll")
            console.log("YAHOOOOO");
            setPage(page => page-7)
          }, 50)
        }, 450)
      }
      // console.log(event.currentTarget.getBoundingClientRect().left);
      // console.log(first.getBoundingClientRect().left-document.getElementsByClassName("schedule_page")[0].offsetLeft);
      const last = document.getElementById("last")
      const offsetRight = last.getBoundingClientRect().right-document.getElementsByClassName("schedule_page")[0].getBoundingClientRect().right
      if(!check && offsetRight > -10 && offsetRight < 10) {
        check = true
        console.log("Reached last slide!")
        setTimeout(() =>{
          const div = document.getElementById("week_picker_wrapper")
          div.classList.add("lock_scroll")
          div.scrollTo({behavior: "instant", left: 360})
          setTimeout(() => {
            document.getElementById("week_picker_wrapper").classList.remove("lock_scroll")
            console.log("YAHOOOOO");
            setPage(page => page+7)
          }, 50)
        }, 450)
      }

      // console.log(last.getBoundingClientRect().right-document.getElementsByClassName("schedule_page")[0].getBoundingClientRect().right);
    })
  }, [page])

  return (
    <div id="week_picker_wrapper" className="week_picker_wrapper">
      <div id="first" className="week_picker">
        <div className="flex_container">
          <div className="week_day" data-date="2024-05-02">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page}</p>
            </div>
          </div>
          <div className="week_day today" data-date="2024-05-03">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">M</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+1}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-04">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+2}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-05">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">W</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+3}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-06">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+4}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-07">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">F</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+5}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-08">
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
          <div className="week_day" data-date="2024-05-09">
            <div className="day_name">  
              <p className="text-14-semibold color-accent" >S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+7}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-10">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">M</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+8}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-11">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+9}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-12">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">W</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+10}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-13">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+11}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-14">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">F</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+12}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-15">
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
          <div className="week_day" data-date="2024-05-16">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">S</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+14}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-17">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">M</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+15}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-18">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+16}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-19">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">W</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+17}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-20">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">T</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+18}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-21">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">F</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">{page+19}</p>
            </div>
          </div>
          <div className="week_day" data-date="2024-05-22">
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