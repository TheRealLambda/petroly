import axios from "axios";
import { getToken } from "./token";

export async function getActiveCourses() {
  const config = {headers: {Authorization: getToken()}}
  return await axios.get("http://localhost:3001/api/active-courses", config)
}

export async function postActiveCourse(body) {
  const config = {headers: {Authorization: getToken()}}
  return await axios.post("http://localhost:3001/api/active-courses", body, config)
}

export async function deleteActiveCourse(id) {
  const config = {headers: {Authorization: getToken()}}
  return await axios.delete("http://localhost:3001/api/active-courses/"+id, config)
}

export async function searchCourses(term, department) {
  const config = {headers: {Authorization: getToken()}}
  return await axios.get("http://localhost:3001/api/courses?term="+term+"&department="+encodeURIComponent(department), config)
}