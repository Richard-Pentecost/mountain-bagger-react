import React, { Component } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

class SaveMapForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveName: '',
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  onChange = (event) => {
    this.setState({
      saveName: event.target.value,
    });
  };

  render() {
    return (
      <div className="route-options save-form">
        <div className="save-clear">
          <h3>Save Offline Map</h3>
          <input ref={this.inputRef} type="text" name="save" onChange={this.onChange} value={this.state.saveName} placeholder="Name of map" />
          <button onClick={() => {
            this.props.saveStaticMap(this.state.saveName, this.props.boundingBox, 'mapOnly');
            this.props.toggleSaveForm(false);
          }}
          >
            <CheckCircleIcon />
            <span>
              Save map
            </span>
          </button>
          <button onClick={() => {
            this.props.toggleSaveForm(false);
          }}
          >
            <CancelIcon />
            <span>
              Cancel
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default SaveMapForm;
