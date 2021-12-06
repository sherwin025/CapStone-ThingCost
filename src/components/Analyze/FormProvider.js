import react, { createContext, useState } from "react";

export const UserItemContext = createContext()

export const UserItemProvider = (props) => {
    const [itemtypes, setitemtypes] = useState([])


    const getalltypes = () => {
        return fetch("http://localhost:8088/itemtypes")
            .then(res => res.json())
            .then(setitemtypes)
    }


    return (

        <UserItemContext.Provider value={{
            itemtypes, getalltypes
        }}>
            {props.children}
        </UserItemContext.Provider>
    )
}