import React, {useContext} from "react";
import "./style.css";
import {signInWithGoogle} from "../../services/authen";
import {UserContext} from "../../contexts/user"
 
export default function SigInBtn() {
	// body...
	const [user,setUser] = useContext(UserContext).user;


	const sigInBtnClick = async () => {
		let userBySignIn = await signInWithGoogle();
		if (userBySignIn) {
			setUser(userBySignIn);
		}
		console.log(userBySignIn);
	};
		

	return (
		<div className="sigInBtn" onClick={sigInBtnClick}>
		   <p>Sign In With Google</p>
		</div>

	)
}