import React, { createContext, useState } from "react";

export const ItemContext = createContext()

export const ItemProvider = (props) => {
    const [items, setitems] = useState([])
    const [notes, setnotes] = useState([])

    const getItems = () => {
        return fetch("http://localhost:8000/items", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(setitems)
    }

    const getNotes= () => {
        return fetch("http://localhost:8000/usernotes", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(setnotes)
    }

    const addItem = itemObj => {
        return fetch("http://localhost:8000/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(itemObj)
        })
            .then(res => res.json())
            .then(setitems)
    }

    const getItemById = id => {
        const theId = parseInt(id)
        return fetch(`http://localhost:8000/items/${theId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
                .then(res => res.json())
    }

    const getNotesById = id => {
        const theId = parseInt(id)
        return fetch(`http://localhost:8000/usernotes/${theId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
                .then(res => res.json())
    }

    const deleteItem = itemId => {
        return fetch(`http://localhost:8000/items/${itemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(getItems)
    }

    const deleteNote = noteId => {
        return fetch(`http://localhost:8000/usernotes/${noteId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
    }

    const addNote = itemObj => {
        return fetch("http://localhost:8000/usernotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(itemObj)
        })
            .then(res => res.json())
    }

    const updateNote = item => {
        return fetch(`http://localhost:8000/usernotes/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(item)
        })
            .then(res=>res.json())
            .then(getNotes)
    }

    const updateItem = item => {
        return fetch(`http://localhost:8000/items/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(item)
        })
    }

    return (
        <ItemContext.Provider value={{
            items, getItems, addItem, getItemById, deleteItem, updateItem, getNotes, notes, deleteNote, addNote, getNotesById, updateNote
        }}>
            {props.children}
        </ItemContext.Provider>
    )
}