import React from 'react';
import classNameName from './Navbar.css'

function NavbarChat() {
    const LOgout=()=>{

    }
  return (
<nav className="navbar navbar-dark bg-primary navbar-expand-sm">
  <a className="navbar-brand" href="#">
    <p className='HA_navbar_text'>Chats</p>
    
  </a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-end" id="navbar-list-4">
    {/* <button onClick={LOgout}>LOGOUT</button> */}
    <ul className="navbar-nav">
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width="40" height="40" className="rounded-circle"/>
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Dashboard</a>
          <a className="dropdown-item" href="#">Edit Profile</a>
          <a className="dropdown-item" href="#">Log Out</a>
        </div>
      </li>   
    </ul>
  </div>
</nav>
  );
}

export default NavbarChat;