import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import { UserItemContext } from "../Analyze/FormProvider"
import { useContext } from "react/cjs/react.development"

export const Register = (props) => {
    const [customer, setCustomer] = useState({})
    const conflictDialog = useRef()
    const { getmoneyResources, gettipandtricks, moneyresources, tipsandtricks, getalltypes, itemtypes } = useContext(UserItemContext)


    useEffect(() => {
        getmoneyResources().then(gettipandtricks).then(getalltypes)
    }, [])

    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }
    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(customer)
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            itemtypes.forEach(element => {
                                return fetch("http://localhost:8088/useritemtypes", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        description: element.description,
                                        userId: createdUser.id
                                    })
                                })
                            })
                            tipsandtricks.forEach(element => {
                                return fetch("http://localhost:8088/usertipsandtricks", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        description: element.description,
                                        userId: createdUser.id
                                    })
                                })
                            })
                            moneyresources.forEach(element => {
                                return fetch("http://localhost:8088/usermoneyresources", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        description: element.description,
                                        url: element.url,
                                        userId: createdUser.id
                                    })
                                })
                            })
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("ThingCost_customer", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })

    }

    const updateCustomer = (evt) => {
        const copy = { ...customer }
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register for ThingCost Analysis</h1>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input onChange={updateCustomer}
                        type="text" id="name" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="hourlysalary"> Hourly salary </label>
                    <input onChange={updateCustomer} type="number" id="hourlySalary" className="form-control" placeholder="enter your hourly salary" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}