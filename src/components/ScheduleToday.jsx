import "./styles/schedule_today.css"

const ScheduleToday = () => {

  return (
    <div className="schedule_today">
      <h5 className="color-accent">Monday, 3 June</h5>
      <div className="classes">
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
  )
}

export default ScheduleToday