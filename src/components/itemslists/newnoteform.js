import { useContext } from "react"
import { useHistory, useParams } from "react-router"
import { useState } from "react/cjs/react.development"
import { ItemContext } from "./ListProvider"

export const NoteForm = () => {
    const [note, setnote] = useState({})
    const {ItemnoteId} = useParams()
    const {addNote} = useContext(ItemContext)
    const history = useHistory()

    const handlestate = (event)=> {
        const copy = {...note}
        copy[event.target.id] = event.target.value
        setnote(copy)
    }

    const saveNote = () => {
        const copy = {
            description: note.description,
            userItemsId: parseInt(ItemnoteId)
        }

        addNote(copy)
        .then(history.push(`/shoppinglist/${ItemnoteId}`))

    }
    return <>
                <form>
                <label htmlFor="description">Note:
                    <input type="text"
                        placeholder="Enter note"
                        id="description"
                        onChange={handlestate}
                    ></input>
                </label>
                <button type="button" 
                onClick={saveNote}>Save Note</button>
            </form>
    </>
}