import { useContext, useEffect, useState } from "react";
import { ItemContext } from "./ListProvider";

export const PurchasedList = () => {
    const {items, getItems, addItem, getItemById, deleteItem} = useContext(ItemContext)

    useEffect(() => {
        getItems()
    }, [])

    const purchasedItems = () => {
        const purchases = items.filter(each=>{return each.purchased === true })
        return purchases
    }
    return (
        <>
            {
                purchasedItems().map(each=> <div key={each.id}>{each.name}</div>)
            }
        </>
    )
}