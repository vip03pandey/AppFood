import {LOGO_URL} from "../utils/constant";
import { useState } from "react";


export const Header = () => {
    const[btnname,setBtnName]=useState("Login")
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL} alt="Logo"  />
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                    <button className="login" 
                    onClick={()=>{
                        btnname==='Login'? setBtnName("Logout"): setBtnName("Login");}}>{btnname}</button>
                </ul>
            </div>
        </div>
    );
};