import { useState } from "react"
import "./styles/months_slider.css"

export default function MonthsSlider({ changeWeek, state }) {

  const [year, setYear] = useState(new Date().getFullYear())

  const handleInfiniteScrolling = (e)=>{
    if(e.target.scrollLeft<8 && year > 2000) {
      setYear(prev=>prev-2)
      e.target.scrollTo({left: 1618}) 
    } else if(e.target.scrollLeft > 2020+62 && year < 2098) {
      setYear(prev=>prev+2)
      e.target.scrollTo({left: 410+62})
    }
    console.log(e.target.scrollLeft);
  }

  const handleMonth = (e) => {
    if(e.target.parentNode.classList.contains("first")) {
      const firstDayOfYear = new Date(2024, 1-1, 1)
      const daysUntilFirstSunday = firstDayOfYear.getDay() === 0 ? 0 : 7-firstDayOfYear.getDay()
      
      //get first sunday after first day of year. Calculations will use this as the first day of the year
      const firstSundayOfYear = new Date(firstDayOfYear)
      firstSundayOfYear.setDate(firstSundayOfYear.getDate() + daysUntilFirstSunday)
      
      const newDate = new Date((year)+" "+e.target.innerText+"1")
      const numberOfDays = (newDate - firstSundayOfYear) / (1*24*60*60*1000)
      
      const week = Math.floor(numberOfDays / (state.period===5?7:state.period))
      console.log(newDate);
      changeWeek(week)
    } else if(e.target.parentNode.classList.contains("second")) {
      const firstDayOfYear = new Date(2024, 1-1, 1)
      const daysUntilFirstSunday = firstDayOfYear.getDay() === 0 ? 0 : 7-firstDayOfYear.getDay()
      
      //get first sunday after first day of year. Calculations will use this as the first day of the year
      const firstSundayOfYear = new Date(firstDayOfYear)
      firstSundayOfYear.setDate(firstSundayOfYear.getDate() + daysUntilFirstSunday)
      
      const newDate = new Date((year+1)+" "+e.target.innerText+"1")
      const numberOfDays = (newDate - firstSundayOfYear) / (1*24*60*60*1000)
      
      const week = Math.floor(numberOfDays / (state.period===5?7:state.period))
      console.log(newDate);
      changeWeek(week)
    } else if(e.target.parentNode.classList.contains("third")) {
      const firstDayOfYear = new Date(2024, 1-1, 1)
      const daysUntilFirstSunday = firstDayOfYear.getDay() === 0 ? 0 : 7-firstDayOfYear.getDay()
      
      //get first sunday after first day of year. Calculations will use this as the first day of the year
      const firstSundayOfYear = new Date(firstDayOfYear)
      firstSundayOfYear.setDate(firstSundayOfYear.getDate() + daysUntilFirstSunday)
      
      const newDate = new Date((year+2)+" "+e.target.innerText+"1")
      const numberOfDays = (newDate - firstSundayOfYear) / (1*24*60*60*1000)
      
      const week = Math.floor(numberOfDays / (state.period===5?7:state.period))
      console.log(newDate);
      changeWeek(week)
    }
  }

  return (
    <div onClick={handleMonth} onScroll={handleInfiniteScrolling} className="months_slider color-white text-14-medium">
      <div className="year">{year}</div>
      <div className="first bgcolor-primary">
        <div className="button_effect_1_darker">Jan</div>
        <div className="button_effect_1_darker">Feb</div>
        <div className="button_effect_1_darker">Mar</div>
        <div className="button_effect_1_darker">Apr</div>
        <div className="button_effect_1_darker">May</div>
        <div className="button_effect_1_darker">Jun</div>
        <div className="button_effect_1_darker">Jul</div>
        <div className="button_effect_1_darker">Aug</div>
        <div className="button_effect_1_darker">Sep</div>
        <div className="button_effect_1_darker">Oct</div>
        <div className="button_effect_1_darker">Nov</div>
        <div className="button_effect_1_darker">Dec</div>
      </div>
      <div className="year">{year+1}</div>
      <div className="second bgcolor-primary">
        <div className="button_effect_1_darker">Jan</div>
        <div className="button_effect_1_darker">Feb</div>
        <div className="button_effect_1_darker">Mar</div>
        <div className="button_effect_1_darker">Apr</div>
        <div className="button_effect_1_darker">May</div>
        <div className="button_effect_1_darker">Jun</div>
        <div className="button_effect_1_darker">Jul</div>
        <div className="button_effect_1_darker">Aug</div>
        <div className="button_effect_1_darker">Sep</div>
        <div className="button_effect_1_darker">Oct</div>
        <div className="button_effect_1_darker">Nov</div>
        <div className="button_effect_1_darker">Dec</div>
      </div>
      <div className="year">{year+2}</div>
      <div className="third bgcolor-primary">
        <div className="button_effect_1_darker">Jan</div>
        <div className="button_effect_1_darker">Feb</div>
        <div className="button_effect_1_darker">Mar</div>
        <div className="button_effect_1_darker">Apr</div>
        <div className="button_effect_1_darker">May</div>
        <div className="button_effect_1_darker">Jun</div>
        <div className="button_effect_1_darker">Jul</div>
        <div className="button_effect_1_darker">Aug</div>
        <div className="button_effect_1_darker">Sep</div>
        <div className="button_effect_1_darker">Oct</div>
        <div className="button_effect_1_darker">Nov</div>
        <div className="button_effect_1_darker">Dec</div>
      </div>
    </div>
  )
}