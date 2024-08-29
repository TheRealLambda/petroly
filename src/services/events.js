import axios from "axios";

import { getToken } from "./token";

export async function getEvents(week, period) {

  if(Number.isFinite(week) && Number.isFinite(period)) {
    console.log("Events are being retrieved from the server");
    const config = {headers: {Authorization: getToken()}}
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
  let errors = []
  if(validatedBody.title===undefined || typeof validatedBody.title !== "string") errors.push(1)
  if(validatedBody.start_time===undefined || typeof validatedBody.start_time !== "string") errors.push(2)
  if(validatedBody.end_time===undefined || typeof validatedBody.end_time !== "string") errors.push(3)
  if(validatedBody.color===undefined || typeof validatedBody.color !== "string") errors.push(4)
  if(validatedBody.reminder!==null && validatedBody.reminder !== null && (validatedBody.reminder===undefined || typeof validatedBody.reminder !== "string")) errors.push(5)
  if(validatedBody.activities===undefined || !Array.isArray(validatedBody.activities)) errors.push(6)
  if(validatedBody.tasks===undefined || !Array.isArray(validatedBody.tasks)) errors.push(7)
  if(validatedBody.type===undefined || typeof validatedBody.type !== "string") errors.push(8)

  if(validatedBody.title.length < 1) validatedBody.title = "(no title)"

  const ISODateRegex = /^20\d{2}-(?!00|1[3-9]|[2-9][0-9])\d{2}-(?!00|3[2-9]|[4-9])\d{2}T(?!2[4-9]|[3-9])\d{2}:(?![6-9])\d{2}:(?![6-9])\d{2}.\d{3}Z$/
  if(!ISODateRegex.test(validatedBody.start_time) || !ISODateRegex.test(validatedBody.end_time)) errors.push(9)
  
  const hexColorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/
  if(!hexColorRegex.test(validatedBody.color)) errors.push(10)
  
  if(validatedBody.reminder && !ISODateRegex.test(validatedBody.reminder)) errors.push(11)

  const allowedTypes = ["event", "class"]
  if(!allowedTypes.includes(validatedBody.type)) errors.push(12)
  //End of validation--------------------------------------------------------------------------------------------
  
  console.log("errors:", errors);

  if(errors.length === 0) {
    console.log("Event is posted to the server")
    const config = {headers: {Authorization: getToken()}}
    return await axios.post("http://localhost:3001/api/events/", validatedBody, config)
  } else {
    console.error(errors, "Event is not in correct format: ", validatedBody)
  }
} 

export async function patchEvent(id, body) {
  const validatedBody = {title: body.title, start_time: body.start_time, end_time: body.end_time,
    color: body.color, reminder: body.reminder, activities: body.activities,
    tasks: body.tasks, type: body.type}


  //Validation---------------------------------------------------------------------------------------------------
  let errors = []
  if(validatedBody.title===undefined || typeof validatedBody.title !== "string") errors.push(1)
  if(validatedBody.start_time===undefined || typeof validatedBody.start_time !== "string") errors.push(2)
  if(validatedBody.end_time===undefined || typeof validatedBody.end_time !== "string") errors.push(3)
  if(validatedBody.color===undefined || typeof validatedBody.color !== "string") errors.push(4)
  if(validatedBody.reminder!==null && validatedBody.reminder !== null && (validatedBody.reminder===undefined || typeof validatedBody.reminder !== "string")) errors.push(5)
  if(validatedBody.activities===undefined || !Array.isArray(validatedBody.activities)) errors.push(6)
  if(validatedBody.tasks===undefined || !Array.isArray(validatedBody.tasks)) errors.push(7)
  if(validatedBody.type===undefined || typeof validatedBody.type !== "string") errors.push(8)

  if(validatedBody.title.length < 1) validatedBody.title = "(no title)"

  const ISODateRegex = /^20\d{2}-(?!00|1[3-9]|[2-9][0-9])\d{2}-(?!00|3[2-9]|[4-9])\d{2}T(?!2[4-9]|[3-9])\d{2}:(?![6-9])\d{2}:(?![6-9])\d{2}.\d{3}Z$/
  if(!ISODateRegex.test(validatedBody.start_time) || !ISODateRegex.test(validatedBody.end_time)) errors.push(9)
  
  const hexColorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/
  if(!hexColorRegex.test(validatedBody.color)) errors.push(10)
  
  if(validatedBody.reminder && !ISODateRegex.test(validatedBody.reminder)) errors.push(11)

  const allowedTypes = ["event", "class"]
  if(!allowedTypes.includes(validatedBody.type)) errors.push(12)
  //End of validation--------------------------------------------------------------------------------------------
  
  console.log("errors:", errors);
  if(errors.length === 0) {
    console.log("Event is patched to the server")
    const config = {headers: {Authorization: getToken()}}
    return await axios.patch("http://localhost:3001/api/events/"+id, body, config)
  } else {
    console.error(errors, "Event is not in correct format: ", validatedBody)
  }
}