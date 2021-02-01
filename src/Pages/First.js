import React from 'react';
import './First.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import SignUp from  './Signup';
import SignIn from './Signin';
import Home from './Home';

function signIn(){
  return(
    <div>
    <div className='intro'>
    <h4>App Intro</h4>
    <p>
    Introduction about the application
    </p>
    </div>
    <div className = 'enterapp'>
    <SignIn />
    </div>
    </div>
  );
}

function signUp(){
  return(
    <div>
    <div className='intro'>
    <h4>App Intro</h4>
    <p>
    Introduction about the application
    </p>
    </div>
    <div className = 'enterapp'>
    <SignUp />
    </div>
    </div>
  );
}

function First(){
  return(
    <div className='body'>
    <Router>
    <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/signin' component={signIn}/>
    <Route exact path='/signup' component={signUp}/>
    </Switch>
    </Router>
    <h1>First</h1>
    </div>
  );
}

export default First;
