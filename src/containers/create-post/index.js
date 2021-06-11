import React, { useContext, useState } from "react";
import "./style.css"
import {SigInBtn} from "../../components";
import {UserContext} from "../../contexts/user"
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import makeid from "../../helper/function";
import {storage, db} from "../../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "firebase"

export default function CreatePost() {
	// body...
	const[user, setUser] = useContext(UserContext).user;
	const[caption, setCaption]= useState("");
	const[image, setImage]= useState(null);

	const handleChange = (e) => {
		if(e.target.files[0]){
			setImage(e.target.files[0])

			var selectedImageSrc = URL.createObjectURL(e.target.files[0]);

			var imagePreview = document.getElementById("image-preview");

			imagePreview.src = selectedImageSrc;

			imagePreview.style.display = "block";


		}

	};


	const [progress, setProgress] = useState(0)

	const handleUpload = () => {
		if(image) {

			var imageName = makeid(10)
			const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);

			uploadTask.on("state_changed", (snapshot) => {
				// progress function 1%, 2% ..

				const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);

				setProgress(progress);



			}, (error) => {
				console.log(error);
			}, () => {
				// get dowload url and upload the post info

				storage.ref("images").child(`${imageName}.jpg`).getDownloadURL().then((imageUrl) => {
					db.collection("posts").add({
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
					caption: caption,
					photoUrl: imageUrl,
					username: user.email.replace("@gmail.com", ""),
					profileUrl: user.photoURL

				    });
			    });

			    setCaption("");
			    setProgress(0);
			    setImage(null);
			    var preview1 = document.getElementById("image-preview");
			    preview1.style.display = "none";

		    }
		   )


	    };


	};

	const removeImage = () => {
	    var preview1 = document.getElementById("image-preview");
	    preview1.style.display = "none";
	  };



	return (
		<div className="createPost">
		   {user ? (
		   	<div className="createPost__loggedIn">
		   	   <p>Create Post</p>

		   	   <div className="createPost__loggedInCenter">

		   	    <textarea className="createPost__textarea"  rows="3" value={caption} onChange={(e) => setCaption(e.target.value)}
		   	    placeHolder="How are you today">
		   	    </textarea>


		   	    <div className="createPost__imagePreview">
		   	        <img onClick={() => removeImage()} id="image-preview" alt="" />
		              {progress === 0 ? (
		                <></>
		              ) : (
		                <CircularProgress
		                  className="circularProgress"
		                  variant="determinate"
		                  value={progress}
		                />
		              )}

				   	</div>


		   	   </div>
		   	   <div className="createPost__loggedInBottom">
		   	     <div className="createPost__imageUpload">
			   	     <label htmlFor="fileInput">
			   	       <AddAPhotoIcon style={{cursor:"pointer", fontSize: "20px"}}/>
			   	     </label>
		
			   	     <input id="fileInput" type="file" accept="image/*" onChange={handleChange} />
	                 
			   	   </div>
			   	   <button className="createPost__UploadBtn" onClick={handleUpload} style={{color: caption ? "#000": "lightGray"}}>
			   	   {`Upload ${progress !=0 ? progress: ""}`}</button>
			   	</div>

		   	   </div>

		   	) :
		   (
		    <div> 
		      <SigInBtn />
		      <p style={{marginLeft: "12px"}}>to post & Comment</p>
		    </div> 
		     )}
		    
		</div>

	)
}

