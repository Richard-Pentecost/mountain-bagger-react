import React, { Fragment } from 'react';

const Logo = (props) => {
  const { iconStyle, iconImage } = props;

  return (
    <Fragment>
      MountainBagger
      <img src={iconImage} style={iconStyle} />
    </Fragment>
  );
};

export default Logo;
