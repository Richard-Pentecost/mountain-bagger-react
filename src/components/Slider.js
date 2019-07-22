import React, { Component } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import '../style/Slider.scss';
import ExploreIcon from '@material-ui/icons/Explore';
import MapIcon from '@material-ui/icons/Map';
import InsertChartIcon from '@material-ui/icons/InsertChart';

const iconStyle = {
  width: '80px',
  height: '80px',
  display: 'inline',
  margin: '0 5px 5px 0',
  color: '#20B11D',
  float: 'left',
  filter: 'drop-shadow(0px 0px 3px #FFFFFF)',
};


class Slider extends Component {
  constructor() {
    super();
    this.state = {
      interval: null,
      counter: 0,
      index: 1,
    };
  }

  componentDidMount() {
    this.intervalCounter();
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    this.setState({ counter: 0, index: 1 });
  }

  intervalCounter = () => {
    const interval = setInterval(this.timer, 3000);
    this.setState({ interval });
  };

  timer = () => {
    const { counter } = this.state;
    const numberOfSlides = 3;
    this.setState({ counter: counter + 1 });
    this.setState({ index: (counter % numberOfSlides) });
  };

  render() {
    return (
      <AwesomeSlider className="Slider" selected={this.state.index}>
        <div className="slider-ad">
          <h3>
            Find your way
          </h3>
          <ExploreIcon style={iconStyle} />
          <p>
            with hi-res terrain maps and GPS tracker.
          </p>
        </div>
        <div className="slider-ad">
          <h3>
            Off the beaten path
          </h3>
          <MapIcon style={iconStyle} />
          <p>
            with custom routes and maps for offline use.
          </p>
        </div>
        <div className="slider-ad">
          <h3>
            Share your stats
          </h3>
          <InsertChartIcon style={iconStyle} />
          <p>
            with real-time route recording and detailed metrics.
          </p>
        </div>
      </AwesomeSlider>
    );
  }
}

export default Slider;
