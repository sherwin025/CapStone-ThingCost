import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { ItemContext } from "./ListProvider";


export const PurchasedList = () => {
    const { items, getItems, deleteItem, getNotes, notes, deleteNote } = useContext(ItemContext)
    const history = useHistory()


    useEffect(() => {
        getItems()
            .then(getNotes)

    }, [])

    const purchasedwants = () => {
        const notpurchases = items.filter(each => { return each.purchased === true })
        const mynotpurchased = notpurchases.filter(each => { return each.userId === parseInt(localStorage.getItem("ThingCost_customer")) })
        const notmypurchaseswants = mynotpurchased.filter(each => { return each.need === false })
        return notmypurchaseswants
    }
    const purchasedneeds = () => {
        const notpurchases = items.filter(each => { return each.purchased === true })
        const mynotpurchased = notpurchases.filter(each => { return each.userId === parseInt(localStorage.getItem("ThingCost_customer")) })
        const notmypurchasesneeds = mynotpurchased.filter(each => { return each.need === true })
        return notmypurchasesneeds
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
            .then(getItems())
    }

    return (
        <>
            <div>
                Wants:
                {
                    purchasedwants().map(each => <div key={each.id}>
                        <div>{each.name}</div>
                        <div>Work Hours: {each.hoursNeeded.toFixed(2)}</div>
                        <div>
                            <button onClick={() => {
                                redirect(each.id)
                            }}>Edit</button>
                            <button type="button" onClick={() => deletetheItem(each.id)}>Delete</button>
                        </div>
                    </div>)
                }
                Needs:
                {
                    purchasedneeds().map(each => <div key={each.id}>
                        <div>{each.name}</div>
                        <div>Work Hours: {each.hoursNeeded.toFixed(2)}</div>
                        <div>
                            <button onClick={() => {
                                redirect(each.id)
                            }}>Edit</button>
                            <button type="button" onClick={() => deletetheItem(each.id)}>Delete</button>
                        </div>
                    </div>)
                }

            </div>

        </>
    )
}