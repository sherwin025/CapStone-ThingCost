import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ItemContext } from "./ListProvider";
import "./itemlist.css"
import "./ItemDetail.css"

export const ShoppingList = () => {
    const { items, getItems, getItemById, deleteItem, updateItem, getNotes, notes, deleteNote } = useContext(ItemContext)
    const history = useHistory()
    const [note, triggernote] = useState(false)
    const [theitemid, settheitemid] = useState(0)



    useEffect(() => {
        getItems()
            .then(getNotes)
    }, [])

    const notpurchasedwants = () => {
        const notpurchases = items.filter(each => { return each.purchased === false })
        const mynotpurchased = notpurchases.filter(each => { return each.userId === parseInt(localStorage.getItem("ThingCost_customer")) })
        const notmypurchaseswants = mynotpurchased.filter(each => { return each.need === false })
        return notmypurchaseswants
    }
    const notpurchasedneeds = () => {
        const notpurchases = items.filter(each => { return each.purchased === false })
        const mynotpurchased = notpurchases.filter(each => { return each.userId === parseInt(localStorage.getItem("ThingCost_customer")) })
        const notmypurchasesneeds = mynotpurchased.filter(each => { return each.need === true })
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
            .then(getItems())
    }

    const triggerthenotes = (id) => {
        note ? triggernote(false) : triggernote(true)
        settheitemid(id)
    }

    const Popup = (props) => {
        return (<>
            {
                props.trigger ?
                    <div className="popup">
                        <div className="popup-inner">Item Notes:
                            {
                                notes.map((note) => {
                                    if (note.userItemsId === props.id) {
                                        return <li key={note.id}> {note.description} </li>
                                    }
                                })
                            }
                        </div>

                        <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                    </div> : ""
            }
        </>)
    }

    return (
        <><div className="pagetitle">Shopping List</div>
            <div className="list">
                <div className="needs">
                    <div className="title header">Needs:</div>
                    {
                        notpurchasedneeds().map(each => <div className={each.buydifficultyId === 3 ? "indItem hard" : each.buydifficultyId === 2 ? "indItem med" : each.buydifficultyId === 1 ? "indItem easy" : " indItem"} key={each.id}>
                            <div>{each.purchaseby ? <div>Needed By: {each.purchaseby}</div> : ""} </div>
                            <div className="itemname">{each.name}</div>
                            <div className="workhours">Work Hours: {each.hoursNeeded.toFixed(2)}</div>
                            <div className="buttons">
                                <button className="action-buttondetail buttonsmall" type="button" onClick={() => updatetheItem(each.id)}>Purchased</button>
                                <button className="action-buttondetail buttonsmall" onClick={() => { redirect(each.id) }}>Edit</button>
                                <button className="action-buttondetail buttonsmall" type="button" onClick={() => deletetheItem(each.id)}>Delete</button>
                            </div>
                            <div className="flexnote"><div className="difficultid">Buy Difficulty: {each.buydifficultyId ? `${each.buydifficultyId}` : "not rated"}
                            </div>
                                <button className=" notebutton" onClick={() => { triggerthenotes(parseInt(each.id)) }}>notes</button>
                            </div>
                        </div>)
                    }
                </div>
                <div className="wants">
                    <div className="title header">Wants:</div>
                    {
                        notpurchasedwants().map(each => <div className={each.buydifficultyId === 3 ? "indItem hard" : each.buydifficultyId === 2 ? "indItem med" : each.buydifficultyId === 1 ? "indItem easy" : " indItem"} key={each.id}>
                            <div>{each.purchaseby ? <div>Wanted By: {each.purchaseby}</div> : ""} </div>
                            <div className="itemname">{each.name}</div>
                            <div className="workhours">Work Hours: {each.hoursNeeded.toFixed(2)}</div>
                            <div className="buttons">
                                <button className="action-buttondetail buttonsmall" type="button" onClick={() => updatetheItem(each.id)}>Purchased</button>
                                <button className="action-buttondetail buttonsmall" onClick={() => { redirect(each.id) }}>Edit</button>
                                <button className="action-buttondetail buttonsmall" type="button" onClick={() => deletetheItem(each.id)}>Delete</button>
                            </div>
                            <div className="flexnote"><div className="difficultid">Buy Difficulty: {each.buydifficultyId ? `${each.buydifficultyId}` : "not rated"}
                            </div>
                                <button className=" notebutton" onClick={() => { triggerthenotes(parseInt(each.id)) }}>notes</button>
                            </div>
                        </div>)
                    }
                </div>
                {
                    <Popup id={theitemid} setTrigger={triggernote} trigger={note} />
                }
            </div>
        </>
    )
}