import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ItemContext } from "./ListProvider";

export const ShoppingList = () => {
    const { items, getItems, addItem, getItemById, deleteItem, updateItem, getNotes, notes, deleteNote } = useContext(ItemContext)
    const history = useHistory()
    const [purchaseditem, setpurchaseditem] = useState({})


    useEffect(() => {
        getItems()
    }, [])

    const notpurchased = () => {

        const notpurchases = items.filter(each => { return each.purchased === false })
        const mynotpurchased = notpurchases.filter(each => { return each.userId === parseInt(localStorage.getItem("ThingCost_customer")) })
        return mynotpurchased

    }

    const redirect = (id) => {
        return history.push(`./shoppinglist/${parseInt(id)}`)
    }

    const deletetheItem = (itemId) => {
        const deleteNotes = notes.filter((each) => each.userItemsId === parseInt(itemId))
        deleteNotes.forEach(element => {
            deleteNote(element.id)
        });

        return deleteItem(parseInt(itemId))
            .then(history.push("./"))
    }

    const updatetheItem = (id) => {

        getItemById(id)
            .then(res => setpurchaseditem(res))
            .then(() => {
                const copy = { ...purchaseditem }
                copy.purchased = true
                updateItem(copy)
            })
    }

    return (
        <>
            {
                notpurchased().map(each => <div key={each.id}>
                    <div>{each.name}</div>
                    <div>
                        <button type="button" onClick={() => updatetheItem(each.id)}>Purchased</button>
                        <button onClick={() => {
                            redirect(each.id)
                        }}>Edit</button>
                        <button type="button" onClick={() => deletetheItem(each.id)}>Delete</button>
                    </div>
                </div>)
            }
        </>
    )
}