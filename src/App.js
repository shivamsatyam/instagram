import React,{useState,useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import Logo from './images (5).png'
import Post from './Post'
import {db,auth} from './firebase'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import Instagram from  './download (5).jpeg'
import {Input} from '@material-ui/core'
import Imageupload from './Imageupload'

{/*screen brush*/}

function getModalStyle () {
  const top =  50
  const left =  50
  return {
    top:`${top}%`,
    left:`${left}%`,
    transform:`translate(-${top}%,-${left}%)`
  }
}

const useStyle = makeStyles((theme)=>({
  paper:{
    position:'absolute',
    width:400, 
    backgroundColor:theme.palette.background.paper,
    border:'2px solid #000',
    boxShadow:theme.shadows[5],
    padding:theme.spacing(2,4,3)
  }
}))

function App() {
  const classes = useStyle()
  const [posts,setPosts] = useState(null)
  const [open,setOpen] = useState(false)
  const [modalStyle,setModelStyle] =  useState(getModalStyle())
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [username,setUsername] = useState('')
  const [user,setUser]  = useState(null)
  const [openSignIn,setOpenSignIn] = useState(false)  

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        //the user is logged in
        console.log('the user is ',authUser)
        setUser(authUser)
        console.log('the user name is ',user)

      }else{
        //the user is logged out
        setUser(null)
      }
    })

    return ()=>{
      //perform some cleanup actions
      unsubscribe()
    }
  },[user,username])


  useEffect(()=>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      })))     
    })

    console.log('useEffect',posts)
  },[])


  const handleModal = (event)=>{
      setOpen(true)
  }  

  const signUp = (event)=>{
    
      console.log('the useState user is ',user)
      event.preventDefault()
      auth.createUserWithEmailAndPassword(email,password)
      .then((authUser)=>{
        console.log('the auht user is ',authUser)
        console.log('the',authUser.user)
        return authUser.user.updateProfile({
          displayName:username
        })
        
      })
      .catch((error)=>alert(error.message))

      setOpen(false)
  }

  const signIn  = (event)=>{
      event.preventDefault()
      console.log('the sign in ',user)
      auth.signInWithEmailAndPassword(email,password)
      .catch((error)=>{alert(error.message)})

      setOpenSignIn(false)
  }
  return (

    <div className="app">
      {
        user?.displayName?<Imageupload username={user.displayName}/>
        :<h1>you nedd to sign in first to uploaf file</h1>
        }
      <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        >
          <div className={classes.paper} style={modalStyle}>
            <form className="app__signup">
               <center><img src={Logo} className="app__headerImage" alt=""/></center>
                <Input required placeholder="username" type="text" value={username} onChange={e=>setUsername(e.target.value)}/>
                <Input required placeholder="email" type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
                <Input required placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <Button type="submit" onClick={signUp}>SignUp</Button>
            </form>
          </div>
        </Modal>

        {/*model for sign in*/}
        <Modal
        open={openSignIn}
        onClose={()=>{setOpenSignIn(false)}}
        >
          
          <div className={classes.paper} style={modalStyle}>
            <form className="app__signup">
               <center><img src={Logo} className="app__headerImage" alt=""/></center>
                <Input required placeholder="email" type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
                <Input required placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <Button type="submit" onClick={signIn}>SignIn</Button>
            </form>
          </div>
        </Modal>



        <div className="app__header">
          <img src={Logo} alt="Instagram" className="app__headerImage"/>
        </div>

        {
          user?
          <div><Button onClick={()=>auth.signOut()}>Logout</Button><Button onClick={()=>{setOpenSignIn(true)}}>Sign in</Button></div>
          :
            <div className="app__loginContainer">
                            
                            <Button onClick={handleModal}>Sign up</Button>
            </div>
          }

        {
          posts.map((props)=>{
            console.log('the props is ',props)
            return <Post key={props.id} username={props.post.username} caption={props.post.caption} imageUrl={props.post.imageUrl}/>
          })
        }
    </div>
  );
}

export default App;
