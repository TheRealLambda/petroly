import { useEffect, useState } from "react"
import "./styles/modal.css"

const Modal = ({ state, setState, options, children }) => {

  options = options || {}
  let clickAwayToClose = true
  
  
  let down = false
  let dragging = false
  let clicked = false
  let mouseDown = false
  let lockDragging = false
  let locked = false
  let initialOffset;
  let initialMouseY;
  let timeout;
  let timeout2;
  let modal;
  let container;
  let dragAreaDiv;
  let scrollContainerDiv;

  const openThresold = 200
  const partialThresold = 500

  /*
    These 3 functions (open, partial and closed) control the state of the modal.
    The modal's position and movement is controlled by css classes using absolute
    position. The css property transition is only applied for the duration of the 
    transition. That is to avoid transitioning every frame when the user drags(scrolls) 
    the modal.
  */
  const open = () => {
    container.style = ""
    container.classList.add("transition")
    setTimeout(()=>{
      container.classList.remove("transition")
    }, 200) //same time as transition duration
    container.classList.remove("closed")
    container.classList.remove("partial")
    container.classList.add("open")
    scrollContainerDiv.classList.remove("no_scroll") //allow content to be scrolled
  }
  const partial = () => {
    container.style = ""
    container.classList.add("transition")
    console.log("ADD TRANSTION");
    setTimeout(()=>{
      console.log("REMOVE TRANSTION");
      container.classList.remove("transition")
    }, 200) //same time as transition duration
    container.classList.remove("open")
    container.classList.remove("closed")
    container.classList.add("partial")
    scrollContainerDiv.classList.add("no_scroll") //prevent content to be scrolled
  }
  const closed = () => {
    container.style = ""
    container.classList.add("transition")
    setTimeout(()=>{
      container.classList.remove("transition")
    }, 200) //same time as transition duration
    container.classList.remove("partial")
    container.classList.remove("open")
    container.classList.add("closed")
    scrollContainerDiv.classList.add("no_scroll")
  }


  /*
    The entire logic of the component exists in 3 events: pointerdown, pointermove
    and pointerup. 
  */
  const pointerDown = (e) => {
    initialMouseY = e.clientY
    initialOffset = e.clientY - container.getBoundingClientRect().top
    mouseDown = true
    if(e.target.classList.contains("drag_area")) {
      clicked = true
      clearTimeout(timeout)
      timeout = setTimeout(()=> {
        clicked = false
      }, 500)
      down = true
      dragging = true
    } else if(state === "open" && !lockDragging && scrollContainerDiv.scrollTop === 0) {
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
    const top = container.getBoundingClientRect().top
    
    if(dragging) {

      modal.style.pointerEvents = "all"
      if(state === "open") {
        if(mouseY > initialMouseY && (mouseY-initialOffset) < partialThresold) {
          //drag within boundry
          container.style.top = (mouseY-initialOffset)+"px"
        } else if(mouseY <= initialMouseY) {
          //modal exceeds top boundry
          container.style.top = "0px"
        } else if((mouseY-initialOffset) >= partialThresold) {
          //modal exceeds bottom boundry
          container.style.top = partialThresold+"px"
        }
      } 
      else if(state === "partial") {
        if(mouseY < initialMouseY && (mouseY-initialOffset) > 0) {
          //drag within boundry
          container.style.top = (mouseY-initialOffset)+"px"
        } else if(mouseY >= initialMouseY) {
          //modal exceeds bottom boundry
          container.style.top = partialThresold+"px"
        } else if((mouseY-initialOffset) <= 0) {
          //modal exceeds top boundry
          container.style.top = "0px"
        }
      }
       
    } else if(mouseDown) { 
      //special cases when dragging outside drag_area
      
      modal.style.pointerEvents = "all"
      if(state === "open") {
        if(mouseY < initialMouseY && top <= 0) {
          lockDragging = true
          locked = true
        }
        if(!lockDragging && scrollContainerDiv.scrollTop === 0 && mouseY > initialMouseY && (mouseY-initialOffset) < partialThresold) {
          //drag down only when content has not been scrolled
          container.style.top = (mouseY-initialOffset)+"px"
        } else if(mouseY <= initialMouseY) {
          //modal exceeds top boundry
          container.style.top = "0px"
        } else if((mouseY-initialOffset) >= partialThresold) {
          //modal exceeds bottom boundry
          container.style.top = partialThresold+"px"
        }
      }

    }
  }
  const pointerUp = (e) => {
    down = false
    dragging = false
    mouseDown = false
    const top = container.getBoundingClientRect().top
    const finalMouseY = e.clientY
    console.log(clicked, finalMouseY, initialMouseY);
    modal.style.pointerEvents = "none"

    if(locked && scrollContainerDiv.scrollTop === 0) {
      clearTimeout(timeout2)
      timeout2 = setTimeout(() => {
        lockDragging = false
      }, 1000)
      locked = false
    }

    if(clicked && finalMouseY < initialMouseY) {
      //swipe up
      console.log(state);
      if(state === "partial") {
        setState("open")
      }
    } else if(clicked && finalMouseY > initialMouseY) {
      //swipe down
      console.log(state);
      if(state === "open") {
        setState("partial")
      } else if(options.swipeToClose && state === "partial") {
        setState("closed")
      }
    } else if(e.target.classList.contains("drag_area") && clicked && finalMouseY === initialMouseY) {
      //click
      if(state === "open") {
        setState("partial")
      } else if(state === "partial") {
        setState("open")
      }
    } else if(clickAwayToClose && e.target.classList.contains("modal") && state === "partial" && finalMouseY === initialMouseY) {
      setState("closed")
    } else if((e.target.classList.contains("drag_area")||e.target.classList.contains("drag_area2")) && state === "partial" && finalMouseY === initialMouseY){
      setState("open")
    } else if(top < openThresold) {
      console.log("HERE! open");
      if(state === "open") {
        open()
      } else {
        setState("open")
      }
    } else if(top < partialThresold) {
      console.log("HERE! partial");
      if(state === "partial") {
        partial()
      } else {
        setState("partial")
      }
    } else {
      
    }
  }


  useEffect(() => {
    modal = document.getElementById("modal")
    container = modal.firstElementChild
    dragAreaDiv = document.getElementById("dragArea")
    scrollContainerDiv = document.getElementById("scrollContainer")

    modal.addEventListener("pointerdown", pointerDown)
    modal.addEventListener("pointermove", pointerMove)
    modal.addEventListener("pointerup", pointerUp)

    if(state === "open") {
      open()
    } else if(state === "partial") {
      partial()
    } else if(state === "closed") {
      closed()
    }

    return () => {
      modal.removeEventListener("pointerdown", pointerDown)
      modal.removeEventListener("pointermove", pointerMove)
      modal.removeEventListener("pointerup", pointerUp)
    }
  }, [state])

  //drag_area
  //scroll_content
  //drag_area2

  return (
    <div id="modal" className="modal">
      <div className="container closed">
        {children}
      </div>
    </div>
  )
}

export default Modal