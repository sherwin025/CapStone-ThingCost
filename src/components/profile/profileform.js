import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { useState } from "react/cjs/react.development"
import { UserContext } from "./UserProvider"

export const MyProfile = () => {
    const [user, setuser] = useState({})
    const history = useHistory()
    const {getUsersById, updateUser} = useContext(UserContext)

    useEffect(() => {
        getUsersById(parseInt(localStorage.getItem("ThingCost_customer")))
        .then(setuser)
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
        </>
    )
}