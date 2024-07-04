import { useNavigate } from "react-router-dom"
import "./styles/class_page.css"

const ClassPage = () => {
  
  const navigate = useNavigate()

  return (
    <div className="class_page">
      <button onClick={()=>navigate(-1)}>Back</button>
    </div>
  )
}

export default ClassPage