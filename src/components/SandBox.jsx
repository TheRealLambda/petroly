import { useState } from "react"
import Modal from "./Modal"
import NavBar from "./NavBar"
import "./styles/sandbox_page.css"

const Form = ({ setState, setForm }) => {

  return (
    <div>
      <div id="dragArea" className="drag_area"></div>
      <div id="scrollContainer" className="scroll_content">
        <div onClick={()=>setForm("edit")} className="drag_area2"></div>
        <div onClick={()=>setState("closed")}></div>
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
      <div id="dragArea" className="drag_area"></div>
      <div id="scrollContainer" className="scroll_content">
        <div onClick={()=>setForm("show")} className="drag_area2"></div>
        <div onClick={()=>setState("closed")}></div>
      </div>
    </div>
  )
}

const SandBox = () => {

  const [state, setState] = useState("closed")
  const [form, setForm] = useState("show") //show, edit, 

  return (
    <div className="sandbox_page">
      <NavBar />
      <button onClick={()=>setState("partial")}>open modal</button>
      <Modal state={state} setState={setState}>
        {
          form === "show" ? <Form setState={setState} setForm={setForm} />
          : form === "edit" ? <FormEdit setState={setState} setForm={setForm}/>
          : 1
        }
      </Modal>
    </div>
  )
}

export default SandBox