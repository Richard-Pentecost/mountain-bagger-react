import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import '../style/LocationSearchInput.scss';
import ClearIcon from '@material-ui/icons/Clear';

const searchOptions = {
  locationBias: { radius: 30000, center: { lat: 54, lng: -3 } },
};

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      input: '',
    };
    this.input = React.createRef();
  }

  componentDidMount() {
    this.props.inputRef.current.focus();
  }

  clearInput = (e) => {
    e.preventDefault();
    this.setState({ input: '' }, () => {
      this.props.inputRef.current.value = '';
    });
  };

  handleFieldChange = (e) => {
    e.preventDefault();
    this.setState({ input: e.target.value });
  };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(
        this.props.onLoading(true),
        this.props.onSearchLocation(''),
        this.props.onResetSelectedTab(),
        this.props.handleCloseOfflineMap()
      )
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.onSearchLocation([latLng.lng, latLng.lat]);
        this.props.onLoading(false);
      })
      .catch(error => {
        console.error('Error', error);
        this.props.onLoading(false);
      });
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="SearchBox" ref={this.props.searchRef}>
            <div className="SearchBox__search-input">
              <input
                ref={this.props.inputRef}
                type="text"
                value={this.state.input}
                onChange={(e) => this.handleFieldChange(e)}
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="clear-search">
                <ClearIcon onClick={(e) => this.clearInput(e)} />
              </div>
            </div>
            <div className="autocomplete-dropdown-container">
              {/* {loading && <div className="search-loading">Loading...</div>} */}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
