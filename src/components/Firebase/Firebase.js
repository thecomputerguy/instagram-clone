
import firebase from 'firebase/app'
import 'firebase/auth'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };
  // Initialize Firebase
  
  class Firebase{
      constructor(){
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth()
      }

      doCreateUserWithUsernameAndPassword = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password)
      }

      doSignInWithEmailAndPassword = (email, password) => {
          this.auth.signInWithEmailAndPassword(email, password)
      }

      doSignOut = () => {
        this.auth.signOut()
      }

      doPasswordReset = (email) => {
        this.auth.sendPasswordResetEmail(email)
      }

      doPasswordUpdate = (password) => {
        this.auth.currentUser.updatePassword(password)
      }
  }

  export default Firebase