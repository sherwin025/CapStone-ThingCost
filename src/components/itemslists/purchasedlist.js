import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ItemContext } from "./ListProvider";
import "./itemlist.css"
import "./ItemDetail.css"

export const PurchasedList = () => {
    const { items, getItems, deleteItem, getNotes, notes, deleteNote } = useContext(ItemContext)
    const history = useHistory()
    const [note, triggernote] = useState(false)
    const [theitemid, settheitemid] = useState(0)


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

    const triggerthenotes = (id) => {
        note ? triggernote(false) : triggernote(true)
        settheitemid(id)
    }

    const Popup = (props) => {
        return (<>
            {
                props.trigger ?
                    <div className="popup">

                        <div className="popup-inner">
                            <div className="div1">
                                <div><button className="close-btn" onClick={() => props.setTrigger(false)}>close</button></div>
                                <div className="div2">Item Notes:
                                    {
                                        notes.map((note) => {
                                            if (note.userItemsId === props.id) {
                                                return <li key={note.id}> {note.description} </li>
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
        </>)
    }
    return (
        <><div className="pagetitle">Purchased List</div>
            <div className="list">
                <div className="needs">
                    <div className="title header">Needs:</div>
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
                        purchasedwants().map(each => <div className={each.buydifficultyId === 3 ? "indItem hard" : each.buydifficultyId === 2 ? "indItem med" : each.buydifficultyId === 1 ? "indItem easy" : " indItem"} key={each.id}>
                            <div className="itemname">{each.name}</div>
                            <div className="workhours">Work Hours: {each.hoursNeeded.toFixed(2)}</div>
                            <div className="buttons">
                                <button className="action-buttondetail buttonsmall" onClick={() => {
                                    redirect(each.id)
                                }}>Edit</button>
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