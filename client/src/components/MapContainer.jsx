import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const mapStyles = {
  width: "50%",
  height: "400px",
};

const center = {
  lat: 41.3851,
  lng: 2.1734,
};

let service = null;

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      suggestions: [],
      places: [],
    };
  }

  savePlace = (place) => {
    this.setState({ places: [...this.state.places, place] });
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.search();
    }
  };

  // might not be needed
  onMarkerClick = (props, marker, e) => {
    console.log(props, marker, e);
  };

  // might not be useful for us as it is used for searching
  initPlaces(mapProps, map) {
    const { google } = mapProps;
    service = new google.maps.places.PlacesService(map);
  }

  search = () => {
    const { input } = this.state;
    service.textSearch({ query: input }, (suggestions) => {
      this.setState({
        suggestions,
      });
    });
  };

  render() {
    const { suggestions, places } = this.state;

    // might not be needed
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < places.length; i++) {
      bounds.extend(places[i].geometry.location);
    }

    return (
      <div className="container">
        <div>
          <div>
            <div>
              <input
                type="text"
                value={this.state.input}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
              />
              <button onClick={this.search}>Search</button>
            </div>
            <h3>Suggestions</h3>
            <ul>
              {suggestions.map((place, i) => (
                <li key={i}>
                  <div>
                    <div>
                      <strong>{place.name}</strong>
                    </div>
                    <span>{place.formatted_address}</span>
                  </div>
                  <button onClick={() => this.savePlace(place)}>Show</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Map
              google={this.props.google}
              onReady={this.initPlaces} // might not be useful for us
              zoom={14}
              style={mapStyles}
              bounds={bounds} // might not be needed
              initialCenter={center}
            >
              {places.map((place, index) => (
                <Marker
                  onClick={this.onMarkerClick} // might not be needed
                  name={place.name}
                  position={place.geometry.location}
                  key={index}
                />
              ))}
            </Map>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey,
})(MapContainer);
