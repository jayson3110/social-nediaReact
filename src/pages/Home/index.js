import React from "react";
import "./style.css";
import {SigInBtn} from "../../components";
import {Navbar, CreatePost, Feed} from "../../containers";


export default function Home() {
	// body...
	return (
		<div className="home">
		   <Navbar />
		   <CreatePost />
		    <Feed />
		   
		</div>

	)
}