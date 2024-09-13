import "./styles/change_list_menu.css"

export default function ChangeListMenu({ closeMenu, tasksLists, moveTask }) {

  const expandList = (e) => {
    if(e.currentTarget.parentNode.lastElementChild.classList.contains("show")) {
      e.currentTarget.parentNode.lastElementChild.classList.remove("show")
      e.currentTarget.lastElementChild.firstElementChild.setAttribute("transform", "rotate(0)")
    } else {
      e.currentTarget.parentNode.lastElementChild.classList.add("show")
      e.currentTarget.lastElementChild.firstElementChild.setAttribute("transform", "rotate(180)")
    }
  }

  return (
    <div className="change_list_menu">
      <div className="wrapper"></div>
      <div className="container bgcolor-BG">
        <div className="top">
          <div onClick={closeMenu} className="close_button bgcolor-BG button_effect_1_dark">
            <svg className="fillcolor-accent-80" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
          </div>
          <p className="text-20-medium color-accent-80">Move to</p>
        </div>
        {tasksLists.map(list => {
          return (
            <div className="section">
              <div onClick={expandList} className="section_top bgcolor-BG button_effect_1_dark">
                <svg className="fillcolor-accent-80 list_icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-340q-17 0-28.5-11.5T120-380v-20q0-17 11.5-28.5T160-440h640q17 0 28.5 11.5T840-400v20q0 17-11.5 28.5T800-340H160Zm0-180q-17 0-28.5-11.5T120-560v-20q0-17 11.5-28.5T160-620h640q17 0 28.5 11.5T840-580v20q0 17-11.5 28.5T800-520H160Zm0-180q-17 0-28.5-11.5T120-740v-20q0-17 11.5-28.5T160-800h640q17 0 28.5 11.5T840-760v20q0 17-11.5 28.5T800-700H160Zm0 540q-17 0-28.5-11.5T120-200v-20q0-17 11.5-28.5T160-260h640q17 0 28.5 11.5T840-220v20q0 17-11.5 28.5T800-160H160Z"/></svg>
                <p className="text-16-medium color-accent-80">{list.name}</p>
                <div className="list_button bgcolor-BG button_effect_1_dark">
                  <svg className="fillcolor-accent-80" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z"/></svg>
                </div>
              </div>
              <div className="collections_list">
                {list.tasksCollections.map(collection => {
                  return (
                    <div onClick={()=>moveTask(collection._id)} className="collection text-16-medium color-accent-80 bgcolor-BG button_effect_1_dark">{collection.name}</div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}