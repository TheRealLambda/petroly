import "./styles/active_course_sr_widget.css"

export default function ActiveCourseSRWidget({ course, found, addActiveCourse}) {


  const displayLocation = () => {
    return course.course_location.replace("-", " ")
  }

  const displayTime = () => {
    return course.course_time.slice(0,2)+":"+course.course_time.slice(2,4)+"-"+course.course_time.slice(5,7)+":"+course.course_time.slice(7,9)
  }

  const addCourse = async () => {
    await addActiveCourse(course)
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
        {found ?
          <button className="sr_active_button bgcolor-primary color-white text-12-medium" disabled>Active</button> :
          <button onClick={addCourse} className="sr_add_button bgcolor-white color-accent text-12-medium opaque button_effect_1_dark">Add</button>
        } 
        <p className="text-14-medium color-accent opaque">{course.course_instructor}</p>
      </div>
    </div>
  )
}