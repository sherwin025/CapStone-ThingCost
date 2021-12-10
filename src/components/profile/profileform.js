import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { useState } from "react/cjs/react.development"
import { UserContext } from "./UserProvider"
import { UserItemContext } from "../Analyze/FormProvider"

export const MyProfile = () => {
    const [user, setuser] = useState({})
    const history = useHistory()
    const { getUsersById, updateUser } = useContext(UserContext)
    const { useritemtypes, getallusertypes } = useContext(UserItemContext)

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

    const updatetheUser = () => {
        const copy = {
            id: user.id,
            name: user.name,
            email: user.email,
            hourlySalary: parseInt(user.hourlySalary)
        }

        return updateUser(copy)
            .then(history.push("./shoppinglist"))

    }

    const removetype = (evt) => {
        return fetch(`http://localhost:8088/useritemtypes/${evt.target.id}`, {method: 'DELETE'})
        .then(getallusertypes(parseInt(localStorage.getItem("ThingCost_customer"))))
    }

    return (
        <>

            {
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
                        type="button"
                        onClick={updatetheUser}>Update</button>
                </form>
            }

            <div>Your Item Types: </div>
            {
            useritemtypes.map(each=>{
                return <div key={each.id}>{each.description} <button onClick={removetype} id={each.id}>remove</button></div>
            })
            }
        </>
    )
}