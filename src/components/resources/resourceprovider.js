import React, { createContext, useState } from "react";

export const UserResourceContext = createContext()

export const ResourceProvider = (props) => {
    const [moneyresources, setmoneyresources] = useState([])
    const [tipsandtricks, settips] = useState([])


    const getusermoneyresources = (id) => {
        return fetch(`http://localhost:8088/usermoneyresources?userId=${id}`)
            .then(res => res.json())
            .then(setmoneyresources)
    }

    const getusertipsandtricks= (id) => {
        return fetch(`http://localhost:8088/usertipsandtricks?userId=${id}`)
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