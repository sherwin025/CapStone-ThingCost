import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {

    const logout = () => {
        localStorage.removeItem("ThingCost_customer")
    }

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__item" to="/analyze"> <div className="qit">Analyze a Purchase</div></Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__item" to="/shoppinglist"><div className="qit"> Shopping List</div></Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__item" to="/purchasedlist"><div className="qit"> Purchases</div></Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__item" to="/myprofile"><div className="qit"> My Profile</div></Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__item" to="/resources" ><div className="qit"> Resources</div></Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__item" to="" onClick={logout}><div className="qit"> Logout</div></Link>
            </li>
        </ul>
    )
}
