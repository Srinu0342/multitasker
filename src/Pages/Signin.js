import React, {useState, useContext} from 'react';

import {Link,Redirect} from 'react-router-dom';

import firebase from 'firebase/app';

import {UserContext} from '../Context/Context';

function Login(){
  const {user, setUser} = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  var userId = '';

  function firebaseLogin(){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        userId = res.user.uid;
        localStorage.id = userId;
        firebase.database().ref('users/'+userId).once('value')
        .then(snapshot => {
          localStorage.userid = snapshot.node_.children_.root_.value.value_;
          localStorage.email = email;
          localStorage.password = password;
          setUser({userid:localStorage.userid,id:userId});
      });
    })
    .catch(err => {console.log(err);
      document.getElementById('email').value = '';
      document.getElementById('email').placeholder = 'email';
      document.getElementById('password').value = '';
      document.getElementById('password').placeholder = 'password';
    });
  }

  function handleLogin(e){
    e.preventDefault();
    firebaseLogin();
  }
  if(user!=null){
    return(<Redirect to = '/' />);
  }
  else {
  return(
    <div>
    <h5>LOGIN</h5>
    <form onSubmit={handleLogin}>
    <p>Email : </p>
    <input id='email' type="email" placeholder='email' onChange={e=>{setEmail(e.target.value)}}/>
    <p>Password : </p>
    <input id='password' type="password" placeholder='password' onChange={e=>{setPassword(e.target.value)}}/><br/>
    <input type='submit' placeholder='submit'/>
    </form>
    <p>please <Link to = '/signup'>signup</Link> if you do not have a account</p>
    </div>
  );
}
}

export default Login;
