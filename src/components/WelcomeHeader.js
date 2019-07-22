import React, { Fragment } from 'react';
import '../style/WelcomeHeader.scss';
import Logo from './Logo';
import logoDark from '../img/logo-dark.svg';


const iconStyle = {
  width: '60px',
  height: '60px',
  marginBottom: '-12px',
  marginLeft: '-2px',
};

const WelcomeHeader = () => {
  return (
    <Fragment>
      <h2 className="welcome__h2">
        Welcome to
      </h2>
      <h1 className="welcome__h1">
        <Logo iconStyle={iconStyle} iconImage={logoDark} />
      </h1>
    </Fragment>
  );
};

export default WelcomeHeader;
