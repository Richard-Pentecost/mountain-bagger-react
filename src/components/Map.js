import React from 'react';
import ReactMapboxG1, { Layer, Feature, Marker } from 'react-mapbox-gl';
import SaveForm from './SaveForm';
import SaveMapForm from './SaveMapForm';
import '../style/Map.scss';
import GpsFixedIcon from '../img/gps_fixed_24px.svg';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import PlaceIcon from '@material-ui/icons/Place';

const MapBox = ReactMapboxG1({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const downloadIconStyle = {
  width: '42px',
  height: '42px',
  padding: '5px',
  position: 'absolute',
  top: '1rem',
  right: '1rem',
};

const placeIconStyle = {
  width: '24px',
  height: '24px',
  color: '#0F590D',
};

const directionsIconStyle = {
  width: '30px',
  height: '24px',
  color: 'white',
  borderRadius: '100px',
  background: '#20B11D',
  padding: '8px',
  transition: 'all .3s',
};

let center;
let bounds;

const Map = (props) => {

  const {
    selectedTab,
    gpsLongitude,
    gpsLatitude,

    onClearRoute,
    onGenerateStaticMap,
    onGetCenterCoords,
    onHandleModeOfTransport,
    onMapClick,
    onSaveRoute,
    onToggleSaveForm,
    onToggleMapSaveForm,
    onZoom,

    width,
    height,
    longitude,
    latitude,
    zoom,
    marker,
    endLongitude,
    endLatitude,
    route,
    walkingOrCycling,
    duration,
    distance,
    saveForm,
    saveMapForm,
  } = props;

  // const modeOfTravel = walkingOrCycling.charAt(0).toUpperCase() + walkingOrCycling.slice(1);
  console.log('WIDTH', width, 'HEIGHT', height);
  return (
    <div className="map_container">
      <div ref={props.mapRef} className={selectedTab === 'create-new' ? 'map_div crosshair' : 'map_div'}>
        <MapBox
          style="mapbox://styles/thepunkyone/cjx34gegp2owc1cqym1n43a11"
          center={[longitude, latitude]}
          containerStyle={{
            width: width,
            height: height,
          }}
          movingMethod="jumpTo"
          onClick={onMapClick}
          zoom={zoom}
          onZoom={onZoom}
          
          onZoomEnd={(map) => {bounds = map.getBounds(); center = map.getCenter(); onGetCenterCoords(center)}}
          onMoveEnd={(map) => {bounds = map.getBounds(); center = map.getCenter(); onGetCenterCoords(center)}}
          onStyleLoad={(map) => {bounds = map.getBounds(); center = map.getCenter(); onGetCenterCoords(center)}}
        >
          <Marker
            id="marker-start"
            coordinates={marker}
            anchor="bottom"
          >
            <PlaceIcon style={{...placeIconStyle, color: '#20B11D'}} />
          </Marker>
          {
            endLongitude && selectedTab === 'create-new' &&
            (
              <Marker
                id="marker-end"
                coordinates={[endLongitude, endLatitude]}
                anchor="bottom"
              >
                <PlaceIcon style={placeIconStyle} />
              </Marker>
            )
          }
          
          {
            Object.keys(route).length !== 0 && selectedTab === 'create-new' &&
            (
              <Layer
                type="line"
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
                paint={{
                  'line-color': '#3887b4',
                  'line-width': 5,
                  'line-opacity': 0.75,
                }}
              >
                <Feature coordinates={route} />
              </Layer>
            )
          }
          {
           gpsLongitude && gpsLatitude &&
           (
             <Marker
               coordinates={[gpsLongitude, gpsLatitude]}
               anchor="center"
               style={{ width: '24px', height: '24px' }}
             >
               <img src={GpsFixedIcon} />
             </Marker>
           )
          }
        </MapBox>
      </div>
      { selectedTab !== 'search' && !(saveForm && selectedTab === 'create-new') && !saveMapForm &&
        (
          <CloudDownloadIcon
            style={{ ...downloadIconStyle }}
            id="download-icon"
            onClick={() => {
              onToggleMapSaveForm(true);
            }}
          />
        )
      }
      { selectedTab !== 'search' && !(saveForm && selectedTab === 'create-new') && saveMapForm &&
        (
          <SaveMapForm
            toggleSaveForm={onToggleMapSaveForm}
            saveStaticMap={onGenerateStaticMap}
          />
        )
      }
      { route && selectedTab === 'create-new' && !saveMapForm &&
        (
        <div className="route-options">
          <div className="save-options">
            <div className="modes-of-transport">
              <button
                onClick={(e) => onHandleModeOfTransport(e)}
              >
                <DirectionsWalkIcon
                  style={
                    walkingOrCycling === 'walking' ?
                      directionsIconStyle : {...directionsIconStyle, background: '#888888'}
                  }
                />
                <div id="walking" className="tab-overlay" />
              </button>
              <button
                onClick={(e) => onHandleModeOfTransport(e)}
              >
                <DirectionsBikeIcon
                  style={ 
                    walkingOrCycling === 'cycling' ?
                      directionsIconStyle : {...directionsIconStyle, background: '#888888'}
                  }
                />
                <div id="cycling" className="tab-overlay" />
              </button>
            </div>
            {
              duration &&
                (
                <div className="route-estimates">
                  <div className="routeInfomation">
                    {/* <div className="modeOfTransport">
                      {`${modeOfTravel}:`}
                    </div> */}
                    <div className="distance">
                      {`Distance: ${distance}km`}
                    </div>
                    <div className="duration">
                      {`Time: ${duration}mins`}
                    </div>
                  </div>
                </div>
                )
            }
            { !saveForm && !saveMapForm &&
              (
              <div className="save-clear">
                <button onClick={() => onToggleSaveForm(true)}>
                  <CheckCircleIcon />
                  <span>
                    Save
                  </span>
                </button>
                <button onClick={onClearRoute}>
                  <CancelIcon />
                  <span>
                    Clear
                  </span>
                </button>
              </div>
              )
            }
            { saveForm &&
              (
              <SaveForm
                boundingBox={bounds}
                saveRoute={onSaveRoute}
                saveStaticMap={onGenerateStaticMap}
                clearRoute={onClearRoute}
                toggleSaveForm={onToggleSaveForm}
              />
              )
            }
          </div>
        </div>
        )
      }
    </div>
  );
};

export default Map;
