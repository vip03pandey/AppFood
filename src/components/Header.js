import { Link } from "react-router-dom";
import {LOGO_URL} from "../utils/constant";
import { useState ,useEffect} from "react";
import React from "react";

export const Header = () => {
    const[btnname,setBtnName]=useState("Login")
    useEffect(()=>{
        console.log("use effect")
    },[btnname])

    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL} alt="Logo"  />
            </div>
            <div className="nav-items">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li>Cart</li>
                    <button className="login" 
                    onClick={()=>{
                        btnname==='Login'? setBtnName("Logout"): setBtnName("Login");}}>{btnname}</button>
                </ul>
            </div>
        </div>
    );
};