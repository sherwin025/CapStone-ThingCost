import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { ItemContext } from "./ListProvider"
import { UserItemContext } from "../Analyze/FormProvider"
import { Link } from "react-router-dom"
import "./ItemDetail.css"

export const ItemDetail = () => {
    const { itemId } = useParams()
    const { getItemById, deleteItem, updateItem, getNotes, notes, deleteNote } = useContext(ItemContext)
    const { useritemtypes, getallusertypes, difficultys, getalldifficulties } = useContext(UserItemContext)
    const [theItem, setItem] = useState({})
    const [user, setuser] = useState({})
    const history = useHistory()

    useEffect(() => {
        getItemById(parseInt(itemId))
            .then(res => setItem(res))
            .then(getallusertypes(localStorage.getItem("ThingCost_customer")))
            .then(getalldifficulties)
            .then(getNotes)
            .then(() => {
                getUsersById(parseInt(localStorage.getItem("ThingCost_customer")))
                    .then(res => setuser(res))
            })
    }, [itemId])



    const handlestate = (event) => {
        const copy = { ...theItem }
        copy[event.target.id] = event.target.value
        setItem(copy)
    }

    const purchased = (event) => {
        const copy = { ...theItem }
        if (theItem[event.target.id] === false) {
            copy[event.target.id] = true
        } else {
            copy[event.target.id] = false
        }
        setItem(copy)
    }

    const UpdateItem = (event) => {
        const copy = {
            id: theItem.id,
            useritemtypeId: parseInt(theItem.useritemtypeId),
            price: parseInt(theItem.price),
            name: theItem.name,
            need: theItem.need,
            userId: parseInt(localStorage.getItem("ThingCost_customer")),
            hoursNeeded: theItem.hoursNeeded,
            buydifficultyId: parseInt(theItem.buydifficultyId),
            purchased: theItem.purchased,
            purchaseby: theItem.purchaseby
        }
        return updateItem(copy)
            .then(history.push("./"))
    }

    const deletetheItem = (event) => {
        const deleteNotes = notes.filter((each) => each.userItemsId === parseInt(itemId))
        deleteNotes.forEach(element => {
            deleteNote(element.id)
        });

        return deleteItem(parseInt(itemId))
            .then(history.goBack())


    }

    const redirect = () => {
        return history.push(`../newnote/${parseInt(itemId)}`)
    }

    const removenote = (event) => {
        return deleteNote(event.target.id)
            .then(getNotes)
    }

    const editnote = (event) => {
        return history.push(`../editnote/${event.target.id}`)
    }


    return (
        <><div className="details">
            <form className="detail-form theform">
                <label
                    className="detail input-label header"
                    htmlFor="description">Item Description:
                    <input className="input-field" type="text"
                        placeholder="short description/name"
                        id="name"
                        onChange={handlestate}
                        defaultValue={theItem.name}
                    ></input>
                </label>
                <div className="costAnalysis input-field">
                    <p>This item will cost you {(each.price / user.hourlySalary).toFixed(2)} hours of work!</p>
                </div>
                <label className="detail input-label" htmlFor="buydifficulty"> How difficult will this be to purchase?:
                    <select className="input-field" name="category"
                        onChange={handlestate}
                        id="buydifficultyId">
                        <option value="0">Difficulty</option>
                        {
                            difficultys.map(type => {
                                if (theItem.buydifficultyId === type.id) {
                                    return <option key={type.id} value={type.id} selected>{type.description}</option>
                                } else {
                                    return <option key={type.id} value={type.id}>{type.description}</option>
                                }
                            }
                            )
                        }
                    </select>
                </label>

                <label className="detail input-label" htmlFor="itemType">Category:
                    <select className="input-field" name="category"
                        onChange={handlestate}
                        id="itemtypeId"
                    >
                        <option value="0"> Choose a category</option>
                        {
                            useritemtypes.map(type => {
                                if (type.id === theItem.useritemtypeId) {
                                    return <option key={type.id} value={type.id} selected>{type.description}</option>
                                } else {
                                    return <option key={type.id} value={type.id}>{type.description}</option>
                                }
                            }
                            )
                        }
                    </select>
                </label>
                <label className="detail input-label" htmlFor="price">Item Cost:
                    <input className="input-field" type="number"
                        placeholder="cost of item"
                        id="price"
                        onChange={handlestate}
                        defaultValue={theItem.price}
                    ></input>
                </label>
                <label className="detail input-label" htmlFor="want">Is this a want or need?
                    <div className="radio input-field"
                    >
                        <input
                            onChange={purchased}
                            type="radio"
                            name="wantradio"
                            value={false}
                            id="need"
                            checked={theItem.need ? "" : "checked"}
                        />
                        Want
                        <input
                            onChange={purchased}
                            type="radio"
                            name="wantradio"
                            value={true}
                            id="need"
                            checked={theItem.need ? "checked" : ""}
                        />
                        Need
                    </div>
                </label>
                <label className="detail input-label" htmlFor="dateneeded">{theItem.need ? "needed" : "wanted"} by:
                    <input className="input-field" type="date"
                        id="purchaseby"
                        onChange={handlestate}
                        defaultValue={theItem.purchaseby}
                    ></input>
                </label>
                <label className="detail input-label" htmlFor="purchased">Already Purchased?
                    <div className="input-field">
                        {
                            theItem.purchased ? <input type="checkbox" id="purchased" name="purchased" checked
                                onChange={purchased}>
                            </input> : <input type="checkbox" id="purchased" name="purchased"
                                onChange={purchased}>
                            </input>
                        }
                    </div>
                </label>
                <div className="buttons">
                    <button className="action-buttondetail" onClick={UpdateItem}>Save</button>
                    <button className="action-buttondetail" onClick={deletetheItem}>Delete</button>
                    <Link className="navbar__link" to="/shoppinglist"><button className="action-buttondetail">Close</button></Link>
                </div>
            </form>
            <div className="detail-form thenotes">
                <div className="detail input-label header">Notes:</div>
                {
                    notes.map(each => {
                        if (each.userItemsId === parseInt(itemId)) {
                            return <div className="indnote" key={each.id}>{each.description}
                            <div className="buttons">
                                <button className="action-buttondetail buttonsmall" id={each.id} onClick={removenote}>remove note </button>
                                <button className="action-buttondetail buttonsmall" id={each.id} onClick={editnote}>Edit note </button>
                                </div>
                            </div>
                        } else {
                            return ""
                        }
                    })
                }
                <button className="action-buttondetail buttonmedium" onClick={redirect}>Create New Note</button>
            </div>
        </div>
        </>
    )
}
