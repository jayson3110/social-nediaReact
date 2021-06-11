import React ,{useState, useContext} from 'react';
import './style.css';
import {Comment, CommentInput} from "../../components";
import {db ,storage} from "../../firebase";
import { UserContext } from "../../contexts/user";





export default function Post({id, profileUrl, username, photoURL, caption, comments}) {
	// body...
   
    const [user, setUser] = useContext(UserContext).user;
	const deletePost = () => {

		//get ref to the image file we like to delete


		// delete the post info from firestore

		 db.collection("posts")
	      .doc(id)
	      .delete()
	      .then(function () {
	        console.log("Document successfully deleted!");
	      })
	      .catch(function (error) {
	        console.error("Error removing document: ", error);
	      });

	      // console.log(id);
	      // console.log(username)
	}

	console.log(id)

	

	return (
		<div className="post">

		   <div className="post__header">
		     <div className="post__hederleft">
		           <img src={profileUrl} className="post__profilePic"/>
		           <p style={{marginLeft: "9px"}}>{username}</p>
		     </div>
		
		     <button onClick={deletePost} className="post__delete">Delete</button>

			
			</div>
			 <div className="post__center">
			    <img className="post_photoUrl" src={photoURL} />
			  </div>

			  <div>
			    <p> 
			     <span style={{ fontWeight: "900", marginRight: "10px"}}>{username}</span>

			     {caption}
			    </p>
			  </div>
			  

			  {comments ? comments.map( (comment) => <Comment username={comment.username} caption={comment.comment} />) : (
			  <></>)}

		      {user ?<CommentInput comments={comments} id={id} />: <></>}

	    </div>

	)
}

