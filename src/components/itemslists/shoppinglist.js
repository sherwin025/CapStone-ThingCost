import { useContext, useEffect, useState } from "react";
import { ItemContext } from "./ListProvider";

export const ShoppingList = () => {
    const {items, getItems, addItem, getItemById, deleteItem} = useContext(ItemContext)

    useEffect(() => {
        getItems()
    }, [])

    const notpurchased = () => {
        const purchases = items.filter(each=>{return each.purchased === false })
        return purchases
    }
    return (
        <>
            {
                notpurchased().map(each=> <div key={each.id}>{each.name}</div>)
            }
        </>
    )
}