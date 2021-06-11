import React, {useState, useContext} from "react";
import "./style.css"
import {SigInBtn} from "../../components";
import {UserContext} from "../../contexts/user"

export default function Navbar() {
	// body...

	const [user,setUser] = useContext(UserContext).user;

	return (
		<div className="navbar">
		   <p>ReactSocial</p>

		   {user ? <img className="navabar_img" src={user.photoURL} />: <SigInBtn/>}
		</div>

	)
}

