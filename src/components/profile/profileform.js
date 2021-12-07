import react, { useEffect } from "react"
import { useHistory } from "react-router"
import { useState } from "react/cjs/react.development"

export const MyProfile = () => {
    const [user, setuser] = useState({})
    const history = useHistory()

    useEffect(() => {
        return fetch(`http://localhost:8088/users/${localStorage.getItem("ThingCost_customer")}`)
            .then(res => res.json())
            .then(setuser)
    }, [])

    const handlestate = (event) => {
        const copy = { ...user }
        copy[event.target.id] = event.target.value
        setuser(copy)
    }

    const updateUser = () => {
        const copy = {
            name: user.name,
            email: user.email,
            hourlySalary: parseInt(user.hourlySalary)
        }

        return fetch(`http://localhost:8088/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
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
                            onClick={updateUser}>Update</button>
                    </form>
            }
        </>
    )
}