import axios from "axios"
import "./styles/courses_page.css"
import { useState } from "react"
import { useEffect } from "react"

const CoursesPage = () => {

  const [terms, setTerms] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/api/terms").then(result => setTerms(result.data))
  }, [])

  const handleForm = (e) => {
    e.preventDefault()
    const term = e.currentTarget.elements["term"].value
    const course = (() => {
      const selected = e.currentTarget.elements["course"].value
      if(selected === "phys") {
        return [{
          name: "PHYS102-01",
          type: "REC",
          crn: "30107",
          instructor: "ADEL ABBOUT",
          day: "UT",
          time: "1140-1230",
          location: "63-123"
        },
        {
          name: "PHYS102-01",
          type: "LEC",
          crn: "30107",
          instructor: "ADEL ABBOUT",
          day: "UMTWR",
          time: "1030-1130",
          location: "63-362"
        }]
      } else if(selected === "chem") {
        return [{
          name: "CHEM101-01",
          type: "REC",
          crn: "30080",
          instructor: "SULAYMAN OLADEPO",
          day: "MW",
          time: "1030-1120",
          location: "4-105"
        },
        {
          
          name: "CHEM101-01",
          type: "LEC",
          crn: "30080",
          instructor: "SULAYMAN OLADEPO",
          day: "UMTWR",
          time: "0920-1020",
          location: "4-125"
          
        }]
      } else if(selected === "english") {
        return [{
          name: "ENGL102-01",
          type: "LEC",
          crn: "30387",
          instructor: "MALCOLM BANCROFT",
          day: "UMTWR",
          time: "1140-1240",
          location: "6-105"
        }]
      } else if(selected === "math") {
        return [{
          name: "MATH101-01",
          type: "REC",
          crn: "30100",
          instructor: "MUHAMMAD RAHMAN",
          day: "UT",
          time: "1030-1120",
          location: "5-101"
        },
        {
          name: "MATH101-01",
          type: "LEC",
          crn: "30100",
          instructor: "WALED AL-KHULAIFI",
          day: "UMTWR",
          time: "0920-1020",
          location: "63-331"
        }]
      }
    })()
    console.log(term);
    console.log(course);

    function getDaysBetweenDates(start, end, dayName) {
      var result = [];
      var days = {u:0,m:1,t:2,w:3,r:4,fri:5,sat:6};
      var day = days[dayName.toLowerCase()];
      // Copy start date
      var current = new Date(start);
      // Shift to next of required days
      current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
      // While less than end date, add dates to result array
      while (current < end) {
        result.push(new Date(+current));
        current.setDate(current.getDate() + 7);
      }
      return result;  
    }
  
    const course_crn = course[0].crn
    const course_instructor = course[0].instructor
    const course_location = course[0].location
    const course_type = course[0].type
    const title = course[0].name
  
    const start_hour = course[0].time.substring(0,2)
    console.log("start_hour?", start_hour);
    const start_minute = course[0].time.substring(2,4)
    const end_hour = course[0].time.substring(5,7)
    const end_minute = course[0].time.substring(7,9)
  
    // console.log(start_hour+":"+start_minute+" - "+end_hour+":"+end_minute);
  
    const days = course[0].day
    const day1 = getDaysBetweenDates(new Date(2024,2,1), new Date(2024,3, 28), days[0])
    // console.log(days[0]);
    // console.log(day1.map(day => day.toDateString()));
  
    day1.forEach(async (day) => {
      const start_time = new Date(day)
      console.log("before?", start_time);
      start_time.setHours(start_hour, start_minute)
      console.log("after?", start_time);

      const end_time = new Date(day)
      end_time.setHours(end_hour, end_minute)

      const classEvent = {
        start_time,
        end_time,
        title,
        type: "class",
        course_crn,
        course_instructor,
        course_location,
        course_type
      }
      const result = await axios.post("http://localhost:3001/api/events", classEvent)
      console.log(result.data.start_time);
    })
  
    const day2 = getDaysBetweenDates(new Date(2024,2,1), new Date(2024,3,28), days[1])
    // console.log(days[1]);
    // console.log(day2.map(day => day.toDateString()));
  

  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const course = (() => {
      const selected = e.currentTarget.parentNode.elements["course"].value
      if(selected === "phys") {
        return [{
          name: "PHYS102-01",
          type: "REC",
          crn: "30107",
          instructor: "ADEL ABBOUT",
          day: "UT",
          time: "1140-1230",
          location: "63-123"
        },
        {
          name: "PHYS102-01",
          type: "LEC",
          crn: "30107",
          instructor: "ADEL ABBOUT",
          day: "UMTWR",
          time: "1030-1130",
          location: "63-362"
        }]
      } else if(selected === "chem") {
        return [{
          name: "CHEM101-01",
          type: "REC",
          crn: "30080",
          instructor: "SULAYMAN OLADEPO",
          day: "MW",
          time: "1030-1120",
          location: "4-105"
        },
        {
          
          name: "CHEM101-01",
          type: "LEC",
          crn: "30080",
          instructor: "SULAYMAN OLADEPO",
          day: "UMTWR",
          time: "0920-1020",
          location: "4-125"
          
        }]
      } else if(selected === "english") {
        return [{
          name: "ENGL102-01",
          type: "LEC",
          crn: "30387",
          instructor: "MALCOLM BANCROFT",
          day: "UMTWR",
          time: "1140-1240",
          location: "6-105"
        }]
      } else if(selected === "math") {
        return [{
          name: "MATH101-01",
          type: "REC",
          crn: "30100",
          instructor: "MUHAMMAD RAHMAN",
          day: "UT",
          time: "1030-1120",
          location: "5-101"
        },
        {
          name: "MATH101-01",
          type: "LEC",
          crn: "30100",
          instructor: "WALED AL-KHULAIFI",
          day: "UMTWR",
          time: "0920-1020",
          location: "63-331"
        }]
      }
    })()

    const result = await axios.post("http://localhost:3001/api/events/delete", {crn: course[0].crn})
  }

  const handleCourse = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const course_term = form.elements["course_term"].value
    const course_name = form.elements["course_name"].value
    const course_type = form.elements["course_type"].value
    const course_crn = form.elements["course_crn"].value
    const course_instructor = form.elements["course_instructor"].value
    const course_days = form.elements["course_days"].value
    const course_time = form.elements["course_time"].value
    const course_location = form.elements["course_location"].value
    const course = {
      course_term, course_name, course_type, course_crn, course_instructor, course_days, course_time, course_location
    }
    // const result = await axios.post("http://localhost:3001/api/courses", course)
    const result = await axios.get("http://localhost:3001/api/courses")
    console.log(result.data);
  }

  const handleTerm = async (e) => {
    // e.preventDefault()
    console.log("http://localhost:3001/api/courses?term="+e.currentTarget.value);
    const result = await axios.get("http://localhost:3001/api/courses?term="+e.currentTarget.value)
    setCourses(result.data)
  }

  const handleNewForm = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const course = form.elements["course"].value
    console.log(course);
    const result = await axios.post("http://localhost:3001/api/events/bulk", {course_id: course})
    console.log(result);
  }

  return (
    <div className="courses_page">
      <form onSubmit={handleNewForm} id="courseForm">
        <select name="term" onChange={handleTerm}>
          {terms && terms.map(term => {
            return (
              <option value={term.term_number}>{term.term_number}</option>
            )
          })}
        </select>
        <br/>
        <select name="course">
          {courses && courses.map(course => {
            return (
              <option value={course._id}>{course.course_name}</option>
            )
          })}
        </select>
        {/* <button onClick={handleDelete}>DELETE</button> */}
        <button type="submit">ADD</button>
      </form>
      <br/>
      <hr/>
      <br/>
      <form onSubmit={handleCourse}>
        course_term<input name="course_term" /><br/>
        course_name<input name="course_name" /><br/>
        course_type<input name="course_type" /><br/>
        course_crn<input name="course_crn" /><br/>
        course_instructor<input name="course_instructor" /><br/>
        course_days<input name="course_days" /><br/>
        course_time<input name="course_time" /><br/>
        course_location<input name="course_location" /><br/>
        <button type="submit">CLICK</button>
      </form>
    </div>
  )
}

export default CoursesPage