import React, { useEffect, useState } from "react"
import { useContext } from "react/cjs/react.development"
import { UserItemContext } from "./FormProvider"
import { useHistory } from "react-router-dom"
import { UserContext } from "../profile/UserProvider"
import "./AnalyzeForm.css"

export const AnalyzeForm = () => {
    const [item, setitem] = useState({
        itemtypeId: null,
        price: null,
        name: null,
        need: null
    })
    const { useritemtypes, getallusertypes } = useContext(UserItemContext)
    const history = useHistory()
    const [user, setuser] = useState({})
    const { getUsersById } = useContext(UserContext)
    const [newtype, setnewtype] = useState({
        description: null
    })

    useEffect(() => {
        getallusertypes(parseInt(localStorage.getItem("ThingCost_customer")))
        getUsersById(parseInt(localStorage.getItem("ThingCost_customer")))
            .then(res => setuser(res))
    }, [])

    const handlestate = (event) => {
        const copy = { ...item }
        copy[event.target.id] = event.target.value
        setitem(copy)
    }

    const handletypestate = (event) => {
        const copy = { ...newtype }
        copy[event.target.id] = event.target.value
        copy.userId = parseInt(localStorage.getItem("ThingCost_customer"))
        setnewtype(copy)
    }

    const createItem = () => {

        if (newtype.description != null) {
            return fetch("https://capstone-thingcost-django.herokuapp.com//usertypes", {
                method: "POST",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newtype)
            })
                .then(res => res.json())
                .then((res) => {
                    if (item.price != null && item.name !== null && item.need !== null) {
                        const copy = {
                            useritemtype: res.id,
                            price: parseInt(item.price),
                            name: item.name,
                            need: item.need === "true",
                            user: parseInt(localStorage.getItem("ThingCost_customer")),
                            buydifficulty: 1,
                            purchased: false,
                            purchaseby: "2022-01-01",
                            hoursneeded: parseInt(item.price) / user.hourlysalary
                        }
                        return fetch("https://capstone-thingcost-django.herokuapp.com//items", {
                            method: "POST",
                            headers: {
                                "Authorization": `Token ${localStorage.getItem("token")}`,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(copy)
                        })
                            .then(res => res.json())
                            .then(res => history.push(`./shoppinglist/${res.id}`))
                    } else {
                        alert("incomplete item form")
                    }
                })
        } else {
            if (item.price != null && item.itemtypeId !== null && item.name !== null && item.need !== null) {
                const copy = {
                    useritemtype: parseInt(item.itemtypeId),
                    price: parseInt(item.price),
                    name: item.name,
                    need: item.need === "true",
                    user: parseInt(localStorage.getItem("ThingCost_customer")),
                    hoursneeded: parseInt(item.price) / user.hourlysalary,
                    buydifficulty: 1,
                    purchased: false,
                    purchaseby: "2022-01-01"
                }
                return fetch("https://capstone-thingcost-django.herokuapp.com//items", {
                    method: "POST",
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`,
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
    }

    return (
        <>
            <form className="analyze_form">
                <label className="analyze input-label header" htmlFor="description">Item Description
                    <input className="input-field" type="text"
                        placeholder="short description/name"
                        id="name"
                        onChange={handlestate}
                    ></input>

                </label>
                <label className="analyze input-label" htmlFor="itemType">Category
                    {item.itemtypeId === null || item.itemtypeId >= 0 ?
                        <select className="input-field"
                            name="category"
                            onChange={handlestate}
                            id="itemtypeId">
                            <option value="0"> Choose a category</option>
                            {
                                useritemtypes.map(each =>
                                    <option key={each.id} value={each.id}>{each.description}</option>
                                )
                            }
                            <option key={-1} value={-1}>Create new type</option>
                        </select>
                        : <input className="input-field" type="text"
                            placeholder="type description"
                            id="description"
                            onChange={handletypestate}
                        ></input>
                    }
                </label>
                <label className="analyze input-label" htmlFor="price">Item Cost
                    <input
                        className="input-field"
                        type="number"
                        placeholder="cost of item"
                        id="price"
                        onChange={handlestate}
                    ></input>
                </label>
                <label className="analyze input-label" htmlFor="want">Is this a want or need?
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
                <div className="analyzebuttons">
                    <button
                        className="action-button"
                        type="button"
                        onClick={createItem}>&nbsp;Analyze&nbsp;</button>
                    <button
                        className="action-button">Clear</button>
                </div>
            </form>
        </>
    )
}