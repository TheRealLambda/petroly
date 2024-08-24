import { useState } from "react"

const SandBox = () => {

  const a = {
    a: 0,
    b: "b",
    d: false
  }

  return (
    <div className="sandbox_page">
      <button onClick={() => setState(state+1)}>asd</button>
    </div>
  )
}

export default SandBox