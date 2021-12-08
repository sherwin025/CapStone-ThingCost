import React, { createContext, useState } from "react";

export const ItemContext = createContext()

export const ItemProvider = (props) => {
    const [items, setitems] = useState([])
    const [notes, setnotes] = useState([])

    const getItems = () => {
        return fetch("http://localhost:8088/useritems")
            .then(res => res.json())
            .then(setitems)
    }

    const getNotes= () => {
        return fetch("http://localhost:8088/useritemsnotes")
            .then(res => res.json())
            .then(setnotes)
    }

    const addItem = itemObj => {
        return fetch("http://localhost:8088/useritems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemObj)
        })
            .then(res => res.json())
            .then(setitems)
    }

    const getItemById = id => {
        const theId = parseInt(id)
        return fetch(`http://localhost:8088/useritems/${theId}`)
                .then(res => res.json())
    }

    const getNotesById = id => {
        const theId = parseInt(id)
        return fetch(`http://localhost:8088/useritemsnotes/${theId}`)
                .then(res => res.json())
    }

    const deleteItem = itemId => {
        return fetch(`http://localhost:8088/useritems/${itemId}`, {
            method: "DELETE"
        })
            .then(getItems)
    }

    const deleteNote = noteId => {
        return fetch(`http://localhost:8088/useritemsnotes/${noteId}`, {
            method: "DELETE"
        })
    }

    const addNote = itemObj => {
        return fetch("http://localhost:8088/useritemsnotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemObj)
        })
            .then(res => res.json())
    }

    const updateNote = item => {
        return fetch(`http://localhost:8088/useritemsnotes/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(res=>res.json())
            .then(getNotes)
    }

    const updateItem = item => {
        return fetch(`http://localhost:8088/useritems/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(res=>res.json())
            .then(getItems)
    }

    return (
        <ItemContext.Provider value={{
            items, getItems, addItem, getItemById, deleteItem, updateItem, getNotes, notes, deleteNote, addNote, getNotesById, updateNote
        }}>
            {props.children}
        </ItemContext.Provider>
    )
}