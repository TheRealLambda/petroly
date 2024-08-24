import axios from "axios"
import { useState } from "react"

export default function LoginPage ({ setUserAuthToken }) {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const handleForm = async (e) => {
    e.preventDefault()
    const result = await axios.post("http://localhost:3001/api/login", {username, password})
    setUserAuthToken(result.data.token)
    localStorage.setItem("userAuthToken", result.data.token)
  }

  return (
    <form onSubmit={handleForm}>
      <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username" value={username}/>
      <input onChange={(e)=>setPassword(e.target.value)} type="text" placeholder="password" value={password}/>
      <button type="submit">Login</button>
    </form>
  )
}