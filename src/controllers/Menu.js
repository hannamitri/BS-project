import React, { useState, useEffect, useRef } from 'react';
import {
    Link
} from "react-router-dom";
import '../components/App.css';
import { getCountrybyCategory } from '../api/api';

const Menu = () => {

    return (

        <div className="container-body">

            <nav className="navbar">
                <div className="title">
                    Lebanon
                </div>

                <div>


                    <ul style={{
                        marginRight: "20px"
                    }}>
                        < li >
                            <Link className="nav-link" to="/travel"><span className="nav-links">Travel to Lebanon</span></Link>
                        </li>
                        <li >
                            <Link className="nav-link" to="/places"> <span className="nav-links">Places to go</span></Link>
                        </li>
                        <li >
                            <Link className="nav-link" to="/activities"><span className="nav-links">Things to do</span></Link>
                        </li>
                        <li >
                            <Link className="nav-link" to="/flight"> <span className="nav-links">Plan your trip</span></Link>
                        </li>

                        <li >
                            <Link className="nav-link" to="/account"><span className="nav-links">Account</span></Link>
                        </li>

                    </ul>
                </div>

            </nav >
        </div >
    );
}
export default Menu;