import { useEffect } from "react"
import { useContext, useState } from "react/cjs/react.development"
import { UserResourceContext } from "./resourceprovider"
import "./resourcelist.css"

export const Resources = () => {
    const { moneyresources, tipsandtricks, getusermoneyresources, getusertipsandtricks } = useContext(UserResourceContext)
    const [editbutton, seteditbutton] = useState(false)
    const [addsite, setsitebutton] = useState(false)
    const [addtip, settipbutton] = useState(false)
    const [site, setsite] = useState({})
    const [tip, settip] = useState({})

    useEffect(() => {
        getusermoneyresources(parseInt(localStorage.getItem("ThingCost_customer")))
        getusertipsandtricks(parseInt(localStorage.getItem("ThingCost_customer")))
    }, [])

    const troggleedit = () => {
        editbutton ? seteditbutton(false) : seteditbutton(true)
    }

    const trogglesite = () => {
        addsite ? setsitebutton(false) : setsitebutton(true)
    }

    const troggletip = () => {
        addtip ? settipbutton(false) : settipbutton(true)
    }

    const deletetip = (evt) => {
        return fetch(`http://localhost:8088/usertipsandtricks/${evt.target.value}`, {
            method: "DELETE"
        })
            .then(getusertipsandtricks(parseInt(localStorage.getItem("ThingCost_customer"))))
    }

    const deletemoney = (evt) => {
        return fetch(`http://localhost:8088/usermoneyresources/${evt.target.value}`, {
            method: "DELETE"
        })
            .then(getusermoneyresources(parseInt(localStorage.getItem("ThingCost_customer"))))
    }

    const addmoney = () => {
        return fetch("http://localhost:8088/usermoneyresources", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: site.description,
                url: site.url,
                userId: parseInt(localStorage.getItem("ThingCost_customer"))
            })
        })
            .then(getusermoneyresources(parseInt(localStorage.getItem("ThingCost_customer"))))
            .then(setsitebutton(false))
    }

    const addtipres = () => {
        return fetch("http://localhost:8088/usertipsandtricks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: tip.description,
                userId: parseInt(localStorage.getItem("ThingCost_customer"))
            })
        })
            .then(getusertipsandtricks(parseInt(localStorage.getItem("ThingCost_customer"))))
            .then(settipbutton(false))
    }

    return (<>
        <div className="analyze_form">
            {
                editbutton ?
                    <div> <div className="resourcecontain"><div>
                        <div className="input-label header">Money Resources:</div>
                        {
                            moneyresources.map(each => {
                                return <div className="mapped" key={each.id}><div><div>{each.description}</div>
                                    <div>URL: {each.url}</div></div>

                                    <button className="analyzebuttons remove" type="submit" value={each.id} onClick={deletemoney}>remove</button>
                                </div>
                            })
                        }
                    </div>
                        {
                            addsite ? <div><div className="newsite">
                                <input className="input-field" type="text"
                                    placeholder="description"
                                    id="description"
                                    onChange={(event) => {
                                        const copy = { ...site }
                                        copy.description = event.target.value
                                        setsite(copy)
                                    }}
                                ></input>
                                <input className="input-field" type="text"
                                    placeholder="URL"
                                    id="url"
                                    onChange={(event) => {
                                        const copy = { ...site }
                                        copy.url = event.target.value
                                        setsite(copy)
                                    }}
                                ></input>
                            </div>
                                <button className="analyzebuttons submit" type="submit" onClick={() => { addmoney() }} >submit</button>
                            </div>
                                : ""
                        }
                        {
                            addsite ?
                                <button className="analyzebuttons stateitem" onClick={trogglesite}>Close Add website</button> : <button className="analyzebuttons stateitem" onClick={trogglesite}>Add website</button>
                        }
                    </div>
                        <div>
                            <div className="input-label header">Tips and Tricks:</div>
                            {
                                tipsandtricks.map(each => {
                                    return <div className="mapped " key={each.id}><div>{each.description}</div>
                                        <button className="analyzebuttons remove " type="submit" value={each.id} onClick={deletetip}>remove</button>
                                    </div>
                                })
                            }
                        </div>
                        {
                            addtip ? <div>
                                <input className="input-field" type="text"
                                    placeholder="description"
                                    id="description"
                                    onChange={(event) => {
                                        const copy = { ...site }
                                        copy.description = event.target.value
                                        settip(copy)
                                    }}
                                ></input>
                                <button className="analyzebuttons submit" type="submit" onClick={() => { addtipres() }} >submit new tip/trick</button>
                            </div>
                                : ""
                        }
                        {
                            addtip ? <button className="analyzebuttons stateitem" onClick={troggletip}>Close Add Tip/Trick</button> : <button className="analyzebuttons stateitem" onClick={troggletip}>Add Tip/Trick</button>
                        }
                    </div> :
                    <div> <div className="resourcecontain">
                        <div className="input-label header">Money Resources:</div>
                        {
                            moneyresources.map(each => {
                                return <div key={each.id}><div>{each.description}</div> <div>URL: {each.url}</div> </div>
                            })
                        }
                    </div>
                        <div className="resourcecontain">
                            <div className="input-label header">Tips and Tricks:</div>
                            {
                                tipsandtricks.map(each => {
                                    return <div key={each.id}>{each.description}</div>
                                })
                            }
                        </div>
                    </div>
            }
            {
                editbutton ?
                    <button className="analyzebuttons action-button" onClick={troggleedit}> Close Edit Resources</button> : <button className="analyzebuttons action-button" onClick={troggleedit}>Edit Resources</button>

            }


        </div>
    </>)
}