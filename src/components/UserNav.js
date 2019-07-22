import React from 'react';
import Logo from './Logo';
import logoGreen from '../img/logo-green.svg';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const logoIconStyle = {
  width: '40px',
  height: '40px',
  marginBottom: '-8px',
  marginLeft: '-2px',
};

const menuIconStyle = {
  width: '42px',
  height: '42px',
  padding: '5px',
  cursor: 'pointer',
};

const menuIconSelectedStyle = {
  ...menuIconStyle,
  background: '#20B11D',
  color: '#fff',
};

const UserNav = (props) => {
  return (
    <nav className="UserNav nav-main">
      <a
        href="#"
        onClick={(e) => props.handleClick(e)}
      >
        <AccountBoxIcon style={props.selectedTab === 'profile' ? { ...menuIconSelectedStyle } : { ...menuIconStyle }} />
        <div id="profile" className="tab-overlay" />
      </a>
      <h2>
        <Logo iconStyle={logoIconStyle} iconImage={logoGreen} />
      </h2>
      <a
        href="#"
        onClick={() => props.handleLogout()}
        className="logout"
      >
        <ExitToAppIcon style={{ ...menuIconStyle }} />
      </a>
    </nav>
  );
};

export default UserNav;
