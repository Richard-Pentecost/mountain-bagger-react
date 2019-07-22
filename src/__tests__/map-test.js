import React, { Component } from 'react';
import ReactMapboxG1, { Layer, Feature } from 'react-mapbox-gl';
// import '../styles/map.css';

const MapBox = ReactMapboxG1({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class MapTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -3.2116,
      lat: 54.4542,
      endLng: -3.209245,
      endLat: 54.45581,
      route: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [-3.211555, 54.454235],
              [-3.2105, 54.454357],
              [-3.209996, 54.454647],
              [-3.209816, 54.45494],
              [-3.20963, 54.455429],
              [-3.209245, 54.45581],
            ],
          },
        },
      },
    };
  }

  render() {
    const { lng, lat, endLng, endLat, route } = this.state;
    return (
      <div>
        <MapBox
          style="mapbox://styles/mapbox/outdoors-v10/"
          center={[lng, lat]}
          containerStyle={{
            height: '90vh',
            width: '90vh',
          }}
        >
          <Layer
            type="circle"
            
            paint={{
              'circle-color': '#ff5200',
              'circle-stroke-width': 1,
              'circle-stroke-color': '#fff',
              'circle-stroke-opacity': 1,
            }}
          >
            <Feature coordinates={[lng, lat]} />
          </Layer>
          <Layer
            type="circle"
           
            paint={{
              'circle-color': '#ff5200',
              'circle-stroke-width': 1,
              'circle-stroke-color': '#fff',
              'circle-stroke-opacity': 1,
            }}
          >
            <Feature coordinates={[endLng, endLat]} />
          </Layer>
          <Layer
            id="route"
            type="line"
            sourceId={route}
            layout={{
              'line-join': 'round',
              'line-cap': 'round',
            }}
            paint={{
              'line-color': '#3887b4',
              'line-width': 5,
              'line-opacity': 0.75,
            }}
          />
        </MapBox>
      </div>
    );
  }
}

export default MapTest;
