import react, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { ItemContext } from "./ListProvider"
import { UserItemContext } from "../Analyze/FormProvider"
import { Link } from "react-router-dom"

export const ItemDetail = () => {
    const { itemId } = useParams()
    const { items, getItems, addItem, getItemById, deleteItem, updateItem, getNotes, notes, deleteNote } = useContext(ItemContext)
    const { itemtypes, getalltypes, difficultys, getalldifficulties } = useContext(UserItemContext)
    const [theItem, setItem] = useState({})
    const history = useHistory()

    useEffect(() => {

        getItemById(parseInt(itemId))
            .then(res => setItem(res))
            .then(getalltypes)
            .then(getalldifficulties)
            .then(getNotes)


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
            itemtypeId: parseInt(theItem.itemtypeId),
            price: parseInt(theItem.price),
            name: theItem.name,
            need: theItem.need,
            userId: parseInt(localStorage.getItem("ThingCost_customer")),
            hoursNeeded: theItem.hoursNeeded,
            buydifficultyId: parseInt(theItem.buydifficultyId),
            purchased: theItem.purchased
        }
        return updateItem(copy)
        .then(history.push("./"))
    }

    const deletetheItem = (event) => {
        const deleteNotes = notes.filter((each)=> each.userItemsId === parseInt(itemId))
        deleteNotes.forEach(element => {
            deleteNote(element.id)
        });
        
        return deleteItem(parseInt(itemId))
        .then(history.push("./"))

        
    }

    const redirect = () => {
        return history.push(`../newnote/${parseInt(itemId)}`)
    }

    const removenote = (event) => {
        return deleteNote(event.target.id)
        .then(getNotes)
    }

    return (
        <>
            <form>
                <label htmlFor="description">Item Description:
                    <input type="text"
                        placeholder="short description/name"
                        id="name"
                        onChange={handlestate}
                        defaultValue={theItem.name}
                    ></input>
                </label>

                <p>This item will cost you {(Math.round(theItem.hoursNeeded * 100) / 100).toFixed(2)} hours of work</p>

                <label htmlFor="buydifficulty"> How difficult will this be to purchase?:
                    <select name="category"
                        onChange={handlestate}
                        id="buydifficultyId">
                        <option value="0">Difficulty</option>
                        {
                            difficultys.map(type => {
                                if(theItem.buydifficultyId === type.id){
                                return <option key={type.id} value={type.id} selected>{type.description}</option>
                                } else {
                                    return <option key={type.id} value={type.id}>{type.description}</option>
                                }
                            }
                            )
                        }
                    </select>
                </label>

                <label htmlFor="itemType">Category:
                    <select name="category"
                        onChange={handlestate}
                        id="itemtypeId"
                    >
                        <option value="0"> Choose a category</option>
                        {
                            itemtypes.map(type => {
                                if (type.id === theItem.itemtypeId) {
                                    return <option key={type.id} value={type.id} selected>{type.description}</option>
                                } else {
                                    return <option key={type.id} value={type.id}>{type.description}</option>
                                }
                            }
                            )
                        }
                    </select>
                </label>
                <label htmlFor="price">Item Cost:
                    <input type="number"
                        placeholder="cost of item"
                        id="price"
                        onChange={handlestate}
                        defaultValue={theItem.price}
                    ></input>
                </label>
                <label htmlFor="want">Is this a want or need? :
                    <div className="radio"
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

                <label htmlFor="purchased">Already Purchased?
                    <div>
                        {
                            theItem.purchased? <input type="checkbox" id="purchased" name="purchased" checked
                            onChange={purchased}>
                        </input> : <input type="checkbox" id="purchased" name="purchased"
                            onChange={purchased}>
                        </input>
                        }
                    </div>
                </label>

                <button onClick={UpdateItem}>Save</button>
                <button onClick={deletetheItem}>Delete</button>
                <Link className="navbar__link" to="/shoppinglist"><button>Close</button></Link>

            </form>
            <div>
                Notes: 
                {
                notes.map(each => {
                    if (each.userItemsId === parseInt(itemId)) {
                        return <div key={each.id}>{each.description} <button id={each.id} onClick={removenote}>remove note </button></div>
                    }
                })
                }
                <button onClick={redirect}>Create New Note</button>
            </div>
        </>
    )
}
