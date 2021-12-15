import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { ItemContext } from "./ListProvider";
import "./itemlist.css"
import "./ItemDetail.css"

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
        return history.push(`./purchasedlist/${parseInt(id)}`)
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
        <><div className="pagetitle">Purchased List</div>
            <div className="list">
            <div className="needs">
                    <div class="title">Needs:</div>
                    {
                        purchasedneeds().map(each => <div className={each.buydifficultyId === 3 ? "indItem hard" : each.buydifficultyId === 2 ? "indItem med" : each.buydifficultyId === 1 ? "indItem easy" : " indItem"} key={each.id}>
                            <div className="itemname">{each.name}</div>
                            <div className="workhours">Work Hours: {each.hoursNeeded.toFixed(2)}</div>
                            <div className="buttons">
                                <button className="action-buttondetail buttonsmall" onClick={() => {
                                    redirect(each.id)
                                }}>Edit</button>
                                <button className="action-buttondetail buttonsmall" type="button" onClick={() => deletetheItem(each.id)}>Delete</button>
                            </div>
                            <div className="difficultid">Buy Difficulty: {each.buydifficultyId ? `${each.buydifficultyId}` : "not rated"} </div>
                        </div>)
                    }
                </div>
                <div className="wants">
                    <div class="title">Wants:</div>
                    {
                        purchasedwants().map(each => <div className={each.buydifficultyId === 3 ? "indItem hard" : each.buydifficultyId === 2 ? "indItem med" : each.buydifficultyId === 1 ? "indItem easy" : " indItem"} key={each.id}>
                            <div className="itemname">{each.name}</div>
                            <div className="workhours">Work Hours: {each.hoursNeeded.toFixed(2)}</div>
                            <div className="buttons">
                                <button  className="action-buttondetail buttonsmall" onClick={() => {
                                    redirect(each.id)
                                }}>Edit</button>
                                <button className="action-buttondetail buttonsmall"type="button" onClick={() => deletetheItem(each.id)}>Delete</button>
                            </div>
                            <div className="difficultid">Buy Difficulty: {each.buydifficultyId ? `${each.buydifficultyId}` : "not rated"} </div>
                        </div>)
                    }
                </div>
            </div>

        </>
    )
}