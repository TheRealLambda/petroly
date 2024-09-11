import axios from "axios";
import { getToken } from "./token";

export async function getTasksLists() {
  const config = {headers: {Authorization: getToken()}}
  return await axios.get("http://localhost:3001/api/tasks-lists", config)
}

export async function getTasksList(id) {
  const config = {headers: {Authorization: getToken()}}
  return await axios.get("http://localhost:3001/api/tasks-lists/"+id, config)
}

export async function postTasksList(body) {
  const config = {headers: {Authorization: getToken()}}
  return await axios.post("http://localhost:3001/api/tasks-lists", body, config)
}