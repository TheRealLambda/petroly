import "./styles/week_slider.css"
import "./styles/schedule_today.css"
import "./styles/month_grid.css"
import { useState } from "react"
import { Link } from "react-router-dom"

const WeekSlider = () => {

  const [date, setDate] = useState(3)

  const chooseDay = (event) => {
    console.log(document.querySelectorAll(".week_slider_container .week_slider .week_day"));
    Array.from(document.querySelectorAll(".week_day")).forEach((child)=>{
      if(child.getAttribute("data-date") == event.currentTarget.getAttribute("data-date")) {
        child.classList.add("chosen")
        if(date !== child.getAttribute("data-date")) {
          setDate(child.getAttribute("data-date").split("/")[0])
        }
      } else {
        child.classList.remove("chosen")
      }
    })
  }

  const expandDatePicker = () => {
    document.getElementById("month_date_picker").classList.toggle("hidden")
    document.getElementById("week_slider_flex_container").classList.toggle("hidden")
    console.log(document.getElementById("week_slider_flex_container"));
  }

  return (
    <>
      <div id="week_slider_flex_container" className="week_slider_container">
        <div className="week_slider">
          <div className="flex_container">
            <div onClick={chooseDay} className="week_day" data-date="2/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Sun</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">2</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day chosen" data-date="3/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Mon</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">3</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="4/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Tue</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">4</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="5/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Wed</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">5</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="6/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Thu</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">6</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="7/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Fri</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">7</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="8/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Sat</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">8</p>
              </div>
            </div>

          </div>
        </div>
        <div id="week_slider_flex_container" className="week_slider">
          <div className="flex_container">
            <div onClick={chooseDay} className="week_day" data-date="9/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Sun</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">9</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="10/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Mon</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">10</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="11/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Tue</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">11</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="12/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Wed</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">12</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="13/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Thu</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">13</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="14/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Fri</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">14</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="15/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Sat</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">15</p>
              </div>
            </div>
          </div>
        </div>
        <div id="week_slider_flex_container" className="week_slider">
          <div className="flex_container">
            <div onClick={chooseDay} className="week_day" data-date="16/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Sun</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">16</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="17/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Mon</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">17</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="17/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Tue</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">17</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="18/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Wed</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">18</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="19/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Thu</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">19</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="20/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Fri</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">20</p>
              </div>
            </div>
            <div onClick={chooseDay} className="week_day" data-date="21/6">
              <div className="day_name">  
                <p className="text-14-semibold color-accent">Sat</p>
              </div>
              <div className="day_number">
                <p className="text-14-medium color-accent">21</p>
              </div>
            </div>
    
          </div>
        </div>
      </div>
      <div id="month_date_picker" className="month_grid hidden" data-month="6">
        <div className="week_day_names">
          <p className="text-14-semibold color-accent">Sun</p>
          <p className="text-14-semibold color-accent">Mon</p>
          <p className="text-14-semibold color-accent">Tue</p>
          <p className="text-14-semibold color-accent">Wed</p>
          <p className="text-14-semibold color-accent">Thu</p>
          <p className="text-14-semibold color-accent">Fri</p>
          <p className="text-14-semibold color-accent">Sat</p>
        </div>
          <div className="month_days" data-month="6">
            <div onClick={chooseDay} className="week_day text-14-medium color-accent uf" data-date="26/5">26</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent uf" data-date="27/5">27</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent uf" data-date="28/5">28</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent uf" data-date="29/5">29</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent uf" data-date="30/5">30</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent uf" data-date="31/5">31</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="1/6">1</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="2/6">2</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent chosen" data-date="3/6">3</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="4/6">4</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="5/6">5</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="6/6">6</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="7/6">7</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="8/6">8</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="9/6">9</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="10/6">10</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="11/6">11</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="12/6">12</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="13/6">13</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="14/6">14</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="15/6">15</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="16/6">16</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="17/6">17</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="18/6">18</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="19/6">19</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="20/6">20</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="21/6">21</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="22/6">22</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="23/6">23</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="24/6">24</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="25/6">25</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="26/6">26</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="27/6">27</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="28/6">28</div>
            <div onClick={chooseDay} className="week_day text-14-medium color-accent" data-date="29/6">29</div>
          </div>
        </div>
      <div onClick={expandDatePicker} className="date_picker_icon">
        <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#5f6368"><path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z"/></svg>
      </div>
      <div className="schedule_today">
        <h5 className="color-accent">Monday, {date} June</h5>
        <div className="classes">
          <Link style={{textDecoration: "none"}} to="/class">
            <div className="container bgcolor-white">
              <div className="time">
                <p className="text-14-semibold color-accent">08:00 - 08:50</p>
              </div>
              <div className="separator bgcolor-whiteaccent"></div>
              <div className="details">
                <p className="text-14-semibold color-accent">PHYS 101</p>
                <p className="text-12-medium color-accent">Khalil B. Harrabi</p>
              </div>
            </div>
          </Link>
          <div className="container bgcolor-white">
            <div className="time">
              <p className="text-14-semibold color-accent">09:00 - 09:50</p>
            </div>
            <div className="separator bgcolor-whiteaccent"></div>
            <div className="details">
              <p className="text-14-semibold color-accent">MATH 101</p>
              <p className="text-12-medium color-accent">Al shammari</p>
            </div>
          </div>
          <div className="container bgcolor-white">
            <div className="time">
              <p className="text-14-semibold color-accent">10:00 - 10:50</p>
            </div>
            <div className="separator bgcolor-whiteaccent"></div>
            <div className="details">
              <p className="text-14-semibold color-accent">ENGL 101</p>
              <p className="text-12-medium color-accent">Hampto, timothy</p>
            </div>
          </div>
          <div className="container bgcolor-white">
            <div className="time">
              <p className="text-14-semibold color-accent">11:00 - 11:50</p>
            </div>
            <div className="separator bgcolor-whiteaccent"></div>
            <div className="details">
              <p className="text-14-semibold color-accent">IAS 111</p>
              <p className="text-12-medium color-accent">Abdulrahman Alsaadi</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WeekSlider