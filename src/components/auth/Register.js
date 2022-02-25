import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import { UserItemContext } from "../Analyze/FormProvider"
import { useContext } from "react/cjs/react.development"

export const Register = (props) => {
    const [customer, setCustomer] = useState({})
    const conflictDialog = useRef()
    const { getmoneyResources, gettipandtricks, moneyresources, tipsandtricks, getalltypes, itemtypes } = useContext(UserItemContext)


    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`https://capstone-thingcost-django.herokuapp.com//login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: customer.username,
                password: customer.password
            })
        })
            .then(res => res.json())
            .then(user => user.valid ? user[0] : false)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("https://capstone-thingcost-django.herokuapp.com//register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(customer)
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            localStorage.setItem("ThingCost_customer", createdUser.ThingCost_customer)
                            localStorage.setItem("token", createdUser.token)
                            getmoneyResources().then(gettipandtricks).then(getalltypes).then(
                                () => {

                                }
                            )
                        })
                        .then( ()=> {
                            history.push("/")
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
                    <label htmlFor="name"> First Name </label>
                    <input onChange={updateCustomer}
                        type="text" id="first_name" className="form-control"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="name"> Last Name </label>
                    <input onChange={updateCustomer}
                        type="text" id="last_name" className="form-control"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="name"> Username </label>
                    <input onChange={updateCustomer}
                        type="text" id="username" className="form-control"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="hourlysalary"> Hourly salary </label>
                    <input onChange={updateCustomer} type="number" id="hourlysalary" className="form-control" placeholder="enter your hourly salary" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Password </label>
                    <input onChange={updateCustomer} type="text" id="password" className="form-control" placeholder="password" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}