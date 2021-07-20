import React from 'react';
import './nav.css'

import {Link} from 'react-router-dom';
import {auth} from '../firebase'

import { ReactComponent as DashboardIcon } from '../Icons/dashboard.svg';
import { ReactComponent as CalenderIcon } from '../Icons/Calender.svg'
import { ReactComponent as UserIcon } from '../Icons/user.svg';
import { ReactComponent as LogoutIcon } from '../Icons/log-out.svg';
import GroupIcon from '@material-ui/icons/Group';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';

const IconColour = createMuiTheme({
  palette: {
      primary: { main: "#11a3e7" },
      secondary: { main: "#11a3e7" }, 
  },
});

function Nav() {

    const user = auth.currentUser

  return (
    <nav className="navbar">
        <ul className="navbar-nav">
          <li className="logo">
              <Link to='/login' className="">
              {user ? <img src={user.photoURL} className='user-photo'/> : <UserIcon className="logo-icon" fill="white" />}
              <span className="link-text">{user ? <h5 className=''>{user.displayName}</h5> : ""}</span>
              </Link>
          </li>
          <li className="nav-item">
          <Link to='/' className="nav-link link-icon">
              <DashboardIcon className="nav-icon" fill=" #11a3e7" />
              <span className="link-text">Dashboard</span>
              </Link>
          </li>

          <li className="nav-item">
          <Link to='/roster' className="nav-link link-icon">
              <CalenderIcon className="nav-icon" fill=" #11a3e7" />
              <span className="link-text">Roster</span>
            </Link>
          </li>
          <MuiThemeProvider theme={IconColour}>
          <li className="nav-item">
          <Link to='/team' className="nav-link">
              <GroupIcon fontSize='large' className="nav-icon" color="primary" />
              <span className="link-text">Team</span>
            </Link>
          </li>

          <li className="nav-item">
            <a href="/" className="nav-link">
              <CheckBoxOutlinedIcon fontSize='large' className="nav-icon" color="primary" />
              <span className="link-text">Todo</span>
            </a>
          </li>

          <li className="nav-item" onClick={() => auth.signOut()}>
          <a className="nav-link" >
              <LogoutIcon className="nav-icon" fill=" #11a3e7" />
              <span className="link-text">Logout</span>
             </a>
          </li>
          </MuiThemeProvider>
        </ul>
      </nav>
  );
}



export default Nav;