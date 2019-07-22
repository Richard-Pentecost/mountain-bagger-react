import React from 'react';
import MapboxElevation from 'mapbox-elevation';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import moment from 'moment';

// const wayPoints = [
//   [-3.211556,54.454235],[-3.21208,54.45465],[-3.213161,54.454742],[-3.2145,54.455131],[-3.215379,54.455181],[-3.2166,54.455593],[-3.217155,54.455558],[-3.218654,54.456306],[-3.218401,54.456729],[-3.217723,54.457077],[-3.218925,54.458412],[-3.219466,54.458705],[-3.220969,54.458599],[-3.222998,54.457878],[-3.223542,54.457847],[-3.223563,54.457603],[-3.224181,54.457626],[-3.22417,54.457057],[-3.224722,54.456928],[-3.224634,54.456542],[-3.225014,54.456485],[-3.225019,54.456287],[-3.22612,54.455764],[-3.228139,54.455432],[-3.229483,54.454872],[-3.233145,54.45412],[-3.233984,54.45412],[-3.235611,54.454448],[-3.237644,54.455184],[-3.238345,54.455036],[-3.238508,54.455173],[-3.240834,54.455493],[-3.242049,54.455482],[-3.243083,54.455905],[-3.244618,54.455837],[-3.246058,54.455493],[-3.246815,54.455101]
// ];

const getElevation = MapboxElevation(process.env.REACT_APP_MAPBOX_TOKEN);

const getElev2 = (point) => new Promise((resolve, reject) => {
  getElevation(point, (err, result) => {
    if (err) reject(err);
    else resolve(result);
  });
});

// const altitudeArray = [];
// // const data = [];
// const merged = null;
// const dataKeys = ['distance', 'Meters'];
// const distance = [1, 2, 3, 4, 5, 6];

// // dummy graph data
// const data = [
//   {
//     distance: 0, elevation: 196,
//   },
//   {
//     distance: 3, elevation: 312,
//   },
//   {
//     distance: 6, elevation: 443,
//   },
//   {
//     distance: 8, elevation: 491,
//   },
//   {
//     distance: 10, elevation: 631,
//   },
//   {
//     distance: 12, elevation: 832,
//   },
//   {
//     distance: 14, elevation: 931,
//   },
// ];

let missingPointsArray = [];
let additionalPoints = [];
let decimalPointsArray = [];
let newElevation;
let newDistance;

class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
    };
  }

  componentDidMount() {
    missingPointsArray = [];
    additionalPoints = [];
    decimalPointsArray = [];
    const route = this.props.routes[0];
    if (route) {
      this.getGraphData(route.route);
    }
  }

  plotWayPoints = (values) => {
    const xAxisUnit = 0.01;

    values.forEach((arrayPoint, index) => {
      const previousPoint = values[index - 1];

      if (index > 0) {
        const distanceDiff = arrayPoint.distance - previousPoint.distance;
        const elevationDiff = arrayPoint.elevation - previousPoint.elevation;

        const missingNumberOfPoints = Math.round(distanceDiff / xAxisUnit);

        const elevationPerXAxisPoint = elevationDiff / missingNumberOfPoints;

        newElevation = previousPoint.elevation;
        newDistance = previousPoint.distance;

        for (let i = 0; i < (missingNumberOfPoints - 1); i++) {
          additionalPoints.push({
            elevation: Number((newElevation = newElevation + elevationPerXAxisPoint).toFixed(1)),
            distance: Number((newDistance = newDistance + xAxisUnit).toFixed(2)),
          });
        }

        missingPointsArray = additionalPoints;
      }

      decimalPointsArray = [...values, ...missingPointsArray].sort((a, b) => a.distance - b.distance);
    });

    return decimalPointsArray;
  };

  // used by calcRow function
  toRad = (Value) => {
    return Value * Math.PI / 180;
  };

  // calculates distance between two sets of co-ordinates e.g. this.calcCrow(-3.211555, 54.454235, -3.209266, 54.455776)
  calcCrow = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const lat3 = this.toRad(lat1);
    const lat4 = this.toRad(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat3) * Math.cos(lat4);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Number(d.toFixed(2));
  };

  // calculates elevation at each set of co-ordinates in wayPoints state
  // elevationData = () => {
  //   this.state.wayPoints.map(coordinatePair => {
  //     getElevation(coordinatePair, (err, elevation) => {
  //       altitudeArray.push(Math.trunc(elevation));
  //       // this.setState({ elevation: altitudeArray });
  //     });
  //   });
  // };

  // ****NOT WORKING**** was trying to adapt this so i could create an array of objects, each containing elevation and distance for each point on the graph and pushing into data array from https://stackoverflow.com/questions/53055065/convert-two-arrays-into-object-javascript
  // graphData = () => { 
  //   merged.forEach(r => {
  //     const obj = {};
  //     r.forEach((s, i) => {
  //       obj[dataKeys[i]] = s;
  //     });
  //     data.push(obj);
  //   });
  //   // console.log(data);
  // };

  getGraphData = (array) => {
    this.props.onToggleLoading(true);
    const copyOfArray = [...array];

    const goingUphill = copyOfArray.sort((a, b) => b - a);

    let totalDistance = 0;

    const goingUphillDistances = goingUphill.map((point, pointIndex) => {
      const previousPoint = goingUphill[pointIndex - 1];
      if (pointIndex > 0) {
        totalDistance = totalDistance + this.calcCrow(previousPoint[1], previousPoint[0], point[1], point[0]);
        return Number(totalDistance.toFixed(2));
      }
      return 0;
    });

    const promiseArray = goingUphill.map((point, pointIndex) => {
      return getElev2(point)
        .then((result) => {
          return {
            index: pointIndex,
            elevation: Number(result.toFixed(2)),
            distance: goingUphillDistances[pointIndex],
          };
        })
        .catch((err) => {
          console.log('ERROR', err);
        });
    });

    Promise.all(promiseArray)
      .then((values) => {
        const plotted = this.plotWayPoints(values);
        this.setState({ graphData: plotted }, () => this.props.onToggleLoading(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ****NOT WORKING**** was going to merge altitude and distance in array alternately to use in graphData function so it would match each part of the data to the correct keys
  // arrayMerge = () => {
  //   const l = Math.min(distance.length, altitudeArray.length);
  //   const merged = [].concat(...Array.from({ length: l }, (_, i) => [distance[i], altitudeArray[i]]), distance.slice(l), altitudeArray.slice(l));
  //   // console.log(merged);
  // };

  render() {
    return (
      <div className="menu-overlay">
        <h1>Metrics</h1>
        { this.props.routes[0] &&
          (
            <div className="chart">
              <h2>{this.props.routes[0].name}</h2>
              <p>{moment(this.props.routes[0].createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
              <AreaChart
                width={500}
                height={200}
                data={[...this.state.graphData]}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="6 6" stroke="#FFFFFF" />
                <XAxis
                    dataKey="distance"
                    unit="km"
                    stroke="#FFFFFF"
                  />
                <YAxis dataKey="elevation" stroke="#FFFFFF" domain={['dataMin - 50', 'dataMax + 30']} unit="m" />
                <Tooltip />
                <Legend />
                <Area type="natural" dataKey="elevation" unit="m" stroke="#0F590D" fill="#0F590D" activeDot={{ r: 8 }} />
              </AreaChart>
            </div>
          )
        }
      </div>
    );
  }
}


export default Metrics;
