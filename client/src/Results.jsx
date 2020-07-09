import React from "react";
import "./Results.css";

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
    };
  }

  componentDidMount() {
    this.getRestaurants();
  }

  getRestaurants = () => {
    fetch(`/api/search`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ restaurants: response });
      });
  };

  render() {
    const { name, address, cuisine_name, price, style } = this.state;
    return (
      <div className="general-container">
        <div className="title-container">
          {" "}
          <h1 id="header"> here is your best choice</h1>
        </div>
        <div className="results-container">
          <div className="restaurants-container">
            {this.state.restaurants.map((restaurant) => (
              <div className="restaurant">
                <div id="restaurant-name-container" key={restaurant.id}>
                  <h1>{restaurant.name}</h1>
                </div>
                <div className="restaurant-up">
                  <div className="restaurant-img">
                    <img
                      className="restaurant-icon"
                      src="https://image.flaticon.com/icons/svg/2909/2909782.svg"
                    ></img>
                  </div>
                  <div className="restaurant-info">
                    <label> Adress: {restaurant.address} </label>
                    <br></br>

                    <label> Cuisine: {restaurant.cuisine_name}</label>
                    <br></br>
                    <label> Price: {restaurant.price} </label>
                    <br></br>
                    <br></br>
                    <button className="button-restaurant">click me</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="img-container">
            <img
              className="img-results"
              src="https://i.ibb.co/FYD7SZt/Chef-rafiki.png"
            ></img>
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default Results;
