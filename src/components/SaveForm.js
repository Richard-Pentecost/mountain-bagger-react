import React, { Component } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

class SaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveName: '',
      error: false,
      errorValue: 'A route name must be given',
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

  onSubmit = (event) => {
    event.preventDefault();

    this.props.saveRoute(this.state.saveName);
  };

  render() {
    return (
      <div className="save-form">
        <div className="save-clear">
          <input ref={this.inputRef} type="text" name="save" onChange={this.onChange} value={this.state.saveName} placeholder="Name of route" />
          <button onClick={() => {this.props.saveStaticMap(this.state.saveName, this.props.boundingBox); this.props.toggleSaveForm(false)}}>
            <CheckCircleIcon />
            <span>
              Save route
            </span>
          </button>
          <button onClick={() => {
            this.props.clearRoute();
            this.props.toggleSaveForm(false);
          }}
          >
            <CancelIcon />
            <span>
              Clear route
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default SaveForm;
