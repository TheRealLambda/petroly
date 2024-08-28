import "./styles/active_course_widget.css"

export default function ActiveCourseWidget({ course, deleteActiveCourse }) {


  const displayLocation = () => {
    return course.course_location.replace("-", " ")
  }

  const displayTime = () => {
    return course.course_time.slice(0,2)+":"+course.course_time.slice(2,4)+"-"+course.course_time.slice(5,7)+":"+course.course_time.slice(7,9)
  }

  const removeActiveCourse = async (e) => {
    if(confirm("Delete this course?")) {
      await deleteActiveCourse(course._id)
    }
  }

  return (
    <div className="bgcolor-white active_course">
      <div className="left">
        <div className="name">
          <p className="text-16-medium color-accent course_name opaque">{course.course_name}</p>
          <p className="text-10-semibold color-accent course_type opaque">{course.course_type}</p>
        </div>
        <p className="text-14-medium color-accent opaque">{displayLocation()}</p>
        <p className="text-16-medium color-accent course_time opaque">{displayTime()}</p>
      </div>
      <div className="right">
        <svg onClick={removeActiveCourse} className="fillcolor-accent opaque" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
        <p className="text-14-medium color-accent opaque">{course.course_instructor}</p>
      </div>
    </div>
  )
}