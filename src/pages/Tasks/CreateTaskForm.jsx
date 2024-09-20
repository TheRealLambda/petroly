import { useEffect, useRef, useState } from "react"
import "./styles/create_task_form.css"

export default function CreateTastForm({ closeForm }) {

  const selection = useRef(null)
  const div = useRef(null)
  const [text, setText] = useState("")
  const [description, setDescription] = useState("")


  // useEffect(() => {
    
  //   // div.current.innerHTML = text
  // }, [text])


  // get the cursor position from .editor start
  function getCursorPosition(parent, node, offset, stat) {
    if (stat.done) return stat;

    let currentNode = null;
    if (parent.childNodes.length == 0) {
      stat.pos += parent.textContent.length;
    } else {
      for (let i = 0; i < parent.childNodes.length && !stat.done; i++) {
        currentNode = parent.childNodes[i];
        if (currentNode === node) {
          stat.pos += offset;
          stat.done = true;
          return stat;
        } else getCursorPosition(currentNode, node, offset, stat);
      }
    }
    return stat;
  }

  //find the child node and relative position and set it on range
  function setCursorPosition(parent, range, stat) {
    if (stat.done) return range;

    let currentNode = null
    if (parent.childNodes.length == 0) {
      if (parent.textContent.length >= stat.pos) {
        range.setStart(parent, stat.pos);
        stat.done = true;
      } else {
        stat.pos = stat.pos - parent.textContent.length;
      }
    } else {
      for (let i = 0; i < parent.childNodes.length && !stat.done; i++) {
        currentNode = parent.childNodes[i];
        setCursorPosition(currentNode, range, stat);
      }
    }
    return range;
  }




  const handleInput = (e) => {
    const a = document.getElementById("placeHolder")
    console.log(a, div.current.innerText.length);
    if(div.current.innerText.length > 0) {
      a.style.display = "none"
    } else {
      a.style.display = "block"
    }
    console.log(e.target.innerText);
    console.log(e.target.innerText.split(/(\s+)/));
    const array = div.current.innerText.split(/(\s+)/)
    const parsedArray = array.map(word => {
      console.log(word)
      if(word.match(/^\d{1,2}(am|pm)$/)) {
        // console.log("MATCHED!");
        return "<span>"+word+"</span>"
      } else if((word.includes("<span>") || word.includes("</span>")) && !word.replace(/<span>|<\/span>/g, "").match(/^\d{1,2}(am|pm)$/)) {
        return word.replace(/<span>|<\/span>/g, "")
      } else {
        return word
      }
    }) 
    // // console.log(parsedArray);
    // // console.log(parsedArray.join(" "));
    // console.log(document.getSelection().anchorNode.textContent);
    // selection.current = document.getSelection().anchorOffset
    // // div.current.innerHTML = ""

    //get current cursor position
    const sel = window.getSelection();
    const node = sel.focusNode;
    const offset = sel.focusOffset;
    const pos = getCursorPosition(div.current, node, offset, { pos: 0, done: false });
    if (offset === 0) pos.pos += 0.5;

    div.current.innerHTML = parsedArray.join("");

    // restore the position
    sel.removeAllRanges();
    const range = setCursorPosition(div.current, document.createRange(), {
      pos: pos.pos,
      done: false,
    });
    range.collapse(true);
    sel.addRange(range);

  }

  return (
    <div className="create_task_form">
      <div onClick={closeForm} className="wrapper"></div>
      <div className="container bgcolor-BG">
        <div id="placeHolder" className="place_holder text-14-medium color-accent">What would you like to do?</div>
        <div ref={div} onInput={handleInput} className="text_field text-16-medium bgcolor-BG color-accent-80" type="text" contentEditable>
        </div>
        <input onChange={(e)=>setDescription(e.target.value)} className="description_field text-14-medium bgcolor-BG color-accent-80" type="text" value={description} />
        <div className="buttons">
          <div className="choose_list_button bgcolor-BG button_effect_1_dark">
            <svg className="fillcolor-accent-80" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm280-120q32 0 59-16.5t44-43.5q6-9 15-14.5t20-5.5h142v-360H200v360h142q11 0 20 5.5t15 14.5q17 27 44 43.5t59 16.5ZM200-200h560-560Z"/></svg>
          </div>
          <div className="more_button bgcolor-BG button_effect_1_dark">
            <svg className="fillcolor-accent-80" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
          </div>
          <div className="save_button bgcolor-primary button_effect_1_lighter">
            <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M176-183q-20 8-38-3.5T120-220v-180l320-80-320-80v-180q0-22 18-33.5t38-3.5l616 260q25 11 25 37t-25 37L176-183Z"/></svg>
          </div>
        </div>
      </div>
    </div>
  )
}