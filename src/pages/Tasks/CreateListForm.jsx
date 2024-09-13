import { useState } from "react"
import "./styles/create_list_form.css"
import { postTasksList } from "../../services/tasksLists"

export default function CreateListForm({ closeForm, updateTasksLists }) {

  const [listName, setListName] = useState(null)

  const handleList = async (e) => {
    e.preventDefault()
    const result = await postTasksList({name: listName})
    updateTasksLists(result.data)
    console.log(result.data);
  }
  return (
    <div className="create_list_form bgcolor-BG">
      <button onClick={closeForm}>close</button>
      <form onSubmit={handleList}>
        Create List
        name<input type="text" onChange={(e)=>setListName(e.target.value)} value={listName} />
      </form>
    </div>
  )
}