import firebase from 'firebase'

const firebaseApp = firebase.initializeApp(
{
  apiKey: "AIzaSyDzsBW9k2H-zFxQFHXBh9W6asXch3WpM-s",
  authDomain: "instagram-clone-shivam.firebaseapp.com",
  projectId: "instagram-clone-shivam",
  storageBucket: "instagram-clone-shivam.appspot.com",
  messagingSenderId: "794148521821",
  appId: "1:794148521821:web:f34af3f8ac67d1fc020ab4",
  measurementId: "G-E1R5JP2MGQ"
})



const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()



export {db,auth,storage}






















