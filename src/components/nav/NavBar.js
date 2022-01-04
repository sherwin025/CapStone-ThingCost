import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {

    const [navbarOpen, setNavbarOpen] = useState(false)
    const logout = () => {
        localStorage.removeItem("ThingCost_customer")
    }
    const handleToggle = () => {
        setNavbarOpen(prev => !prev)
    }

    return (
        <div className="navbar">
            <div className="navbar__item active">
                <Link className="navbar__item" to="/analyze"> <div className="qit">Analyze a Purchase</div></Link>
            </div>
            <div className="navbar__item active">
                <Link className="navbar__item" to="/shoppinglist"><div className="qit"> Shopping List</div></Link>
            </div>
            <div className="navbar__item active">
                <Link className="navbar__item" to="/purchasedlist"><div className="qit"> Purchases</div></Link>
            </div>
            <div className="navbar__item active" onClick={handleToggle}>
                <div className="expandmenu">
                <span></span>
                <span></span>
                <span></span>
                </div>
                {navbarOpen ?
                    <div id="menu">
                        <div className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                            <Link className="droplink" to="/myprofile"><div className="qitL"> My Profile</div></Link>
                        </div>
                        <div className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                            <Link className="droplink" to="/resources" ><div className="qitL"> Resources</div></Link>
                        </div>
                        <div className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                            <Link className="droplink" to="/community"><div className="qitL"> Community</div></Link>
                        </div>
                        <div className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                            <Link className="droplink" to="" onClick={logout}><div className="qitL"> Logout</div></Link>
                        </div>
                    </div> : ""}
            </div>
        </div>
    )
}
