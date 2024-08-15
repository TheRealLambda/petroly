const SandBox = () => {

  const firstDayOfYear = new Date(2024, 1-1, 1)
  const daysUntilFirstSunday = firstDayOfYear.getDay() === 0 ? 0 : 7-firstDayOfYear.getDay()
  
  //get first sunday after first day of year. Calculations will use this as the first day of the year
  const firstSundayOfYear = new Date(firstDayOfYear)
  firstSundayOfYear.setDate(firstSundayOfYear.getDate() + daysUntilFirstSunday)
  
  const currentDate = new Date()
  const numberOfDays = (currentDate - firstSundayOfYear) / (1*24*60*60*1000)

  const numberOfWeeks = Math.floor(numberOfDays / 7)

  const prevWeekStart = new Date(firstSundayOfYear.getFullYear(), 1-1, firstSundayOfYear.getDate()+7*(numberOfWeeks-1), 0, 0)
  const prevWeekEnd = new Date(firstSundayOfYear.getFullYear(), 1-1, firstSundayOfYear.getDate()+7*(numberOfWeeks-1) + 6, 23, 59)

  const currentWeekStart = new Date(firstSundayOfYear.getFullYear(), 1-1, firstSundayOfYear.getDate()+7*numberOfWeeks, 0, 0)
  const currentWeekEnd = new Date(firstSundayOfYear.getFullYear(), 1-1, firstSundayOfYear.getDate()+7*numberOfWeeks + 6, 23, 59)

  const nextWeekStart = new Date(firstSundayOfYear.getFullYear(), 1-1, firstSundayOfYear.getDate()+7*(numberOfWeeks+1), 0, 0)
  const nextWeekEnd = new Date(firstSundayOfYear.getFullYear(), 1-1, firstSundayOfYear.getDate()+7*(numberOfWeeks+1) + 6, 23, 59)

  const testDate = new Date(firstSundayOfYear.getFullYear(), 1-1, firstSundayOfYear.getDate()+7*numberOfWeeks+2, 0, 0)

  const result = testDate.getTime() >= currentWeekStart.getTime() && testDate.getTime() <= currentWeekEnd.getTime()
  console.log(testDate, testDate.getDay());

  return (
    <div className="sandbox_page">
      
    </div>
  )
}

export default SandBox