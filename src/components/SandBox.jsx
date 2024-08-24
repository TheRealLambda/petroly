import { useState } from "react"

const SandBox = () => {

  const title = ""

  console.log(!title, typeof title === "string");

  return (
    <div className="sandbox_page">
      <button onClick={() => setState(state+1)}>asd</button>
    </div>
  )
}

export default SandBox