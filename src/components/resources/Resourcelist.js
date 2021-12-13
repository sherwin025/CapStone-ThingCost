import react, { useEffect } from "react"
import { useContext, useState } from "react/cjs/react.development"
import { UserResourceContext } from "./resourceprovider"


export const Resources = () => {
    const { moneyresources, tipsandtricks, getusermoneyresources, getusertipsandtricks } = useContext(UserResourceContext)


    useEffect(() => {
        getusermoneyresources(parseInt(localStorage.getItem("ThingCost_customer")))
        getusertipsandtricks(parseInt(localStorage.getItem("ThingCost_customer")))
    }, [])

    return (<>
        <div>
            Money Resources:
            {
                moneyresources.map(each => {
                    return <div key={each.id}><div>{each.desciption}</div> <div>URL: {each.url}</div></div>
                })
            }
        </div>
        <div>
            Tips and Tricks:
            {
                tipsandtricks.map(each => {
                    return <div key={each.id}>{each.desciption}</div>
                })
            }
        </div>
        
    </>)
}