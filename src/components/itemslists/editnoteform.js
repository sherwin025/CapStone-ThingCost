import { useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { useState } from "react/cjs/react.development"
import { ItemContext } from "./ListProvider"

export const EditNoteForm = () => {
    const [note, setnote] = useState({})
    const {editnoteId} = useParams()
    const history = useHistory()
    const {getNotesById, updateNote} = useContext(ItemContext)

    useEffect(()=>{
        getNotesById(editnoteId)
        .then(setnote)
    },[editnoteId])
    
    const handlestate = (event)=> {
        const copy = {...note}
        copy[event.target.id] = event.target.value
        setnote(copy)
    }

    const saveNote = () => {
        const copy = {
            id: note.id,
            description: note.description,
            userItemsId: parseInt(note.userItemsId)
        }

        updateNote(copy)
        .then(history.push(`/shoppinglist/${note.userItemsId}`))

    }
    return <>
                <form>
                <label htmlFor="description">Note:
                    <input type="text"
                        id="description"
                        onChange={handlestate}
                        defaultValue={note.description}
                    ></input>
                </label>
                <button type="button" 
                onClick={saveNote}>Save Note</button>
            </form>
    </>
}