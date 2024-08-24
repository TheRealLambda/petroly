import axios from "axios";

let token

export function setToken(newToken) {
  token = `Bearer ${newToken}`
}

export async function postEvent(body) {
  const validatedBody = {title: body.title, start_time: body.start_time, end_time: body.end_time,
                        color: body.color, reminder: body.reminder, activities: body.activities,
                        tasks: body.tasks, type: body.type}
  //Validation
  let validation = true
  if(validatedBody.title===undefined || typeof validatedBody.title !== "string") validation = false
  if(validatedBody.start_time===undefined || typeof validatedBody.start_time !== "string") validation = false
  if(validatedBody.end_time===undefined || typeof validatedBody.end_time !== "string") validation = false
  if(validatedBody.color===undefined || typeof validatedBody.color !== "string") validation = false
  if(validatedBody.reminder===undefined || typeof validatedBody.reminder !== "string") validation = false
  if(validatedBody.activities===undefined || typeof validatedBody.activities !== "object") validation = false
  if(validatedBody.tasks===undefined || typeof validatedBody.tasks !== "object") validation = false
  if(validatedBody.type===undefined || typeof validatedBody.type !== "string") validation = false

  if(validatedBody.title.length < 1) validatedBody.title = "(no title)"

  const config = {headers: {Authorization: token}}
  return await axios.post("http://localhost:3001/api/events/", body, config)
} 

export function patchEvent() {

}