import React from 'react';
import { Link } from 'react-router-dom';
import Map from './Map';
// import Test from './test';
// import Search from './Search';
// import '../styles/create-route.css';
// import MapTest from './map-test';

const CreateRoute = (props) => {
  console.log(props.location.createRouteProps);
  return (
    <div>
      <Link to="/">Profile Page</Link>
      <Map {...props} />
    </div>
  );
};

export default CreateRoute;
