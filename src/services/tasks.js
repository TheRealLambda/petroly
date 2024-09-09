import axios from "axios";
import { getToken } from "./token";

export async function getTasks() {
  const config = {headers: {Authorization: getToken()}}
  return await axios.get("http://localhost:3001/api/tasks", config)
}

export async function postTask(body) {
  const config = {headers: {Authorization: getToken()}}
  return await axios.post("http://localhost:3001/api/tasks", body, config)
}

export async function patchTask(body, id) {
  const config = {headers: {Authorization: getToken()}}
  return await axios.patch("http://localhost:3001/api/tasks/"+id, body, config)
}

// export async function deleteActiveCourse(id) {
//   const config = {headers: {Authorization: getToken()}}
//   return await axios.delete("http://localhost:3001/api/active-courses/"+id, config)
// }

// export async function searchCourses(term, department) {
//   const config = {headers: {Authorization: getToken()}}
//   return await axios.get("http://localhost:3001/api/courses?term="+term+"&department="+encodeURIComponent(department), config)
// }