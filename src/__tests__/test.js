import React, { Component } from 'react';
import Geocoder from 'react-mapbox-gl-geocoder';
import ReactMapboxGL from 'react-mapbox-gl';
// import './index.css'

const BASE_URL = 'https://api.mapbox.com/';
const ACCESS_TOKEN = 'access_token=pk.eyJ1IjoidGhlcHVua3lvbmUiLCJhIjoiY2p4MzJjd3g1MG9wZDN5cGtwb2VwY2x0NyJ9.S0cbsxNX2LA2_Zcud97cYw';


const mapAccess = {
  mapboxApiAccessToken: 'pk.eyJ1IjoidGhlcHVua3lvbmUiLCJhIjoiY2p4MzJjd3g1MG9wZDN5cGtwb2VwY2x0NyJ9.S0cbsxNX2LA2_Zcud97cYw',
};

const MapBox = ReactMapboxGL({
  accessToken: 'pk.eyJ1IjoidGhlcHVua3lvbmUiLCJhIjoiY2p4MzJjd3g1MG9wZDN5cGtwb2VwY2x0NyJ9.S0cbsxNX2LA2_Zcud97cYw',
});

const mapStyle = {
  width: '100%',
  height: 600,
};

const queryParams = {
  location: 'us',
};

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {},
      lng: -3.2116,
      lat: 54.4542,
    };
  }

  componentDidMount() {
    fetch(`${BASE_URL}geocoding/v5/mapbox.places/Shrewsbury.json?${ACCESS_TOKEN}`)
      .then(data => {
        console.log(data);
      });
  }

  onSelected = (viewport, item) => {
    this.setState({ viewport });
    console.log('Selected: ', item);
  };

  render() {
    const { viewport, lng, lat } = this.state;

    return (
      <div>
        <Geocoder
          {...mapAccess}
          onSelected={this.onSelected}
          viewport={viewport}
          // hideOnSelect={ true }
          queryParams={queryParams}
        />

        <MapBox
          style="mapbox://styles/mapbox/outdoors-v9"
          center={[lng, lat]}
          containerStyle={{
            height: '50vh',
            width: '50vh',
          }}
        />
      </div>
    );
  }
}

export default Test;
