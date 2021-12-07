import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ItemContext } from "./ListProvider";

export const PurchasedList = () => {
    const { items, getItems, addItem, getItemById, deleteItem, updateItem, getNotes, notes, deleteNote } = useContext(ItemContext)
const history = useHistory()

    useEffect(() => {
        getItems()
        .then(getNotes)
    }, [])

    const purchasedItems = () => {
        const purchases = items?.filter(each=>{return each.purchased === true })
        const mypurchased = purchases.filter(each=>{return each.userId === parseInt(localStorage.getItem("ThingCost_customer")) })
        return mypurchased
    }

    const redirect = (id) => {
        return history.push(`./shoppinglist/${parseInt(id)}`)
    }

    const deletetheItem = (itemId) => {
        const deleteNotes = notes.filter((each)=> each.userItemsId === parseInt(itemId))
        deleteNotes.forEach(element => {
            deleteNote(element.id)
        });
        
        return deleteItem(parseInt(itemId))
        .then(history.push("./"))
    }

    return (
        <>
            {
                purchasedItems().map(each => <div key={each.id}>
                    <div>{each.name}</div>
                    <div>
                    <button onClick={()=>{
                            redirect(each.id)
                        }}>Edit</button>
                        <button  type="button" onClick={()=>deletetheItem(each.id)}>Delete</button>
                    </div>
                </div>)
            }
        </>
    )
}