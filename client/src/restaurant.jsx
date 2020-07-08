import React from "react";
import "./restaurant.css";
import MapContainer from "./components/MapContainer";

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurant: {},
      specials: [],
    };
  }

  // ID TO COME FROM SELECTION ON HOME PAGE
  // getRestaurantById = (restaurantId) => () => {
  // fetch(`/api/restaurants/${restaurantId}`)
  getRestaurantById = () => {
    fetch(`/api/restaurants/1`) // FOR NOW JUST FOR TESTING USING ID #1
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          selectedRestaurant: response,
          specials: response.specials,
        });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  render() {
    const { selectedRestaurant, specials } = this.state;

    let price = "";

    if (selectedRestaurant.price === 1) {
      price = "Cheap Eats";
    } else if (selectedRestaurant.price === 2) {
      price = "Mid-range";
    } else if (selectedRestaurant.price === 3) {
      price = "Fine Dining";
    }

    return (
      <div className="restaurant-container">
        <div className="restaurant-details">
          <div className="restaurant-img-container">
            <img
              src="https://i.ibb.co/QHcY6zv/Macaron-Photo-Food-Facebook-Cover.png"
              className="restaurant-banner"
            ></img>
          </div>

          {/* THIS BUTTON WAS ADDED JUST SO THAT I HAVE DATA TO WORK WITH **CAROLINA*/}
          <button className="button-special" onClick={this.getRestaurantById}>
            Submit
          </button>

          <div className="restaurant-name">
            {" "}
            <h1 className="restaurant-name-title">{selectedRestaurant.name}</h1>
          </div>
          <div className="restaurant-general">
            <div className="restaurant-info">
              <h2 className="info-title"> Address: </h2>{" "}
              <p>{selectedRestaurant.address}</p>
              <h2 className="info-title"> Telephone: </h2>{" "}
              <p>{selectedRestaurant.telephone}</p>
              <h2 className="info-title"> Price: </h2> <p>{price}</p>
              <h2 className="info-title"> Style: </h2>
              <p>{selectedRestaurant.style}</p>
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
              {specials.map((special) => (
                <div key={special.id}>
                  <h3>{special.special_name}</h3>
                  <p>{special.description}</p>
                </div>
              ))}
              <button className="button-special"> I want it!</button>
              <div className="spacer"></div>
            </div>
          </div>
        </div>
        <div className="spacer"></div>
        <div className="google-maps">
          <MapContainer {...selectedRestaurant} />
        </div>
        <button className="button-restaurant"> back to search </button>
      </div>
    );
  }
}

export default Restaurant;
