import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { useState } from "react/cjs/react.development"
import { UserContext } from "./UserProvider"
import { UserItemContext } from "../Analyze/FormProvider"

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
            name: user.name,
            email: user.email,
            hourlySalary: parseInt(user.hourlySalary)
        }
        return updateUser(copy)
    }

    const submitnewtype = () => {
        return fetch("http://localhost:8088/useritemtypes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(thetype)
        })
        .then(setnewtype(false))
        .then(getUsersById(parseInt(localStorage.getItem("ThingCost_customer"))))
        .then(setuser)
        .then(getallusertypes(parseInt(localStorage.getItem("ThingCost_customer"))))
    }

    const removetype = (evt) => {
        return fetch(`http://localhost:8088/useritemtypes/${evt.target.id}`, { method: 'DELETE' })
            .then(getallusertypes(parseInt(localStorage.getItem("ThingCost_customer"))))
    }

    const changeeditstate = () => {
        edititem ? setedittype(false) : setedittype(true)
    }

    const changenewtype = () => {
        newtype ? setnewtype(false) : setnewtype(true)
    }

    return (
        <>

            {
                editprofile ?
                    <div>
                        <div>Name: {user.name}</div>
                        <div>Email: {user.email}</div>
                        <div>Hourly Earning: {user.hourlySalary}</div>
                        <button onClick={() => seteditprofile(false)}>Edit Profile</button>
                    </div> :
                    <form>
                        <label htmlFor="name">Name:
                            <input type="text"
                                placeholder="short description/name"
                                id="name"
                                onChange={handlestate}
                                defaultValue={user.name}
                            ></input>

                        </label>
                        <label htmlFor="email"> Email:
                            <input type="text"
                                defaultValue={user.email}
                                id="email"
                                onChange={handlestate}
                            ></input>
                        </label>

                        <label htmlFor="hourlySalary"> Hourly Salary:
                            <input type="number"
                                defaultValue={user.hourlySalary}
                                id="hourlySalary"
                                onChange={handlestate}
                            ></input>
                        </label>

                        <button
                            type="submit"
                            onClick={updatetheUser}>Update</button>
                    </form>
            }

            <div>Your Item Types:
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
                <button onClick={() => changeeditstate()} >edit types</button>
                <button onClick={() => changenewtype()}>add new type</button>
            </div>

            {
                newtype ?
                    <div>
                        <input className="input-field" type="text"
                            placeholder="type description"
                            id="description"
                            onChange={handletypestate}
                        ></input>
                        <button type="submit" onClick={submitnewtype}>submit</button>
                    </div>
                    : ""
            }
        </>
    )
}