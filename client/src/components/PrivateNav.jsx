import React from "react";
import { NavLink, Outlet } from 'react-router-dom'
import {connect} from 'react-redux'
import authAPI from "../utils/API/authAPI";

const PrivateNav = (props) => {
    return (
        <>
            <div className='nav-bar-container'>
                <nav className='nav-bar'>
                    <NavLink to='/private-one' className='nav-link'>
                        Private 1
                    </NavLink>
                    <NavLink to={`/private-two`}className='nav-link'>
                        Private 2
                    </NavLink>
                    <NavLink to={`/private-three`}className='nav-link'>
                        Private 3
                    </NavLink>
                    <button onClick={authAPI.logout}>LOG OUT</button>

                </nav>
            </div>
            <Outlet/>
        </>
    )
}
// const mapStateToProps = (state) => {
//     return {
        
//     }
// } 
export default connect(null, null)(PrivateNav)