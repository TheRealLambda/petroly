import { useEffect } from "react"
import "./styles/modal.css"

const Modal = ({ options }) => {

  options = options || {}
  let clickAwayToClose = true

  let state = "partial"
  let down = false
  let dragging = false
  let clicked = false
  let mouseDown = false
  let tempBool1 = false
  let tempBool2 = false
  let initialOffset;
  let initialMouseY;
  let timeout = null
  let timeout2 = null
  let timeout3 = null
  let modal;
  let dragAreaDiv;
  let scrollContainerDiv;

  const openThresold = 200
  const partialThresold = 500

  /*
    These 3 functions (open, partial and closed) change
  */
  const open = () => {
    modal.children[0].style = ""
    modal.children[0].classList.add("transition")
    clearTimeout(timeout2)
    timeout2 = setTimeout(()=>{
      modal.children[0].classList.remove("transition")
    }, 200) //same time as transition duration
    modal.children[0].classList.remove("closed")
    modal.children[0].classList.remove("partial")
    modal.children[0].classList.add("open")
    scrollContainerDiv.classList.remove("no_scroll")
    state = "open"
  }
  const partial = () => {
    modal.children[0].style = ""
    modal.children[0].classList.add("transition")
    console.log("ADD TRANSTION");
    clearTimeout(timeout2)
    timeout2 = setTimeout(()=>{
      console.log("REMOVE TRANSTION");
      modal.children[0].classList.remove("transition")
    }, 200) //same time as transition duration
    modal.children[0].classList.remove("open")
    modal.children[0].classList.remove("closed")
    modal.children[0].classList.add("partial")
    scrollContainerDiv.classList.add("no_scroll")
    state = "partial"
  }
  const closed = () => {
    modal.children[0].style = ""
    modal.children[0].classList.add("transition")
    clearTimeout(timeout2)
    timeout2 = setTimeout(()=>{
      modal.children[0].classList.remove("transition")
    }, 200) //same time as transition duration
    modal.children[0].classList.remove("partial")
    modal.children[0].classList.remove("open")
    modal.children[0].classList.add("closed")
    scrollContainerDiv.classList.add("no_scroll")
    state = "closed"
  }


  const pointerDown = (e) => {
    initialMouseY = e.clientY
    initialOffset = e.clientY - modal.children[0].getBoundingClientRect().top
    mouseDown = true
    if(e.target.classList.contains("drag_area")) {
      clicked = true
      clearTimeout(timeout)
      timeout = setTimeout(()=> {
        clicked = false
      }, 500)
      down = true
      dragging = true
    } else if(state === "open" && !tempBool1 && scrollContainerDiv.scrollTop === 0) {
      clicked = true
      clearTimeout(timeout)
      timeout = setTimeout(()=> {
        clicked = false
      }, 500)
    } else if(e.target.classList.contains("modal")) {
      clicked = true
      clearTimeout(timeout)
      timeout = setTimeout(()=> {
        clicked = false
      }, 500)
    }
  }
  const pointerMove = (e) => {
    const mouseY = e.clientY
    const top = modal.children[0].getBoundingClientRect().top
    if(dragging) {
      console.log(state);
      console.log(mouseY, initialMouseY);
      console.log(mouseY, partialThresold);
      if(state === "open" && mouseY > initialMouseY && (mouseY-initialOffset) < partialThresold) {
        //move down
        modal.children[0].style.top = (mouseY-initialOffset)+"px"
      } else if(state === "open" && mouseY <= initialMouseY) {
        modal.children[0].style.top = "0px"
      } else if(state === "open" && (mouseY-initialOffset) >= partialThresold) {
        modal.children[0].style.top = partialThresold+"px"
      } else if(state === "partial" && mouseY < initialMouseY && (mouseY-initialOffset) > 0) {
        modal.children[0].style.top = (mouseY-initialOffset)+"px"
      } else if(state === "partial" && mouseY >= initialMouseY) {
        modal.children[0].style.top = partialThresold+"px"
      } else if(state === "partial" && (mouseY-initialOffset) <= 0) {
        modal.children[0].style.top = "0px"
      }
    } else if(state === "open" && mouseDown) {
      console.log(mouseY, initialMouseY, initialOffset);
      if(mouseY < initialMouseY && top <= 0) {
        tempBool1 = true
        tempBool2 = true
      }
      if(!tempBool1 && scrollContainerDiv.scrollTop === 0 && mouseY > initialMouseY && (mouseY-initialOffset) < partialThresold) {
        //move down
        modal.children[0].style.top = (mouseY-initialOffset)+"px"
      } else if(mouseY <= initialMouseY) {
        modal.children[0].style.top = "0px"
      } else if((mouseY-initialOffset) >= partialThresold) {
        modal.children[0].style.top = partialThresold+"px"
      }
    }
  }
  const pointerUp = (e) => {
    down = false
    dragging = false
    mouseDown = false
    const top = modal.children[0].getBoundingClientRect().top
    const finalMouseY = e.clientY
    console.log(clicked, finalMouseY, initialMouseY);

    if(tempBool2 && scrollContainerDiv.scrollTop === 0) {
      clearTimeout(timeout3)
      timeout3 = setTimeout(() => {
        tempBool1 = false
      }, 1000)
      tempBool2 = false
    }

    if(clicked && finalMouseY < initialMouseY) {
      //swipe up
      console.log(state);
      if(state === "partial") {
        open()
      } else if(state === "open") {
        open()
      }
    } else if(clicked && finalMouseY > initialMouseY) {
      //swipe down
      console.log(state);
      if(state === "open") {
        partial()
      } else if(options.swipeToClose && state === "partial") {
        closed()
      }
    } else if(e.target.classList.contains("drag_area") && clicked && finalMouseY === initialMouseY) {
      //click
      if(state === "open") {
        partial()
      } else if(state === "partial") {
        open()
      }
    } else if(clickAwayToClose && e.target.classList.contains("modal") && state === "partial" && finalMouseY === initialMouseY) {
      closed()
    } else if((e.target.classList.contains("drag_area")||e.target.classList.contains("drag_area2")) && state === "partial" && finalMouseY === initialMouseY){
      open()
    } else if(top < openThresold) {
      open()
    } else if(top < partialThresold) {
      partial()
    } else {
      // closed()
    }
  }


  useEffect(() => {
    modal = document.getElementById("modal")
    dragAreaDiv = document.getElementById("dragArea")
    scrollContainerDiv = document.getElementById("scrollContainer")

    modal.addEventListener("pointerdown", pointerDown)
    modal.addEventListener("pointermove", pointerMove)
    modal.addEventListener("pointerup", pointerUp)

    partial()
    
    return () => {
      modal.removeEventListener("pointerdown", pointerDown)
      modal.removeEventListener("pointermove", pointerMove)
      modal.removeEventListener("pointerup", pointerUp)
    }
  }, [])

  //drag_area
  //scroll_content
  //drag_area2

  return (
    <div id="modal" className="modal">
      <div className="container partial">
        <div id="dragArea" className="drag_area"></div>
        <div id="scrollContainer" className="scroll_content">
          <div className="drag_area2"></div>
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
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Modal