import React, { Component } from 'react';
import axios from 'axios';
import TokenManager from '../utils/token-manager';
import '../style/Home.scss';
import loadingGif from '../img/loading.gif';

import LocationNav from './LocationNav';
import UserNav from './UserNav';
import ToolsNav from './ToolsNav';
import Weather from './Weather';
import Metrics from './Metrics';
import Saved from './Saved';
import CreateNew from './CreateNew';
import MapContainer from './MapContainer';
import OfflineMap from './OfflineMap';
import LocationSearchInput from './LocationSearchInput';
import Profile from './Profile';

const BASE_URL = 'https://m-bagger.herokuapp.com/';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      loading: false,
      gpsLongitude: '',
      gpsLatitude: '',
      locationFocus: '',
      gpsSpeed: '',
      gpsAltitude: '',
      gpsHeading: '',
      locationWatchId: null,
      searchLocationCoords: '',
      offlineMap: '',
      routes: '',
    };
    this.searchNode = React.createRef();
    this.searchInput = React.createRef();
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentDidMount() {
    this.getSavedRoutes();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  closeOfflineMap = () => {
    this.setState({ offlineMap: '' });
  };

  getSavedRoutes = () => {
    axios
      .get(`${BASE_URL}/routes/${this.props.user.id}`, {
        headers: { Authorization: TokenManager.getToken() },
      })
      .then(response => {
        this.setState({
          routes: response.data,
        });
        this.toggleLoading(false);
      })
      .catch(error => {
        console.log(error, 'error');
        this.toggleLoading(false);
      });
  };

  handleClick = (e) => {
    if (this.state.selectedTab === 'search' && !this.searchNode.current.contains(e.target)) {
      this.resetSelectedTab();
    }
  };

  handleSearchLocation = (locationCoords) => {
    this.setState({ searchLocationCoords: locationCoords });
  };

  resetSelectedTab = () => {
    this.setState({ selectedTab: 'home' });
  };

  selectTab = (e) => {
    e.preventDefault();
    const selectedId = e.target.id;
    this.setState({ selectedTab: selectedId });
  };

  setLocationFocus = (string) => {
    this.setState({ locationFocus: string });
  };

  openOfflineMap = (map) => {
    this.setState({ offlineMap: map });
    this.resetSelectedTab();
  };

  stopWatchingLocation = () => {
    navigator.geolocation.clearWatch(this.state.locationWatchId);
    this.setState({ gpsLongitude: '', gpsLatitude: '', locationWatchId: null });
  };

  toggleLoading = (boolean) => {
    this.setState({ loading: boolean });
  };

  watchUserLocation = () => {
    const success = (position) => {
      const { latitude, longitude, speed, altitude, heading } = position.coords;
      this.setState({
        gpsLongitude: longitude,
        gpsLatitude: latitude,
        gpsSpeed: speed,
        gpsAltitude: altitude,
        gpsHeading: heading,
      });
      this.toggleLoading(false);
    };

    const error = () => {
      this.toggleLoading(false);
      console.log('Unable to retrieve your location');
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: 60000,
    };

    if (!navigator.geolocation) {
      this.toggleLoading(false);
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating…');
      this.setState({
        locationWatchId: navigator.geolocation.watchPosition(success, error, options),
      });
    }
  };

  handleLogout = () => {
    this.props.handleLogout();
  };

  render() {
    const {
      selectedTab,
      locationFocus,
      loading,
      gpsLongitude,
      gpsLatitude,
      gpsAltitude,
      gpsSpeed,
      gpsHeading,
      locationWatchId,
      searchLocationCoords,
      offlineMap,
    } = this.state;

    console.log(this.state.selectedTab);

    return (
      <div className="Home">
        <UserNav
          handleLogout={this.handleLogout}
          handleClick={this.selectTab}
          selectedTab={selectedTab}
        />
        <LocationNav
          handleClick={this.selectTab}
          locationWatchId={locationWatchId}
          gpsAltitude={gpsAltitude}
          gpsSpeed={gpsSpeed}
          gpsHeading={gpsHeading}
          onWatchUserLocation={this.watchUserLocation}
          onStopWatchingLocation={this.stopWatchingLocation}
          onLocationFocus={this.setLocationFocus}
          onToggleLoading={this.toggleLoading}
        />
        <div className="content">
          <div>
            <MapContainer
              userId={this.props.user.id}
              selectedTab={selectedTab}
              locationFocus={locationFocus}
              gpsLongitude={gpsLongitude}
              gpsLatitude={gpsLatitude}
              searchLocationCoords={searchLocationCoords}
              onToggleLoading={this.toggleLoading}
            />
          </div>
          {selectedTab === 'profile' &&
            (
              <Profile
                user={this.props.user}
              />
            )
          }
          {selectedTab === 'search' &&
            (
              <LocationSearchInput
                inputRef={this.searchInput}
                searchRef={this.searchNode}
                onSearchLocation={this.handleSearchLocation}
                onLoading={this.toggleLoading}
                onResetSelectedTab={this.resetSelectedTab}
                handleCloseOfflineMap={this.closeOfflineMap}
              />
            )
          }
          {selectedTab === 'weather' && <Weather />}
          {selectedTab === 'metrics' &&
            (
            <Metrics
              routes={this.state.routes}
              onToggleLoading={this.toggleLoading}
            />
            )
          }
          {selectedTab === 'saved' &&
            (
              <Saved
                {...this.props}
                onToggleLoading={this.toggleLoading}
                handleOpenOfflineMap={this.openOfflineMap}
                routes={this.state.routes}
                getSavedRoutes={this.getSavedRoutes}
              />
            )
          }
          {selectedTab === 'create-new' && <CreateNew />}
          {offlineMap &&
            (
              <OfflineMap
                map={offlineMap}
                handleCloseOfflineMap={this.closeOfflineMap}
                gpsLongitude={gpsLongitude}
                gpsLatitude={gpsLatitude}
                locationWatchId={locationWatchId}
              />
            )
          }
          {loading && <div className="loading-gif"><img src={loadingGif} /></div>}
        </div>
        <ToolsNav
          handleClick={this.selectTab}
          selectedTab={selectedTab}
        />
      </div>
    );
  }
}

export default Home;
