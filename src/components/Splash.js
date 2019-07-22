import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Splash.scss';
import WelcomeHeader from './WelcomeHeader';
import Slider from './Slider';

const Splash = () => {
  return (
    <div className="Splash">
      <WelcomeHeader />
      <Link to="/login" className="action">Sign in</Link>
      <Link to="/register" className="action outlined transparent">Register</Link>
      <Slider />
      <Link to="/register" className="action outlined slider-button">Get started</Link>
      <h3 className="tagline">
        MountainBagger
        <br />
        Climb every mountain.
      </h3>
    </div>
  );
};

export default Splash;
