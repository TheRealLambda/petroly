import NavBar from "./NavBar"
import "./styles/tasks_page.css"
const TasksPage = () => {

  return (
    <div className="tasks_page">
      <NavBar />
      <div className="top_nav">
        <div className="div1">
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          <h4 className="color-accent">Today, June</h4>
        </div>
        <div className="div2">
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-280q-33 0-56.5-23.5T120-360v-240q0-33 23.5-56.5T200-680h560q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H200Zm0-80h560v-240H200v240Zm-41-400q-17 0-28-11.5T120-800q0-17 11.5-28.5T160-840h641q17 0 28 11.5t11 28.5q0 17-11.5 28.5T800-760H159Zm0 640q-17 0-28-11.5T120-160q0-17 11.5-28.5T160-200h641q17 0 28 11.5t11 28.5q0 17-11.5 28.5T800-120H159Zm41-480v240-240Z"/></svg>
          <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
        </div>
      </div>
      <div className="week_selector">
        <div className="flex_container">
          <div className="week_day">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">Sun</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">2</p>
            </div>
          </div>
          <div className="week_day today">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">Mon</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">3</p>
            </div>
          </div>
          <div className="week_day">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">Tue</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">4</p>
            </div>
          </div>
          <div className="week_day">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">Wed</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">5</p>
            </div>
          </div>
          <div className="week_day">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">Thu</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">6</p>
            </div>
          </div>
          <div className="week_day">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">Fri</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">7</p>
            </div>
          </div>
          <div className="week_day">
            <div className="day_name">  
              <p className="text-14-semibold color-accent">Sat</p>
            </div>
            <div className="day_number">
              <p className="text-14-medium color-accent">8</p>
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="container bgcolor-white">
          <div className="div1">
            <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm0 0v-528 528Zm84-72h360.19Q671-288 676-298t-2-19L566-461q-5.25-8-14-8t-14 8l-94 125-58-77q-5.25-8-14-8t-14 8l-71.82 96.03Q279-308 284.25-298q5.25 10 15.75 10Z"/></svg>
            <p className="text-14-semibold color-accent">PINNED</p>
          </div>
          <div className="div2">
            <p className="text-14-semibold color-accent">1</p>
            <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"/></svg>
          </div>
        </div>
        <div className="container bgcolor-white">
          <div className="div1">
            <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm0 0v-528 528Zm84-72h360.19Q671-288 676-298t-2-19L566-461q-5.25-8-14-8t-14 8l-94 125-58-77q-5.25-8-14-8t-14 8l-71.82 96.03Q279-308 284.25-298q5.25 10 15.75 10Z"/></svg>
            <p className="text-14-semibold color-accent">PINNED</p>
          </div>
          <div className="div2">
            <p className="text-14-semibold color-accent">1</p>
            <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"/></svg>
          </div>
        </div>
        <div className="container bgcolor-white">
          <div className="div1">
            <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm0 0v-528 528Zm84-72h360.19Q671-288 676-298t-2-19L566-461q-5.25-8-14-8t-14 8l-94 125-58-77q-5.25-8-14-8t-14 8l-71.82 96.03Q279-308 284.25-298q5.25 10 15.75 10Z"/></svg>
            <p className="text-14-semibold color-accent">PINNED</p>
          </div>
          <div className="div2">
            <p className="text-14-semibold color-accent">1</p>
            <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"/></svg>
          </div>
        </div>
        <div className="container bgcolor-white">
          <div className="div1">
            <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm0 0v-528 528Zm84-72h360.19Q671-288 676-298t-2-19L566-461q-5.25-8-14-8t-14 8l-94 125-58-77q-5.25-8-14-8t-14 8l-71.82 96.03Q279-308 284.25-298q5.25 10 15.75 10Z"/></svg>
            <p className="text-14-semibold color-accent">PINNED</p>
          </div>
          <div className="div2">
            <p className="text-14-semibold color-accent">1</p>
            <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"/></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TasksPage