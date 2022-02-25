import React, { createContext, useState } from "react";

export const UserItemContext = createContext()

export const UserItemProvider = (props) => {
    const [itemtypes, setitemtypes] = useState([])
    const [difficultys, setdifficulties] = useState([])
    const [moneyresources, setmoneyresources] = useState([])
    const [tipsandtricks, settips] = useState([])
    const [useritemtypes, setuseritemtypes] = useState([])


    const getalltypes = () => {
        return fetch("http://localhost:8000/itemtypes", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(setitemtypes)
    }

    const getalldifficulties = () => {
        return fetch("http://localhost:8000/difficulty", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(setdifficulties)
    }

    const getmoneyResources = () => {
        return fetch("http://localhost:8000/moneyresources", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(setmoneyresources)
    }

    const gettipandtricks= () => {
        return fetch("http://localhost:8000/tipandtricks", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(settips)
    }

    const  getallusertypes  = (id) => {
        const theId = parseInt(id)
        return fetch(`http://localhost:8000/usertypes`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(setuseritemtypes)
}
    return (

        <UserItemContext.Provider value={{
            itemtypes, getalltypes, difficultys, getalldifficulties, getmoneyResources, gettipandtricks, moneyresources, tipsandtricks, useritemtypes, getallusertypes 
        }}>
            {props.children}
        </UserItemContext.Provider>
    )
}