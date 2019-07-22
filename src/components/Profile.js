import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';

const Profile = ({ user }) => {

  const iconStyle = {
    width: '36px',
    height: '36px',
    verticalAlign: 'middle',
    marginRight: '10px',
  };

  return (
    <div className="menu-overlay">
      <h1>
        <AccountCircleIcon style={{ ...iconStyle, marginTop: '-5px' }} />
        {`${user.firstName} ${user.lastName}`}
      </h1>
      <h3>
        <EmailIcon style={iconStyle} />
        {user.email}
      </h3>
    </div>
  );
};

export default Profile;
