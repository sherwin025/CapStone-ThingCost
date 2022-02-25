import { useState, useEffect } from "react"
import "./randomtip.css"

export const RandomTip = () => {
    const [tips, settips] = useState([])

    useEffect(() => {
        return fetch(`https://capstone-thingcost-django.herokuapp.com//usertips`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(settips)

    }, [])

    const tipIds = () => {
        const newArray = tips.map(each => each.id)
        const newtipindex = Math.floor(Math.random() * newArray.length)
        const newtipid = newArray[newtipindex]
        let thetip = {}
        for (const tip of tips) {
            if (tip.id === newtipid)
                thetip = tip
        }
        return thetip
    }

    return (<>
    <div className="tip">
        {
            tipIds().description
        }

    </div>
    </>)
}