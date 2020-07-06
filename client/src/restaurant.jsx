import React from "react";
import "./restaurant.css";

class Restaurant extends React.Component {
  render() {
    return (
      <div className="restaurant-container">
        <div className="restaurant-details">
          <div className="restaurant-img-container">
            <img
              src="https://i.ibb.co/QHcY6zv/Macaron-Photo-Food-Facebook-Cover.png"
              className="restaurant-banner"
            ></img>
          </div>
          <div className="restaurant-name">
            {" "}
            <h1 className="restaurant-name-title">restaurant-name</h1>
          </div>
          <div className="restaurant-general">
            <div className="restaurant-info">
              <h2 className="info-title"> Adress: </h2>{" "}
              <p> restaurant adress here</p>
              <h2 className="info-title"> Telephone: </h2>{" "}
              <p> restaurant phone here</p>
              <h2 className="info-title"> Price: </h2>{" "}
              <p> restaurant price here</p>
              <h2 className="info-title"> Style: </h2> <p> map style here</p>
            </div>
            <div className="restaurant-banner-container">
              <img
                src="https://i.ibb.co/CBHBmv3/ecologia-adaptada.jpg"
                className="img-restaurant"
              ></img>
            </div>
          </div>
          <div className="spacer"></div>
          <div className="special-container">
            <div className="special">
              <h2>We have a special for you from nearEAT</h2>
              <h3>special tittle goes here</h3>
              <button className="button-special"> I want it!</button>
              <div className="spacer"></div>
            </div>
          </div>
        </div>
        <div className="spacer"></div>
        <div className="google-maps">google-maps</div>
        <button className="button-restaurant"> back to search </button>
      </div>
    );
  }
}

export default Restaurant;
