import React, { createContext } from "react";
import { useState } from "react/cjs/react.development";

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [users, setusers] = useState([])

    const getUsers = () => {
        return fetch(`http://localhost:8088/users`)
            .then(res => res.json())
            .then(setusers) 
    }

    const getUsersById = (id) => {
        return fetch(`http://localhost:8088/users/${id}`)
            .then(res => res.json())
    }

    const updateUser = (obj) => {
        return fetch(`http://localhost:8088/users/${obj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(getUsers)
    }


    return (
        <UserContext.Provider value={{
            users, getUsers, getUsersById, updateUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}