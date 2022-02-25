import React, { createContext, useState } from "react";

export const UserResourceContext = createContext()

export const ResourceProvider = (props) => {
    const [moneyresources, setmoneyresources] = useState([])
    const [tipsandtricks, settips] = useState([])


    const getusermoneyresources = (id) => {
        return fetch(`http://localhost:8000/userresources`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(setmoneyresources)
    }

    const getusertipsandtricks= (id) => {
        return fetch(`http://localhost:8000/usertips`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(settips)
    }

    return (

        <UserResourceContext.Provider value={{
            moneyresources, tipsandtricks, getusermoneyresources, getusertipsandtricks
        }}>
            {props.children}
        </UserResourceContext.Provider>
    )
}