import React from "react";
import { NavLink, Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import authAPI from "../utils/API/authAPI";

const NavBar = (props) => {
    return (
        <>
            <div className='nav-bar-container'>
                <nav className='nav-bar'>
                    <NavLink to='/' className='nav-link'>
                        Home
                    </NavLink>
                    <NavLink to={`/login`} className='nav-link'>
                        Sign In
                    </NavLink>
                </nav>
            </div>
            <Outlet />
        </>
    )
}
// const mapStateToProps = (state) => {
//     return {

//     }
// } 
export default connect(null, null)(NavBar)