import { useEffect, useRef, useState } from "react"
import "./styles/create_task_form.css"
import { postTask } from "../../services/tasks"

export default function CreateTastForm({ closeForm, tasksLists }) {

  const div = useRef(null)
  const time = useRef(null) 
  const date = useRef(null)
  const title = useRef(null)

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
    if(div.current.innerText.length > 0) {
      a.style.display = "none"
    } else {
      a.style.display = "block"
    }

    console.log(e.target.innerText);
    console.log(e.target.innerText.split(/(\s+)/));
    time.current = null
    date.current = null
    const array = div.current.innerText.split(/(\s+)/)
    const parsedArray = array.map(word => {
      console.log(word)
      
      if(word.match(/^\d{1,2}(am|pm)$/) && !time.current) {
        time.current = word
        return "<span>"+word+"</span>"
      } else if((word.includes("<span>") || word.includes("</span>")) && !word.replace(/<span>|<\/span>/g, "").match(/^\d{1,2}(am|pm)$/)) {
        return word.replace(/<span>|<\/span>/g, "")
      }

      const getDayOfWeek = (word) => {
        if(word==="sun"||word==="sunday") return 0
        if(word==="mon"||word==="monday") return 1
        if(word==="tue"||word==="tuesday") return 2
        if(word==="wed"||word==="wednesday") return 3
        if(word==="thu"||word==="thursday") return 4
        if(word==="fri"||word==="friday") return 5
        if(word==="sat"||word==="saturday") return 6
      }

      if(word.match(/^(sun|sunday|mon|monday|tue|tuesday|wed|wednesday|thu|thursday|fri|friday|sat|saturday)$/) && !date.current) {
        const now = new Date();    
        now.setDate(now.getDate() + (getDayOfWeek(word)+(7-now.getDay())) % 7);
        date.current = now
        return "<span>"+word+"</span>"
      }



      return word
    }) 

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
    
    let b;
    if(date.current && time.current) {
      console.log("yes date yes time");
      b = new Date(date.current)
      if(Number(time.current.split(/am|pm/)[0]) > 12) {
        console.log("time > 12", Number(time.current.split(/am|pm/)[0]));
        b.setHours(Number(time.current.split(/am|pm/)[0]),0,0,0)
      } else if(Number(time.current.split(/am|pm/)[0]) <= 12) {
        console.log("time less than 12");
        if(time.current.includes("pm")) {
        console.log("time is pm");
        b.setHours(Number(time.current.split(/am|pm/)[0])+12,0,0,0)
        } else if(time.current.includes("am")) {
          console.log("time is am ");
          b.setHours(Number(time.current.split(/am|pm/)[0]),0,0,0)
        }
      }
    } else if(!date.current) {
      console.log("no date yes time");
      b = new Date()
      if(Number(time.current.split(/am|pm/)[0]) > 12) {
        b.setHours(Number(time.current.split(/am|pm/)[0]),0,0,0)
      } else if(Number(time.current.split(/am|pm/)[0]) <= 12) {
        if(time.current.includes("am")) {
          b.setHours(Number(time.current.split(/am|pm/)[0]),0,0,0)
        } else if(time.current.includes("pm")) {
          b.setHours(Number(time.current.split(/am|pm/)[0])+12,0,0,0)
        }
      }
    } else if(!time.current) {
      console.log("yes date no time");
      b = new Date(date.current)
      b.setHours(0,0,0,0)
    } else {
      console.log("no date no time");
      b = new Date()
      b.setHours(0,0,0,0)
    }

    let n = false
    console.log(b);

    title.current = parsedArray.filter(string => { 
      if(!n && string.match(/<span>|<\/span>/)) {
        n = true
        console.log("adadsdasadaasdss");
        return false
      } 
      if(n) {
        n = false
        return false
      }
      return true

    }).join("")

    console.log(title.current);
  }

  const openListMenu = () => {

  }

  const saveTask = async () => {
    const body = {
      tasksCollectionId: tasksLists[2].tasksCollections[0]._id,
      title: title.current,
      description: "test",
      date: date.current
    }
    const result = await postTask(body)
    console.log(result);
  }

  return (
    <div className="create_task_form">
      <div onClick={closeForm} className="wrapper"></div>
      <div className="container bgcolor-BG">
        <div id="placeHolder" className="place_holder text-14-medium color-accent">What would you like to do?</div>
        <div ref={div} onInput={handleInput} className="text_field text-16-medium bgcolor-BG color-accent-80" type="text" contentEditable>
        </div>
        <input onChange={(e)=>setDescription(e.target.value)} className="description_field text-14-medium bgcolor-BG color-accent-80" type="text" />
        <div className="buttons">
          <div onClick={openListMenu} className="choose_list_button bgcolor-BG button_effect_1_dark">
            <svg className="fillcolor-accent-80" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm280-120q32 0 59-16.5t44-43.5q6-9 15-14.5t20-5.5h142v-360H200v360h142q11 0 20 5.5t15 14.5q17 27 44 43.5t59 16.5ZM200-200h560-560Z"/></svg>
          </div>
          <div className="more_button bgcolor-BG button_effect_1_dark">
            <svg className="fillcolor-accent-80" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
          </div>
          <div onClick={saveTask} className="save_button bgcolor-primary button_effect_1_lighter">
            <svg className="fillcolor-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M176-183q-20 8-38-3.5T120-220v-180l320-80-320-80v-180q0-22 18-33.5t38-3.5l616 260q25 11 25 37t-25 37L176-183Z"/></svg>
          </div>
        </div>
      </div>
    </div>
  )
}