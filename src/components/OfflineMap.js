import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';
import GpsFixedIcon from '../img/gps_fixed_24px.svg';

class OfflineMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pxX: '',
      pxY: '',
      outOfBounds: false,
    };
  }

  componentDidMount() {
    if (this.props.gpsLongitude) {
      this.convertLocationToPx(this.props.gpsLongitude, this.props.gpsLatitude);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { map, gpsLongitude, gpsLatitude } = this.props;
    console.log(map._id);

    if (prevProps.map && (map._id !== prevProps.map._id)) {
      this.convertLocationToPx(gpsLongitude, gpsLatitude);
    }
    if (gpsLongitude !== prevProps.gpsLongitude || gpsLatitude !== prevProps.gpsLatitude) {
      this.convertLocationToPx(gpsLongitude, gpsLatitude);
    }
  }

  convertLocationToPx = (longitudeGps, latitudeGps) => {
    const { width: mapWidth, height: mapHeight } = this.props.map.dimensions;
    const { ne, sw } = this.props.map.boundingBox;
    const lng = longitudeGps;
    const lat = latitudeGps;

    const imageNorthLat = ne[1]; // Latitude of the image's northern edge
    const imageSouthLat = sw[1]; // Latitude of the image's southern edge

    const imageWestLng = sw[0]; // Longitude of the image's western edge
    const imageEastLng = ne[0]; // Longitude of the image's eastern edge

    const imageLngPixels = mapWidth; // Width of the image in pixels
    const imageLatPixels = mapHeight; // Height of the image in pixels

    const pixelsPerLat = imageLatPixels / (imageNorthLat - imageSouthLat);
    const pixelsPerLng = imageLngPixels / (imageEastLng - imageWestLng);

    if (lng < imageWestLng || lng > imageEastLng || lat > imageNorthLat || lat < imageSouthLat) {
      this.setState({ outOfBounds: true });
    } else {
      const x = (lng - imageWestLng) * pixelsPerLng;
      const y = Math.abs(lat - imageNorthLat) * pixelsPerLat;

      this.setState({ pxX: x, pxY: y, outOfBounds: false });
    }
  };

  render() {
    const { map, handleCloseOfflineMap } = this.props;

    const imageContainerStyle = {
      width: `${map.dimensions.width}px`,
      height: `${map.dimensions.height}px`,
    };

    const gpsIconStyle = {
      position: 'absolute',
      top: this.state.pxY - 12,
      left: this.state.pxX - 12,
    };

    return (
      <div className="offline-map" data-simplebar>
        <div className="offline-map__options">
          <h2>{map.name}</h2>
          <button onClick={() => handleCloseOfflineMap()}>Close</button>
        </div>
        <div className="offline-map__image-container" style={imageContainerStyle}>
          <img src={this.props.map.img} />
          {this.state.pxY && !this.state.outOfBounds && <img src={GpsFixedIcon} style={gpsIconStyle} className="gps-icon" />}
        </div>
        {
          (this.props.locationWatchId !== null && this.props.gpsLongitude && this.state.outOfBounds) &&
            (
              <div className="offline-map__bounds-error">
                Your GPS location is outside map boundaries!
              </div>
            )
        }
      </div>
    );
  }
}

export default OfflineMap;
