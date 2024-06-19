import "./styles/week_slider.css"

const WeekSlider = () => {

  return (
    <div className="week_slider">
      <div className="flex_container">
        <div className="week_day">
          <div className="day_name">  
            <p className="text-14-semibold color-accent">Sun</p>
          </div>
          <div className="day_number">
            <p className="text-14-medium color-accent">2</p>
          </div>
        </div>
        <div className="week_day chosen">
          <div className="day_name">  
            <p className="text-14-semibold color-accent">Mon</p>
          </div>
          <div className="day_number">
            <p className="text-14-medium color-accent">3</p>
          </div>
        </div>
        <div className="week_day">
          <div className="day_name">  
            <p className="text-14-semibold color-accent">Tue</p>
          </div>
          <div className="day_number">
            <p className="text-14-medium color-accent">4</p>
          </div>
        </div>
        <div className="week_day">
          <div className="day_name">  
            <p className="text-14-semibold color-accent">Wed</p>
          </div>
          <div className="day_number">
            <p className="text-14-medium color-accent">5</p>
          </div>
        </div>
        <div className="week_day">
          <div className="day_name">  
            <p className="text-14-semibold color-accent">Thu</p>
          </div>
          <div className="day_number">
            <p className="text-14-medium color-accent">6</p>
          </div>
        </div>
        <div className="week_day">
          <div className="day_name">  
            <p className="text-14-semibold color-accent">Fri</p>
          </div>
          <div className="day_number">
            <p className="text-14-medium color-accent">7</p>
          </div>
        </div>
        <div className="week_day">
          <div className="day_name">  
            <p className="text-14-semibold color-accent">Sat</p>
          </div>
          <div className="day_number">
            <p className="text-14-medium color-accent">8</p>
          </div>
        </div>

      </div>
      <div className="icon">
        <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#5f6368"><path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z"/></svg>
      </div>
    </div>
  )
}

export default WeekSlider