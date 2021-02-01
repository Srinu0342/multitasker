import React, {useContext} from 'react';

import {UserContext} from '../Context/Context';

import {Redirect} from 'react-router-dom';

import firebase from 'firebase/app';

import Task from '../Component/Task';

function Home(){
  const context = useContext(UserContext);

  function logout(){
    localStorage.removeItem('userid');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('id');
    context.setUser(null);
    firebase.auth().signOut().then(
      () => console.log('logout')
    )
    .catch(error => console.log(error));
  }

  if (context.user === null){
    return(<Redirect to = '/signin' />);
  }
  else{
  return(
    <div>
    <h1>{context.user.userid}</h1>
    <Task />
    <button onClick={logout}>log out</button>
    </div>
  );}
}

export default Home;
