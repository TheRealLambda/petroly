import { useState } from "react"

const SandBox = () => {

  const [state, setState] = useState(() => {
    console.log("executed");
    return 0
  })
  console.log(state);

  return (
    <div className="sandbox_page">
      <button onClick={() => setState(state+1)}>asd</button>
    </div>
  )
}

export default SandBox