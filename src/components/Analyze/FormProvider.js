import React, { createContext, useState } from "react";

export const UserItemContext = createContext()

export const UserItemProvider = (props) => {
    const [itemtypes, setitemtypes] = useState([])
    const [difficultys, setdifficulties] = useState([])


    const getalltypes = () => {
        return fetch("http://localhost:8088/itemtypes")
            .then(res => res.json())
            .then(setitemtypes)
    }

    const getalldifficulties = () => {
        return fetch("http://localhost:8088/buydifficultys")
            .then(res => res.json())
            .then(setdifficulties)
    }


    return (

        <UserItemContext.Provider value={{
            itemtypes, getalltypes, difficultys, getalldifficulties
        }}>
            {props.children}
        </UserItemContext.Provider>
    )
}