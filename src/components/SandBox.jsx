import { useState } from "react"

const SandBox = () => {

  const regex = /^20\d{2}-(?!00|1[3-9]|[2-9][0-9])\d{2}-(?!00|3[2-9]|[4-9])\d{2}T(?!2[4-9]|[3-9])\d{2}:(?![6-9])\d{2}:(?![6-9])\d{2}.\d{3}Z$/
  console.log(!regex.test("2024-08-30T00:40:00.000Z"));
  return (
    <div className="sandbox_page">
      <button onClick={() => setState(state+1)}>asd</button>
    </div>
  )
}

export default SandBox