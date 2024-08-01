import { useEffect } from "react"
import "./styles/modal.css"

const Modal = ({ options }) => {

  let state = "partial"
  let down = false
  let dragging = false
  let clicked = false
  let initialOffset;
  let modal;

  const openThresold = 200
  const partialThresold = 500

  const pointerDown = (e) => {
    if(e.target.classList.contains("drag_area")) {
      clicked = true
      setTimeout(()=> {
        clicked = false
      }, 100)
      down = true
      initialOffset = e.clientY - modal.children[0].getBoundingClientRect().top
      dragging = true
      modal.children[0].style = "transition: none"
    }
  }

  const pointerMove = (e) => {
    if(dragging) {
      const mouseY = e.clientY
      modal.children[0].style.top = (mouseY-initialOffset)+"px"
    }
  }

  const pointerUp = (e) => {
    down = false
    dragging = false
    modal.children[0].style = ""
    const top = modal.children[0].getBoundingClientRect().top
    if(top < openThresold) {
      modal.children[0].classList.remove("closed")
      modal.children[0].classList.remove("partial")
      modal.children[0].classList.add("open")
    } else if(top < partialThresold) {
      modal.children[0].classList.remove("closed")
      modal.children[0].classList.remove("open")
      modal.children[0].classList.add("partial")
    } else {
      modal.children[0].classList.remove("open")
      modal.children[0].classList.remove("partial")
      modal.children[0].classList.add("closed")
    }
  }

  useEffect(() => {
    modal = document.getElementById("modal")
    modal.addEventListener("pointerdown", pointerDown)
    modal.addEventListener("pointermove", pointerMove)
    modal.addEventListener("pointerup", pointerUp)
    
    return () => {
      modal.removeEventListener("pointerdown", pointerDown)
      modal.removeEventListener("pointermove", pointerMove)
      modal.removeEventListener("pointerup", pointerUp)
    }
  }, [])

  return (
    <div id="modal" className="modal">
      <div className="container partial">
        <div className="drag_area"></div>
      </div>
    </div>
  )
}

export default Modal