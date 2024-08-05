import { useEffect, useState } from "react"
import Modal from "./Modal"
import NavBar from "./NavBar"
import "./styles/sandbox_page.css"
import ShowEventForm from "./ShowEventForm"
import axios from "axios"
import EditEventForm from "./EditEventForm"

const Form = ({ setState, setForm }) => {

  return (
    <div>
      <div className="dragArea drag_area"></div>
      <div className="scrollContainer scroll_content">
        <div onClick={()=>setForm("edit")} className="dragArea2 drag_area2"></div>
        <div ></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

const FormEdit = ({ setState, setForm }) => {

  return (
    <div>
      <div className="dragArea drag_area"></div>
      <div className=" scroll_content">
        <div onClick={()=>setForm("show")} className="dragArea2 drag_area2"></div>
        <div></div>
      </div>
    </div>
  )
}

const SandBox = () => {

  const [state, setState] = useState("closed")
  const [form, setForm] = useState("show") //show, edit, 
  const [eventModalId, setEventModalId] = useState(null) 

  useEffect(() => {
    async function load() {
      const result = await axios.get("http://localhost:3001/api/events")
      console.log(result.data[0]._id);
      setEventModalId({id: result.data[0]._id, edit: false})
    }  
    load()
  }, [])

  console.log("eventModalId:", eventModalId);
  return (
    <div className="sandbox_page">
      <NavBar />
      <button onClick={()=>setState("partial")}>open modal</button>
      <Modal state={state} setState={setState}>
        {/* {
          form === "show" ? <Form setState={setState} setForm={setForm} />
          : form === "edit" ? <FormEdit setState={setState} setForm={setForm}/>
          : 1
        } */}
        {/* {eventModalId && <ShowEventForm eventModalId={eventModalId} setEventModalId={setEventModalId}/>} */}
        {eventModalId && <EditEventForm eventModalId={eventModalId} setEventModalId={setEventModalId}/>}
      </Modal>
    </div>
  )
}

export default SandBox