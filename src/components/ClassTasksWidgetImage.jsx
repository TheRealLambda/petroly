import "./styles/class_tasks_widget_image.css"

const ClassTasksWidgetImage = ({url}) => {

  const openImage = (event) => {
    event.stopPropagation()
    event.target.parentNode.classList.add("opened")
    // console.log(event.target.parentNode);
  }
  const closeImage = (event) => {
    console.log("IMAGE CLOSED");
    event.target.classList.remove("opened")
  }

  return (
    <div onClick={closeImage} className="class_tasks_widget_image" >
      <img onClick={openImage} src={url}/>
    </div>
  )
}

export default ClassTasksWidgetImage