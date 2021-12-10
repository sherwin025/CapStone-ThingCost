import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { ItemContext } from "./ListProvider";


export const ShoppingList = () => {
    const { items, getItems, getItemById, deleteItem, updateItem, getNotes, notes, deleteNote } = useContext(ItemContext)
    const history = useHistory()



    useEffect(() => {
        getItems()
        .then(getNotes)
    }, [])

    const notpurchasedwants = () => {
        const notpurchases = items.filter(each => { return each.purchased === false })
        const mynotpurchased = notpurchases.filter(each => { return each.userId === parseInt(localStorage.getItem("ThingCost_customer")) })
        const notmypurchaseswants = mynotpurchased.filter(each=>{return each.need === false})
        return notmypurchaseswants
    }
    const notpurchasedneeds = () => {
        const notpurchases = items.filter(each => { return each.purchased === false })
        const mynotpurchased = notpurchases.filter(each => { return each.userId === parseInt(localStorage.getItem("ThingCost_customer")) })
        const notmypurchasesneeds = mynotpurchased.filter(each=>{return each.need === true})
        return notmypurchasesneeds
    }

    const redirect = (id) => {
        return history.push(`/shoppinglist/${parseInt(id)}`)
    }

    const deletetheItem = (itemId) => {
        const deleteNotes = notes.filter((each) => each.userItemsId === parseInt(itemId))
        deleteNotes.forEach(element => {
            deleteNote(element.id)
        });
        return deleteItem(parseInt(itemId))
            .then(getItems())
    }

    const updatetheItem = (id) => {
        getItemById(id)
            .then((res) => {
                const copy = { ...res }
                copy.purchased = true
                updateItem(copy)
            })
    }

    return (
        <>
        <div className="wants">
            Wants: 
            {
                notpurchasedwants().map(each => <div key={each.id}>
                    <div>{each.name}</div>
                    <div>Work Hours: {each.hoursNeeded.toFixed(2)}</div>
                    <div>
                        <button type="button" onClick={() => updatetheItem(each.id)}>Purchased</button>
                        <button onClick={() => {redirect(each.id)}}>Edit</button>
                        <button type="button" onClick={() => deletetheItem(each.id)}>Delete</button>
                    </div>
                </div>)
            }
        </div>
        <div className="needs">
            Needs: 
            {
                notpurchasedneeds().map(each => <div key={each.id}>
                    <div>{each.name}</div>
                    <div>Work Hours: {each.hoursNeeded.toFixed(2)}</div>
                    <div>
                        <button type="button" onClick={() => updatetheItem(each.id)}>Purchased</button>
                        <button onClick={() => {redirect(each.id)}}>Edit</button>
                        <button type="button" onClick={() => deletetheItem(each.id)}>Delete</button>
                    </div>
                </div>)
            }
        </div>
        </>
    )
}