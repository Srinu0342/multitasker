import React, {useState, useContext} from 'react';

import {Redirect} from 'react-router-dom';

import firebase from 'firebase/app';

import {UserContext} from '../Context/Context';

function Signup(){

  const {user, setUser} = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  var userId = '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

function firebaseSignUp(){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res => {
    userId = res.user.uid;
    localStorage.id = userId;
    firebase.database().ref('users/'+userId).set({
        name:firstName + ' ' +lastName,
        email:email,
        taskList: [0]
      });
    firebase.database().ref('users/'+userId).once('value')
    .then(snapshot => {
    localStorage.userid = snapshot.node_.children_.root_.value.value_;
    localStorage.email = email;
    localStorage.password = password;
    setUser({userid:localStorage.userid,id:userId});
  });
  })
  .catch(err => console.log(err));
}

  async function handleSignup(e){
    e.preventDefault();
    await firebaseSignUp();
  }

  if(user!=null){
    return(<Redirect to = '/' />);
  }
  else {
  return(
    <div>
    <h5>Signup</h5>
    <form onSubmit={handleSignup}>
    <p> First Name : </p>
    <input type = 'text' placeholder ='First Name' onChange={e=>{setFirstName(e.target.value)}}/>
    <p> Last Name : </p>
    <input type = 'text' placeholder ='Last Name' onChange={e=>{setLastName(e.target.value)}}/>
    <p>Email : </p>
    <input name='email' type="email" placeholder="email" onChange={e=>{setEmail(e.target.value)}}/>
    <p>Password : </p>
    <input name='password' type="password" placeholder='' onChange={e=>{setPassword(e.target.value)}}/>
    <p>Reenter password : </p>
    <input name='password-check' type="password" placeholder='' onChange={(e)=>{
      if(e.target.value !== password){
        console.log('Unmatched');
      }
      else{
        console.log('Matched');
      }
    }}/><br/>
    <input type='submit' placeholder='signup'/>
    </form>
    </div>
  );
}
}

export default Signup;
