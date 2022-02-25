import React, { useContext, useEffect } from "react"
import { useState } from "react/cjs/react.development"
import { UserContext } from "./UserProvider"
import { UserItemContext } from "../Analyze/FormProvider"
import "./profileform.css"

export const MyProfile = () => {
    const [user, setuser] = useState({})
    const { getUsersById, updateUser } = useContext(UserContext)
    const { useritemtypes, getallusertypes } = useContext(UserItemContext)
    const [editprofile, seteditprofile] = useState(true)
    const [edititem, setedittype] = useState(true)
    const [newtype, setnewtype] = useState(false)
    const [thetype, settype] = useState({
        userId: parseInt(localStorage.getItem("ThingCost_customer"))
    })


    useEffect(() => {
        getUsersById(parseInt(localStorage.getItem("ThingCost_customer")))
            .then(setuser)
        getallusertypes(parseInt(localStorage.getItem("ThingCost_customer")))
    }, [])

    const handlestate = (event) => {
        const copy = { ...user }
        copy[event.target.id] = event.target.value
        setuser(copy)
    }

    const handletypestate = (event) => {
        const copy = { ...thetype }
        copy[event.target.id] = event.target.value
        settype(copy)
    }

    const updatetheUser = () => {
        const copy = {
            id: user.id,
            hourlysalary: parseInt(user.hourlysalary)
        }
        updateUser(copy)
    }

    const submitnewtype = () => {
        return fetch("https://capstone-thingcost-django.herokuapp.com//usertypes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(thetype)
        })
            .then(setnewtype(false))
            .then(getUsersById(parseInt(localStorage.getItem("ThingCost_customer"))))
            .then(setuser)
            .then(() => getallusertypes(parseInt(localStorage.getItem("ThingCost_customer"))))
    }

    const removetype = (evt) => {
        return fetch(`https://capstone-thingcost-django.herokuapp.com//usertypes/${evt.target.id}`, { method: 'DELETE', headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        } })
            .then(()=> getallusertypes(parseInt(localStorage.getItem("ThingCost_customer"))))
    }

    const changeeditstate = () => {
        edititem ? setedittype(false) : setedittype(true)
    }

    const changenewtype = () => {
        newtype ? setnewtype(false) : setnewtype(true)
    }

    return (
        <>
            <div className="maincontainer">

                {
                    editprofile ?
                        <div className="analyze_form analyze">
                            <div className="header input-label">Your Information</div>
                            <div className="input-label">UserName: {user.user?.username}</div>
                            <div className="input-label">Hourly Earning: {user.hourlysalary}</div>
                            <button className="analyzebuttons action-button" onClick={() => seteditprofile(false)}>Edit Hourly Wage</button>
                        </div> :
                        <form className="analyze_form analyze">
                            <label className="input-label" htmlFor="hourlySalary"> Hourly Salary $
                                <input className="input-field" type="number"
                                    defaultValue={user.hourlysalary}
                                    id="hourlysalary"
                                    onChange={handlestate}
                                ></input>
                            </label>

                            <button
                                className="analyzebuttons action-button"
                                type="submit"
                                onClick={updatetheUser}>Update</button>
                        </form>
                }

                <div className="analyze_form analyze">
                    <div className="input-label header">Your Item Types:</div>
                    {
                        edititem ?
                            useritemtypes.map(each => {
                                return <div key={each.id}>{each.description} </div>
                            })
                            :
                            useritemtypes.map(each => {
                                return <div key={each.id}>{each.description} <button onClick={removetype} id={each.id}>remove</button></div>
                            })
                    }
                    {
                        newtype ?
                            <div>
                                <input className="input-field" type="text"
                                    placeholder="type description"
                                    id="description"
                                    onChange={handletypestate}
                                ></input>
                                <button className="analyzebuttons action-button" type="submit" onClick={submitnewtype}>submit</button>
                            </div>
                            : ""
                    }

                    <button className="analyzebuttons action-button" onClick={() => changeeditstate()} >edit types</button>
                    <button className="analyzebuttons action-button" onClick={() => changenewtype()}>add new type</button>

                </div>

            </div>
        </>
    )
}