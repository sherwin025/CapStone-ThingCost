import { useContext } from "react"
import { useHistory, useParams } from "react-router"
import { useState } from "react/cjs/react.development"
import { ItemContext } from "./ListProvider"
import "./ItemDetail.css"

export const NoteForm = () => {
    const [note, setnote] = useState({})
    const { ItemnoteId } = useParams()
    const { addNote } = useContext(ItemContext)
    const history = useHistory()

    const handlestate = (event) => {
        const copy = { ...note }
        copy[event.target.id] = event.target.value
        setnote(copy)
    }

    const saveNote = () => {
        const copy = {
            description: note.description,
            item: parseInt(ItemnoteId)
        }

        addNote(copy)
            .then(history.push(`/shoppinglist/${ItemnoteId}`))

    }
    return <>
        <form className="detail-form">
            <label className="detail input-label" htmlFor="description">Note:
                <input type="text"
                    className="input-field"
                    placeholder="Enter note"
                    id="description"
                    onChange={handlestate}
                ></input>
            </label>
            <button className="action-buttondetail buttonmedium" type="button"
                onClick={saveNote}>Save Note</button>
        </form>
    </>
}