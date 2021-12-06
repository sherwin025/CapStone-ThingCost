import react, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { ItemContext } from "./ListProvider"
import { UserItemContext } from "../Analyze/FormProvider"

export const ItemDetail = () => {
    const { itemId } = useParams()
    const { items, getItems, addItem, getItemById, deleteItem, updateItem } = useContext(ItemContext)
    const { itemtypes, getalltypes } = useContext(UserItemContext)
    const [theItem, setItem] = useState({})

    useEffect(() => {
        getItemById(parseInt(itemId))
            .then(res => setItem(res))
            .then(getalltypes)
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
                <label htmlFor="itemType">Category:
                    <select name="category"
                        onChange={handlestate}
                        id="itemtypeId"
                    >
                        <option value="0"> Choose a category</option>
                        {
                            itemtypes.map(each => {
                                if (each.id === theItem.itemtypeId) {
                                    return <option key={each.id} value={each.id} selected>{each.description}</option>
                                } else {
                                    return <option key={each.id} value={each.id}>{each.description}</option>
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

                <label htmlFor="purchased">Have you purchased this item?
                    <div>
                        <input type="checkbox" id="purchased" name="purchased"
                            onChange={purchased}>
                        </input>
                    </div>
                </label>

                <button>Save</button>
                <button>Delete</button>
                <button>Close</button>
            </form>
        </>
    )
}