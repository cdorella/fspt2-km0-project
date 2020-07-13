import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./results.css";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { restaurants } = this.props.history.location.state;

    return (
      <div className="general-container">
        <div className="title-container">
          {" "}
          <h1 id="header"> here are your best choices</h1>
        </div>
        <div className="results-container">
          <div className="restaurants-container">
            {restaurants.length ? (
              restaurants.map((restaurant) => (
                <div className="restaurant" key={restaurant.id}>
                  <div id="restaurant-name-container">
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
                      <label>
                        {" "}
                        <strong>Address:</strong> {restaurant.address}{" "}
                      </label>
                      <br></br>

                      <label>
                        {" "}
                        <strong>Cuisine: </strong>
                        {restaurant.cuisine_name}
                      </label>
                      <br></br>
                      <label>
                        {" "}
                        <strong>Style:</strong> {restaurant.style}{" "}
                      </label>
                      <br></br>
                      <br></br>
                      <Link
                        className="button-restaurant"
                        to={`/restaurant/${restaurant.id}`}
                      >
                        Click me
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                {" "}
                <h1 id="header">
                  {" "}
                  Sorry, no results matched your criteria.
                </h1>{" "}
                <Link className="button-restaurant" to="/">
                  <button>Back to search</button>
                </Link>
              </div>
            )}
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

export default withRouter(Results);
