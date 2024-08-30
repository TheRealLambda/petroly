import { useEffect, useRef, useState } from "react";
import "./styles/custom_select.css"

export default function CustomSelect({ className, onChange, defaultValue, children }) {

  const [selected, setSelected] = useState(defaultValue)
  const customSelect = useRef(null)
  const optionsList = useRef(null)

  const handleClick = (e) => {
    if(e.target === customSelect.current.firstElementChild.lastElementChild) {
      console.log("toggle list");
      customSelect.current.classList.toggle("show")
    } else if(optionsList.current.contains(e.target)) {
      const value = e.target.getAttribute("data-select-value")
      if(value) {
        console.log("select option:", e.target);
        setSelected(value)
        onChange({target: {value}})
        Array.from(customSelect.current.lastElementChild.children).forEach(option => option.classList.remove("chosen"))
        e.target.classList.add("chosen")
        customSelect.current.classList.remove("show")
      }
    } else if(customSelect.current.classList.contains("show")) {
      console.log("hide list");
      customSelect.current.classList.remove("show")
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleClick)

    if(optionsList.current.offsetHeight > 200) {
      optionsList.current.style.height = "200px"
      optionsList.current.style.overflowY = "scroll"
      customSelect.current.classList.remove("show")
    }

    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <div ref={customSelect} className={"custom_select show "+className}>
      <div className="selected bgcolor-white button_effect_1_dark">
        <p className="text-14-medium">{selected}</p>
        <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M459-381 314-526q-3-3-4.5-6.5T308-540q0-8 5.5-14t14.5-6h304q9 0 14.5 6t5.5 14q0 2-6 14L501-381q-5 5-10 7t-11 2q-6 0-11-2t-10-7Z"/></svg>  
        <div className="wrapper"></div>
      </div>
      <div ref={optionsList} className="options_list bgcolor-white">
        {children}
      </div>
    </div>
  )
}