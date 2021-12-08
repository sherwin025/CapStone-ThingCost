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
                <Link className="navbar__link" to="/analyze">Analyze a Purchase</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/shoppinglist">Shopping List</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/purchasedlist">Purchases</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/myprofile">My Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="" onClick={logout}>Logout</Link>
            </li>
        </ul>
    )
}
