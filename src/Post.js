import React from 'react'
import Logo from './logo.svg'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
function Post ({username,caption,imageUrl}) {
	console.log(username,caption,imageUrl)
	return(
		<div className="post">
			<div className="post__header">
				<Avatar
				className="post__avatar"
				alt="Shivam Boss"
				src={imageUrl}
				/>	
				
			<h3>{username}</h3>
			
			</div>
			
			<img src={Logo} className="post__image" alt="post and caption"/>
			
			<h4 className="post__text"><strong>{username}</strong>{caption}</h4>
			
		</div>
		)
}


export default Post