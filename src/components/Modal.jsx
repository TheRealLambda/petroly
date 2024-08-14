import { useEffect, useRef, useState } from "react"
import "./styles/modal.css"


const Modal = ({ state, setState, options, children }) => {
  console.log();
  options = options || {}
  
  let dragging = false
  let clicked = false
  let mouseDown = false
  let lockDragging = false
  let locked = false
  let initialOffset;
  let initialMouseY;
  let timeout;
  let timeout2;
  const modal = useRef(null)
  let container;
  let scrollContainer;
  
  const openThresold = options.openThresold || 200
  const partialThresold = options.partialThresold || 500
  const clickAwayToClose = options.clickAwayToClose === true ? true : false
  const swipeDownToClose = options.swipeDownToClose  === true ? true : false
  const dragDownToClose = options.dragDownToClose  === true ? true : false

  /*
    These 3 functions (open, partial and closed) control the state of the modal.
    The modal's position and movement is controlled by css classes using absolute
    position. The css property transition is only applied for the duration of the 
    transition. That is to avoid transitioning every frame when the user drags(scrolls) 
    the modal.
  */
  const open = () => {
    container.style = ""
    console.log("ZZZZZZZZZZZZ::", container);
    container.classList.add("transition")
    setTimeout(()=>{
      container.classList.remove("transition")
    }, 200) //same time as transition duration
    container.classList.remove("closed")
    container.classList.remove("partial")
    container.classList.add("open")
    modal.current.classList.add("darken")
    scrollContainer ? scrollContainer.classList.remove("no_scroll") : 0 //allow content to be scrolled
  }
  const partial = () => {
    container.style = ""
    container.classList.add("transition")
    setTimeout(()=>{
      container.classList.remove("transition")
    }, 200) //same time as transition duration
    container.classList.remove("open")
    container.classList.remove("closed")
    container.classList.add("partial")
    modal.current.classList.remove("darken")
    scrollContainer ? scrollContainer.scrollTo({top:0}) : 0 //prevent content to be scrolled
    scrollContainer ? scrollContainer.classList.add("no_scroll") : 0 //prevent content to be scrolled
  }
  const closed = () => {
    console.log("closed");
    container.style = ""
    container.classList.add("transition")
    setTimeout(()=>{
      container.classList.remove("transition")
    }, 200) //same time as transition duration
    container.classList.remove("partial")
    container.classList.remove("open")
    container.classList.add("closed")
    modal.current.classList.remove("darken")
    scrollContainer ? scrollContainer.classList.add("no_scroll") : 0 //prevent content to be scrolled
  }


  /*
    The entire logic of the component exists in 3 events: pointerdown, pointermove
    and pointerup. 
  */
  const pointerDown = (e) => {
    
    initialMouseY = e.clientY
    initialOffset = e.clientY - container.getBoundingClientRect().top
    mouseDown = true
    
    modal.current.style.pointerEvents = "all"

    if(e.target.classList.contains("modalDragArea")) {
      dragging = true
      clicked = true
      clearTimeout(timeout)
      timeout = setTimeout(()=> {
        clicked = false
      }, 500)
    } else if((state === "open" && !lockDragging && scrollContainer.scrollTop === 0) ||
              e.target.classList.contains("modal")) {
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
    
    /*
      dragDownToClose is true
    */
    if(dragDownToClose) {
      if(dragging) {

        if(state === "open") {
          if(mouseY > initialMouseY && (mouseY-initialOffset) < 640) {
            //drag within boundry
            container.style.top = (mouseY-initialOffset)+"px"
          } else if(mouseY <= initialMouseY) {
            //modal exceeds top boundry
            container.style.top = "0px"
          } else if((mouseY-initialOffset) >= 640) {
            //modal exceeds bottom boundry
            container.style.top = "640px"
          }
        } 
        else if(state === "partial") {
          if(mouseY < 640 && (mouseY-initialOffset) > 0) {
            //drag within boundry
            container.style.top = (mouseY-initialOffset)+"px"
          } else if(mouseY >= 640) {
            //modal exceeds bottom boundry
            container.style.top = "640px"
          } else if((mouseY-initialOffset) <= 0) {
            //modal exceeds top boundry
            container.style.top = "0px"
          }
        }         
      } else if(mouseDown) { 
        //special cases when dragging outside drag_area
        
        if(state === "open") {
          if(mouseY < initialMouseY && top <= 0) {
            lockDragging = true
            locked = true
          }
          if(!lockDragging && scrollContainer.scrollTop === 0 && mouseY > initialMouseY && (mouseY-initialOffset) < 640) {
            //drag down only when content has not been scrolled
            container.style.top = (mouseY-initialOffset)+"px"
          } else if(mouseY <= initialMouseY) {
            //modal exceeds top boundry
            container.style.top = "0px"
          } else if((mouseY-initialOffset) >= 640) {
            //modal exceeds bottom boundry
            container.style.top = "640px"
          }
        }
  
      }
    }

    /*
      dragDownToClose is false
    */
    else if(!dragDownToClose) {
      if(dragging) {

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
        else if(dragDownToClose && state === "partial") {
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
        
        if(state === "open") {
          if(mouseY < initialMouseY && top <= 0) {
            lockDragging = true
            locked = true
          }
          if(!lockDragging && scrollContainer.scrollTop === 0 && mouseY > initialMouseY && (mouseY-initialOffset) < partialThresold) {
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
  }
  const pointerUp = (e) => {
    dragging = false
    mouseDown = false
    const top = container.getBoundingClientRect().top
    const finalMouseY = e.clientY
    
    modal.current.style.pointerEvents = "none"

    if(locked && scrollContainer.scrollTop === 0) {
      clearTimeout(timeout2)
      timeout2 = setTimeout(() => {
        lockDragging = false
      }, 1000)
      locked = false
    }

    if(clicked && finalMouseY < initialMouseY) {
      //swipe up
      if(state === "partial") {
        setState("open")
      }
    } else if(clicked && finalMouseY > initialMouseY) {
      //swipe down
      if(state === "open") {
        setState("partial")
      } else if(swipeDownToClose && state === "partial") {
        setState("closed")
      }
    } else if(e.target.classList.contains("modalDragArea") && clicked && finalMouseY === initialMouseY) {
      //click
      if(state === "open") {
        setState("partial")
      } else if(state === "partial") {
        setState("open")
      }
    } else if(clickAwayToClose && e.target.classList.contains("modal") && state === "partial" && finalMouseY === initialMouseY) {
      setState("closed")
    } else if(e.target.classList.contains("modalDragArea2") && state === "partial" && finalMouseY === initialMouseY){
      setState("open")
    } else if(top < openThresold) {
      if(state === "open") {
        open()
      } else {
        setState("open")
      }
    } else if(top < partialThresold) {
      if(state === "partial") {
        partial()
      } else {
        setState("partial")
      }
    } else if(top > partialThresold) {
      setState("closed")
    }
  }


  useEffect(() => {
    // modal = document.getElementById("modal")
    
    container = modal.current.firstElementChild
    scrollContainer = document.getElementsByClassName("modalScrollContainer")[0] || null

    modal.current.addEventListener("pointerdown", pointerDown)
    modal.current.addEventListener("pointermove", pointerMove)
    modal.current.addEventListener("pointerup", pointerUp)

    if(state === "open") {
      open()
    } else if(state === "partial") {
      partial()
    } else if(state === "closed") {
      closed()
    }

    let localRef = null
    if(modal.current) {
      localRef = modal.current
    }
    return () => {
      localRef.removeEventListener("pointerdown", pointerDown)
      localRef.removeEventListener("pointermove", pointerMove)
      localRef.removeEventListener("pointerup", pointerUp)
    }
  }, [state])

  return (
    <div ref={modal} className="modal">
      <div className="modal_container bgcolor-BG closed">
        {children}
      </div>
    </div>
  )
}

export default Modal