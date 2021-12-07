import react, { useEffect, useState } from "react"
import { useContext } from "react/cjs/react.development"
import { ItemContext } from "../itemslists/ListProvider"
import { UserItemContext } from "./FormProvider"
import { useHistory } from "react-router-dom"

export const AnalyzeForm = () => {
    const [item, setitem] = useState({
        itemtypeId: null,
        price: null,
        name: null,
        need: null
    })
    const { itemtypes, getalltypes } = useContext(UserItemContext)
    const { addItem } = useContext(ItemContext)
    const history = useHistory()
    const [user, setuser] = useState({})

    useEffect(() => {
        getalltypes()
        fetch(`http://localhost:8088/users/${localStorage.getItem("ThingCost_customer")}`)
        .then(res=>res.json())
        .then(setuser)
    }, [])

    const handlestate = (event) => {
        const copy = { ...item }
        copy[event.target.id] = event.target.value
        setitem(copy)
    }

    const createItem = () => {

        if (item.price != null && item.itemtypeId !== null && item.name !== null && item.need !== null) {
            const copy = {
                itemtypeId: parseInt(item.itemtypeId),
                price: parseInt(item.price),
                name: item.name,
                need: item.need === "true",
                userId: parseInt(localStorage.getItem("ThingCost_customer")),
                hoursNeeded: parseInt(item.price) / user.hourlySalary, 
                buydifficulty: 0,
                purchased: false
            }
            
            return fetch("http://localhost:8088/useritems", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(copy)
            })
                .then(res => res.json())
                .then(res => history.push(`./shoppinglist/${res.id}`))


        } else {
            alert("incomplete item form")
        }

    }

    return (
        <>
            <form>
                <label htmlFor="description">Item Description:
                    <input type="text"
                        placeholder="short description/name"
                        id="name"
                        onChange={handlestate}
                    ></input>

                </label>
                <label htmlFor="itemType">Category:
                    <select name="category"
                        onChange={handlestate}
                        id="itemtypeId">
                        <option value="0"> Choose a category</option>
                        {
                            itemtypes.map(each =>
                                <option key={each.id} value={each.id}>{each.description}</option>
                            )
                        }
                    </select>
                </label>
                <label htmlFor="price">Item Cost:
                    <input type="number"
                        placeholder="cost of item"
                        id="price"
                        onChange={handlestate}
                    ></input>
                </label>
                <label htmlFor="want">Is this a want or need? :
                    <div className="radio"
                    >
                        <input
                            onChange={handlestate}
                            type="radio"
                            name="wantradio"
                            value={false}
                            id="need"
                        />
                        Want
                        <input
                            onChange={handlestate}
                            type="radio"
                            name="wantradio"
                            value={true}
                            id="need"
                        />
                        Need

                    </div>
                </label>
                <button
                    type="button"
                    onClick={createItem}>Analyze</button>
                <button>Clear</button>
            </form>
        </>
    )
}