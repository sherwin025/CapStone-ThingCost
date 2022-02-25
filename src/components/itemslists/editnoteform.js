import { useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { useState } from "react/cjs/react.development"
import { ItemContext } from "./ListProvider"
import "./ItemDetail.css"
export const EditNoteForm = () => {
    const [note, setnote] = useState({})
    const { editnoteId } = useParams()
    const history = useHistory()
    const { getNotesById, updateNote } = useContext(ItemContext)

    useEffect(() => {
        getNotesById(editnoteId)
            .then(setnote)
    }, [editnoteId])

    const handlestate = (event) => {
        const copy = { ...note }
        copy[event.target.id] = event.target.value
        setnote(copy)
    }

    const saveNote = () => {
        const copy = {
            id: note.id,
            description: note.description,
            item: parseInt(note.item)
        }

        updateNote(copy)
            .then(history.push(`/shoppinglist/${note.item}`))

    }
    return <>
        <form className="detail-form">
            <label htmlFor="description" className="detail input-label" >Note:
                <input
                    className="input-field"
                    type="text"
                    id="description"
                    onChange={handlestate}
                    defaultValue={note.description}
                ></input>
            </label>
            <button className="action-buttondetail buttonmedium" type="button"
                onClick={saveNote}>Save Note</button>
        </form>
    </>
}