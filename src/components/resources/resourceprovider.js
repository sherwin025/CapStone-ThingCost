import React, { createContext, useState } from "react";

export const UserResourceContext = createContext()

export const ResourceProvider = (props) => {
    const [moneyresources, setmoneyresources] = useState([])
    const [tipsandtricks, settips] = useState([])


    const getusermoneyresources = (id) => {
        return fetch(`https://capstone-thingcost-django.herokuapp.com//userresources`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(setmoneyresources)
    }

    const getusertipsandtricks= (id) => {
        return fetch(`https://capstone-thingcost-django.herokuapp.com//usertips`, {
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