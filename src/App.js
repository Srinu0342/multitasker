import React, {useState} from 'react';

import './App.css';

import Header from './Templates/Header';
import Footer from './Templates/Footer';

import First from './Pages/First';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from './Config/Config';

import {UserContext} from './Context/Context';

firebase.initializeApp(firebaseConfig);

function App() {

  let tempUser = null;
  let email = null;
  let password = null;

  if (localStorage.email){
   email = localStorage.email;
   password = localStorage.password;
   tempUser = {userid:localStorage.userid,id:localStorage.id};
   firebase.auth().signInWithEmailAndPassword(email, password)
   .then(
     res => {
       var userId = '';
       userId = res.user.uid;
       firebase.database().ref('users/'+userId).once('value')
       .then(snapshot =>{
         localStorage.userid = snapshot.node_.children_.root_.value.value_;
         localStorage.id=userId;
         tempUser = {userid:localStorage.userid,id:userId};
       })
     }
   )
   .catch(error => console.log(error))
   }

  const [user,setUser] = useState(tempUser);

  return (
    <div className="App">
    <UserContext.Provider value={{user,setUser}}>
      <Header/>
      <First/>
      <Footer/>
    </UserContext.Provider>
    </div>
  );
}

export default App;
