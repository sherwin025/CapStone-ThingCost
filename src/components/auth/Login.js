import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const [password, setp] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`https://capstone-thingcost-django.herokuapp.com/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("ThingCost_customer", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>ThingCost </h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Username </label>
                        <input type="text"
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                     <fieldset>
                        <label htmlFor="inputEmail"> Password </label>
                        <input type="text"
                            onChange={evt => setp(evt.target.value)}
                            className="form-control"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

