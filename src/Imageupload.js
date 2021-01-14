import React,{useState} from 'react'
import Button from '@material-ui/core/Button'
import {storage,db} from './firebase'
import firebase from 'firebase'

function Imageupload (username) {
	console.log('image upload uername ',username)
	const [caption, setCaption] = useState('')
	const [image, setImage] = useState(null)
	const [progress, setProgress] = useState(0)

	function handleChange (event) {
		if (event.target.files[0]) {
			setImage(event.target.files[0])
			console.log("The image file is ",event.target.files)
		}
	}

	function handleUpload (even) {
		const uploadTask = storage.ref(`/images/${image.name}`).put(image)
		uploadTask.on(
			"state_changed",(snapshot)=>{
				//progress bar function
				console.log('the snapshot is ',snapshot)	
				const progress = Math.round(
					(snapshot.bytesTransferred/snapshot.totalBytes)*100
					)
				setProgress(progress)
			},
			(error)=>{
				//Error function.....
				console.log('the upload error is ',error)
				alert(error.message)
			},
			()=>{
				//complete function
				storage.ref("images")
				.child(image.name)
				.getDownloadURL() 
				.then((url)=>{
					
					db.collection('posts').add({
						timestamp:firebase.firestore.FieldValue.serverTimestamp(),
						caption:caption,
						imageUrl:url,
						username:username
					})

					setCaption('')
					setProgress(0)
					setImage(null)
				})
			}
			)
	}

	return(
		<div>
			<progress value={progress} max="100"/>
			<input type="text" value={caption} onChange={(event)=>{setCaption(event.target.value)}} placeholder="Enter your caption.."/>
			<input type="file" onChange={handleChange}/>
			<Button onClick={handleUpload}>
				upload
			</Button>
		</div>
		)
}


export default Imageupload








































