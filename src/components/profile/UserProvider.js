import React, { createContext } from "react";
import { useState } from "react/cjs/react.development";

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [users, setusers] = useState([])

    const getUsers = () => {
        return fetch(`http://localhost:8000/users`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(setusers) 
    }

    const getUsersById = (id) => {
        return fetch(`http://localhost:8000/users/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
    }

    const updateUser = (obj) => {
        return fetch(`http://localhost:8000/users/${obj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(obj)
        })
    }


    return (
        <UserContext.Provider value={{
            users, getUsers, getUsersById, updateUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}