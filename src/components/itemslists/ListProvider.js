import react, { createContext, useState } from "react";

export const ItemContext = createContext()

export const ItemProvider = (props) => {
    const [items, setitems] = useState([])

    const getItems = () => {
        return fetch("http://localhost:8088/useritems")
            .then(res => res.json())
            .then(setitems)
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

    const deleteItem = itemId => {
        return fetch(`http://localhost:8088/useritems/${itemId}`, {
            method: "DELETE"
        })
            .then(setitems)
    }

    const updateItem = item => {
        return fetch(`http://localhost:8088/useritems/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(getItems)
    }

    return (
        <ItemContext.Provider value={{
            items, getItems, addItem, getItemById, deleteItem, updateItem
        }}>
            {props.children}
        </ItemContext.Provider>
    )
}