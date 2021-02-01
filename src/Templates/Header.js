import React, {useState,useContext} from 'react';
import { Nav, NavItem, NavLink  } from 'reactstrap';
import './header.css';

import {UserContext} from '../Context/Context';

function Header () {
  const { user } = useContext(UserContext);
  const [isTime, setTime] = useState();

  setInterval(()=>{
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    var date= h + ":" + m + ":" + s
    setTime(date);}
    , 1000);
  return(
    <div className='header'>
      <Nav >
      <NavItem className='nav-item'>
       <NavLink href='#' style={{'fontSize':'30px'}}>LOGO</NavLink>
      </NavItem>
      <NavItem className='nav-item'>
       <NavLink href='#'>{user?user.userid:''}</NavLink>
      </NavItem>
      <NavItem className='nav-item time'>
       <NavLink href='#'>Time Now :  {isTime}</NavLink>
      </NavItem>
      </Nav>
    </div>
  )
}

export default Header;
