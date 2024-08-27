import axios from "axios";

let token

export function setToken(newToken) {
  token = `Bearer ${newToken}`
}

export async function getEvents(week, period) {

  if(Number.isFinite(week) && Number.isFinite(period)) {
    console.log("Events are being retrieved from the server");
    const config = {headers: {Authorization: token}}
    return await axios.get("http://localhost:3001/api/events?week="+week+"&period="+period, config)
  } else {
    console.error("(week, period) one of the variables is not a valid number")
  }
}

export async function postEvent(body) {
  const validatedBody = {title: body.title, start_time: body.start_time, end_time: body.end_time,
                        color: body.color, reminder: body.reminder, activities: body.activities,
                        tasks: body.tasks, type: body.type}
  
  //Validation---------------------------------------------------------------------------------------------------
  let validation = 0
  if(validatedBody.title===undefined || typeof validatedBody.title !== "string") validation = false
  if(validatedBody.start_time===undefined || typeof validatedBody.start_time !== "string") validation = false
  if(validatedBody.end_time===undefined || typeof validatedBody.end_time !== "string") validation = false
  if(validatedBody.color===undefined || typeof validatedBody.color !== "string") validation = false
  if(validatedBody.reminder !== null && (validatedBody.reminder===undefined || typeof validatedBody.reminder !== "string")) validation = false
  if(validatedBody.activities===undefined || !Array.isArray(validatedBody.activities)) validation = false
  if(validatedBody.tasks===undefined || !Array.isArray(validatedBody.tasks)) validation = false
  if(validatedBody.type===undefined || typeof validatedBody.type !== "string") validation = false

  if(validatedBody.title.length < 1) validatedBody.title = "(no title)"

  const ISODateRegex = /^20\d{2}-(?!00|1[3-9]|[2-9][0-9])\d{2}-(?!00|3[2-9]|[4-9])\d{2}T(?!2[4-9]|[3-9])\d{2}:(?![6-9])\d{2}:(?![6-9])\d{2}.\d{3}Z$/
  if(!ISODateRegex.test(validatedBody.start_time) || !ISODateRegex.test(validatedBody.end_time)) validation = false
  
  const hexColorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/
  if(!hexColorRegex.test(validatedBody.color)) validation = false
  
  if(validatedBody.reminder && !ISODateRegex.test(validatedBody.reminder)) validation = false

  const allowedTypes = ["event", "class"]
  if(!allowedTypes.includes(validatedBody.type)) validation = false
  //End of validation--------------------------------------------------------------------------------------------
  

  if(validation) {
    console.log("Event is posted to the server")
    const config = {headers: {Authorization: token}}
    return await axios.post("http://localhost:3001/api/events/", validatedBody, config)
  } else {
    console.error(validation, "Event is not in correct format: ", validatedBody)
  }
} 

export async function patchEvent(id, body) {
  const validatedBody = {title: body.title, start_time: body.start_time, end_time: body.end_time,
    color: body.color, reminder: body.reminder, activities: body.activities,
    tasks: body.tasks, type: body.type}


  //Validation---------------------------------------------------------------------------------------------------
  let validation = true
  if(validatedBody.title===undefined || typeof validatedBody.title !== "string") validation = false
  if(validatedBody.start_time===undefined || typeof validatedBody.start_time !== "string") validation = false
  if(validatedBody.end_time===undefined || typeof validatedBody.end_time !== "string") validation = false
  if(validatedBody.color===undefined || typeof validatedBody.color !== "string") validation = false
  if(validatedBody.reminder===undefined || typeof validatedBody.reminder !== "string") validation = false
  if(validatedBody.activities===undefined || !Array.isArray(validatedBody.activities)) validation = false
  if(validatedBody.tasks===undefined || !Array.isArray(validatedBody.tasks)) validation = false
  if(validatedBody.type===undefined || typeof validatedBody.type !== "string") validation = false

  if(validatedBody.title.length < 1) validatedBody.title = "(no title)"

  const ISODateRegex = /^20\d{2}-(?!00|1[3-9]|[2-9][0-9])\d{2}-(?!00|3[2-9]|[4-9])\d{2}T(?!2[4-9]|[3-9])\d{2}:(?![6-9])\d{2}:(?![6-9])\d{2}.\d{3}Z$/
  if(!ISODateRegex.test(validatedBody.start_time) || !ISODateRegex.test(validatedBody.end_time)) validation = false

  const hexColorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/
  if(!hexColorRegex.test(validatedBody.color)) validation = false

  if(!ISODateRegex.test(validatedBody.reminder)) validation = false

  const allowedTypes = ["event", "class"]
  if(!allowedTypes.includes(validatedBody.type)) validation = false
  //End of validation--------------------------------------------------------------------------------------------
  
  
  if(validation) {
    
    console.log("Event is patched to the server")
    const config = {headers: {Authorization: token}}
    axios.patch("http://localhost:3001/api/events/"+id, body, config)
  } else {
    console.error("Event is not in correct format: ", validatedBody)
  }
}