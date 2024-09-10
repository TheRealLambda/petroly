import { useState } from "react"
import { postTasksCollection } from "../../services/tasksCollections"
import "./styles/create_collection_form.css"

export default function CreateCollectionForm({ updateCollections, closeForm }) {

  const [collectionName, setCollectionName] = useState(null)

  const handleCollection = async (e) => {
    e.preventDefault()
    const result = await postTasksCollection({name: collectionName})
    console.log(result.data);
    updateCollections(result.data)
  }

  return (
    <div className="create_collection_form bgcolor-BG">
      <button onClick={closeForm}>close</button>
      <form onSubmit={handleCollection}>
        Create Collection
        name<input type="text" onChange={(e)=>setCollectionName(e.target.value)} value={collectionName} />
      </form>
    </div>
  )
}