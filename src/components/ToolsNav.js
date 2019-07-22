import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import MapIcon from '@material-ui/icons/Map';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HomeIcon from '@material-ui/icons/Home';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

const menuIconLargeStyle = {
  width: '60px',
  height: '60px',
  padding: '5px',
};

const menuIconLargeStyleFirstChild = {
  ...menuIconLargeStyle,
  paddingLeft: '9px',
};

const menuIconLargeStyleLastChild = {
  ...menuIconLargeStyle,
  paddingRight: '9px',
};

const selectedIconLargeStyle = {
  ...menuIconLargeStyle,
  color: '#FFFFFF',
  backgroundColor: '#20B11D',
};

const selectedIconLargeStyleFirstChild = {
  ...menuIconLargeStyleFirstChild,
  ...selectedIconLargeStyle,
};

const selectedIconLargeStyleLastChild = {
  ...menuIconLargeStyleLastChild,
  ...selectedIconLargeStyle,
};

const ToolsNav = (props) => {
  const { selectedTab, handleClick } = props;

  return (
    <nav className="ToolsNav nav-main">
      <Link
        to="#"
        onClick={(e) => handleClick(e)}
      >
        <WbSunnyIcon
          style={selectedTab === 'weather' ? selectedIconLargeStyleFirstChild : menuIconLargeStyleFirstChild}
        />
        <div id="weather" className="tab-overlay" />
      </Link>
      <Link
        to="#"
        onClick={(e) => handleClick(e)}
      >
        <InsertChartIcon
          style={selectedTab === 'metrics' ? selectedIconLargeStyle : menuIconLargeStyle}
        />
        <div id="metrics" className="tab-overlay" />
      </Link>
      <Link
        to="/home"
        onClick={(e) => {
          props.history.push('/home');
          handleClick(e);
        }}
      >
        <HomeIcon
          style={selectedTab === 'home' ? selectedIconLargeStyle : menuIconLargeStyle}
        />
        <div id="home" className="tab-overlay" />
      </Link>
      <Link
        to="#"
        onClick={(e) => handleClick(e)}
      >
        <MapIcon
          style={selectedTab === 'saved' ? selectedIconLargeStyle : menuIconLargeStyle}
        />
        <div id="saved" className="tab-overlay" />
      </Link>
      <Link
        to="#"
        onClick={(e) => handleClick(e)}
      >
        <AddBoxIcon
          style={selectedTab === 'create-new' ? selectedIconLargeStyleLastChild : menuIconLargeStyleLastChild}
        />
        <div id="create-new" className="tab-overlay" />
      </Link>
    </nav>
  );
};

export default withRouter(ToolsNav);