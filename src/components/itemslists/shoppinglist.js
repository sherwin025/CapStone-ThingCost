import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ItemContext } from "./ListProvider";
import "./itemlist.css"
import "./ItemDetail.css"
import { UserContext } from "../profile/UserProvider"

export const ShoppingList = () => {
    const { items, getItems, getItemById, deleteItem, updateItem, getNotes, notes, deleteNote } = useContext(ItemContext)
    const history = useHistory()
    const [note, triggernote] = useState(false)
    const [theitemid, settheitemid] = useState(0)
    const [searchterm, setsearchterm] = useState("")
    const [searchitem, setsearchitem] = useState(false)
    const [rankings, setrankings] = useState([])
    const [user, setuser] = useState({})
    const { getUsersById } = useContext(UserContext)



    useEffect(() => {
        getItems()
            .then(getNotes)
            .then(() => {
                return fetch("https://capstone-thingcost-django.herokuapp.com//userranking", {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                })
            })
            .then(res => res.json())
            .then(res => setrankings(res))
            .then(() => {
                getUsersById(parseInt(localStorage.getItem("ThingCost_customer")))
                    .then(res => setuser(res))
            })

    }, [])


    const notpurchasedwants = () => {
        const notpurchases = items.filter(each => { return each.purchased === false })
        const mynotpurchased = notpurchases.filter(each => { return each.user?.id === parseInt(localStorage.getItem("ThingCost_customer")) })
        const notmypurchaseswants = mynotpurchased.filter(each => { return each.need === false })

        if (searchterm !== "") {
            const filteredpurchase = notmypurchaseswants.filter(item => item.name.toLowerCase().includes(searchterm))
            return filteredpurchase
        } else {
            const sortedarray = []
            const rankedids = []
            const notranked = []
            if (rankings.length >= 1) {
                for (const rank of rankings) {
                    rankedids.push(rank.item)
                }
                for (const rank of rankings) {
                    for (const needs of notmypurchaseswants) {
                        if (rank.item === needs.id) {
                            sortedarray.push(needs)
                        }
                    }
                }

                for (const needs of notmypurchaseswants) {
                    if (rankedids.find(aid => aid === needs.id)) {

                    } else {
                        notranked.push(needs)
                    }
                }
                for (const aneed of notranked) {
                    sortedarray.push(aneed)
                }
                return sortedarray
            } else {
                return notmypurchaseswants
            }
        }

    }
    const notpurchasedneeds = () => {
        const notpurchases = items.filter(each => { return each.purchased === false })
        const mynotpurchased = notpurchases.filter(each => { return each.user?.id === parseInt(localStorage.getItem("ThingCost_customer")) })
        const notmypurchasesneeds = mynotpurchased.filter(each => { return each.need === true })

        if (searchterm !== "") {
            const filteredpurchase = notmypurchasesneeds.filter(item => item.name.toLowerCase().includes(searchterm))
            return filteredpurchase

        } else {
            const sortedarray = []
            const rankedids = []
            const notranked = []
            if (rankings.length >= 1) {
                for (const rank of rankings) {
                    rankedids.push(rank.item)
                }
                for (const rank of rankings) {
                    for (const needs of notmypurchasesneeds) {
                        if (rank.item === needs.id) {
                            sortedarray.push(needs)
                        }
                    }
                }

                for (const needs of notmypurchasesneeds) {
                    if (rankedids.find(aid => aid === needs.id)) {

                    } else {
                        notranked.push(needs)
                    }
                }
                for (const aneed of notranked) {
                    sortedarray.push(aneed)
                }
                return sortedarray
            } else {
                return notmypurchasesneeds
            }
        }
    }

    const redirect = (id) => {
        return history.push(`/shoppinglist/${parseInt(id)}`)
    }

    const deletetheItem = (itemId) => {
        const deleteNotes = notes.filter((each) => each.item === parseInt(itemId))
        deleteNotes.forEach(element => {
            deleteNote(element.id)
        });
        return deleteItem(parseInt(itemId))
            .then(getItems())
    }

    const updatetheItem = (id) => {
        return getItemById(id)
            .then((res) => {
                const copy = { ...res }
                copy.buydifficulty = res.buydifficulty?.id
                copy.user = res.user?.id
                copy.useritemtype = res.useritemtype?.id
                copy.purchased = true
                return updateItem(copy)
                    .then(getItems)
            })
    }

    const triggerthenotes = (id) => {
        note ? triggernote(false) : triggernote(true)
        settheitemid(id)
    }

    const triggersearch = () => {
        searchitem ? setsearchitem(false) : setsearchitem(true)
        clearsearch()
    }

    const clearsearch = () => {
        searchitem ? setsearchterm("") : setsearchterm(searchterm)
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
                                            if (note.item === props.id) {
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

    const prioritydropdown = (aboolean) => {
        const notmypurchaseswants = items.filter(each => { return each.need === aboolean })
        const notmypurchaseswantsnot = notmypurchaseswants.filter(each => { return each.purchased === false })
        const thelength = notmypurchaseswantsnot.length
        let newarray = []
        for (let i = 1; i < thelength + 1; i++) {
            newarray.push(i)
        }
        return newarray
    }

    const postrankingtoapi = (event) => {
        const theitem = rankings.find(each => each.item === parseInt(event.target.id))

        if (theitem) {
            theitem.ranking = parseInt(event.target.value)

            return fetch(`https://capstone-thingcost-django.herokuapp.com//userranking/${theitem.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(theitem)
            })
                .then(() => {
                    return fetch("https://capstone-thingcost-django.herokuapp.com//userranking", {
                        headers: {
                            "Authorization": `Token ${localStorage.getItem("token")}`
                        }
                    })
                        .then(res => res.json())
                        .then(setrankings)
                })
                .then(getItems())

        } else {
            const apipost = {
                ranking: parseInt(event.target.value),
                item: parseInt(event.target.id)
            }
            return fetch("https://capstone-thingcost-django.herokuapp.com//userranking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(apipost)
            })
                .then(() => {
                    return fetch("https://capstone-thingcost-django.herokuapp.com//userranking", {
                        headers: {
                            "Authorization": `Token ${localStorage.getItem("token")}`
                        }
                    })
                        .then(res => res.json())
                        .then(setrankings)
                })
                .then(getItems())
        }
    }

    const gettheranking = (id) => {
        const theitem = rankings.find(theitem => theitem.item === parseInt(id))
        return theitem?.ranking
    }

    return (
        <><div className="pagetitle">Shopping List</div>
            <div className="buttondiv">
                <div className="searchbutton">
                    <div>
                        <button
                            onClick={() => triggersearch()
                            }
                            className="detail input-label header"
                            htmlFor="description">
                            Search Items
                        </button>

                    </div>
                    {
                        searchitem ?
                            <div><input className="input-field searchterfield" type="text"
                                placeholder="search for an item"
                                id="name"
                                onChange={(event) => setsearchterm(event.target.value.toLowerCase())}
                            ></input> </div>
                            :
                            ""
                    }

                </div>
            </div>
            <div className="list">
                <div className="needs">
                    <div className="title header">Needs:</div>
                    <div className="items">
                        {
                            notpurchasedneeds().map(each => <div className={each.buydifficulty?.id === 3 ? "indItem hard" : each.buydifficulty?.id === 2 ? "indItem med" : each.buydifficulty?.id === 1 ? "indItem easy" : " indItem"} key={each.id}>
                                <div className="prioritydrop">
                                    <select className="input-field"
                                        onChange={postrankingtoapi}
                                        name="category"
                                        id={each.id}>
                                        <option value="0">rank</option>
                                        {
                                            prioritydropdown(true).map(num => {
                                                if (rankings.find(theitem => theitem.item === each.id) !== undefined) {
                                                    if (gettheranking(each.id) === num) {
                                                        return <option key={num} selected>{num}</option>
                                                    } else {
                                                        return <option key={num} >{num}</option>
                                                    }

                                                } else {
                                                    return <option key={num} >{num}</option>
                                                }
                                            })
                                        }
                                    </select>
                                </div>
                                <div>{each.purchaseby ? <div>Needed By: {each.purchaseby}</div> : ""} </div>
                                <div className="itemname">{each.name}</div>
                                <div className="workhours">Work Hours: {(each.price / user.hourlysalary).toFixed(2)} </div>
                                <div className="buttons">
                                    <button className="action-buttondetail buttonsmall" type="button" onClick={() => updatetheItem(each.id)}>Purchased</button>
                                    <button className="action-buttondetail buttonsmall" onClick={() => { redirect(each.id) }}>Edit</button>
                                    <button className="action-buttondetail buttonsmall" type="button" onClick={() => deletetheItem(each.id)}>Delete</button>
                                </div>
                                <div className="flexnote"><div className="difficultid">Buy Difficulty: {each.buydifficulty?.id ? `${each.buydifficulty?.id}` : "not rated"}
                                </div>
                                    <button className=" notebutton" onClick={() => { triggerthenotes(parseInt(each.id)) }}>notes</button>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
                <div className="wants">
                    <div className="title header">Wants:</div>
                    <div className="items">
                        {
                            notpurchasedwants().map(each => <div className={each.buydifficulty?.id === 3 ? "indItem hard" : each.buydifficulty?.id === 2 ? "indItem med" : each.buydifficulty?.id === 1 ? "indItem easy" : " indItem"} key={each.id}>
                                <div className="prioritydrop">
                                    <select className="input-field"
                                        onChange={postrankingtoapi}
                                        name="category"
                                        id={each.id}>
                                        <option value="0">rank</option>
                                        {
                                            prioritydropdown(false).map(num => {
                                                if (rankings.find(theitem => theitem.item === each.id) !== undefined) {
                                                    if (gettheranking(each.id) === num) {
                                                        return <option key={num} selected>{num}</option>
                                                    } else {
                                                        return <option key={num} >{num}</option>
                                                    }

                                                } else {
                                                    return <option key={num} >{num}</option>
                                                }
                                            })
                                        }
                                    </select>
                                </div>
                                <div>{each.purchaseby ? <div>Wanted By: {each.purchaseby}</div> : ""} </div>
                                <div className="itemname">{each.name}</div>
                                <div className="workhours">Work Hours: {(each.price / user.hourlysalary).toFixed(2)} </div>
                                <div className="buttons">
                                    <button className="action-buttondetail buttonsmall" type="button" onClick={() => updatetheItem(each.id)}>Purchased</button>
                                    <button className="action-buttondetail buttonsmall" onClick={() => { redirect(each.id) }}>Edit</button>
                                    <button className="action-buttondetail buttonsmall" type="button" onClick={() => deletetheItem(each.id)}>Delete</button>
                                </div>
                                <div className="flexnote"><div className="difficultid">Buy Difficulty: {each.buydifficulty?.id ? `${each.buydifficulty?.id}` : "not rated"}
                                </div>
                                    <button className=" notebutton" onClick={() => { triggerthenotes(parseInt(each.id)) }}>notes</button>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
                {
                    <Popup id={theitemid} setTrigger={triggernote} trigger={note} />
                }
            </div>
        </>
    )
}