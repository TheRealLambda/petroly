import axios from "axios";

let token

export function setToken(newToken) {
  token = `Bearer ${newToken}`
}

export async function postEvent(body) {
  const config = {headers: {Authorization: token}}
  return await axios.post("http://localhost:3001/api/events/", body, config)
} 

export function patchEvent() {

}