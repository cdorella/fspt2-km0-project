import React from "react";
import "./restaurant.css";
import MapContainer from "../components/map_container";
import QRCodeGenerator from "../components/qr_code_generator";
import { Link } from "react-router-dom";

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurant: {},
      specials: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getRestaurantById(id);
  }

  getRestaurantById = (restaurantId) => {
    fetch(`/api/restaurants/${restaurantId}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          selectedRestaurant: response,
          specials: response.specials,
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { selectedRestaurant, specials } = this.state;

    let price = "";
    if (selectedRestaurant.price === 1) {
      price = "Budget";
    } else if (selectedRestaurant.price === 2) {
      price = "Mid-range";
    } else if (selectedRestaurant.price === 3) {
      price = "Fine Dining";
    }

    return (
      <div className="wrapper1">
        <div className="restaurant-container2">
          <div className="restaurant-details">
            <div className="restaurant-img-container">
              <img
                src="https://i.ibb.co/QHcY6zv/Macaron-Photo-Food-Facebook-Cover.png"
                className="restaurant-banner"
              ></img>
            </div>
            <div className="back-container">
              <div className="right-back"></div>
              <div className="button-container">
                <Link className="button-restaurant" to="/">
                  <button>Back to search</button>
                </Link>
              </div>
            </div>

            <div className="restaurant-name">
              {" "}
              <h1 className="restaurant-name-title">
                {selectedRestaurant.name}
              </h1>
            </div>
            <div className="restaurant-general">
              <div className="restaurant-info">
                <h2 className="info-title"> Address: </h2>{" "}
                <p className="p-restaurant">{selectedRestaurant.address}</p>
                <h2 className="info-title"> Telephone: </h2>{" "}
                <p className="p-restaurant">{selectedRestaurant.telephone}</p>
                <h2 className="info-title"> Price: </h2>{" "}
                <p className="p-restaurant">{price}</p>
                <h2 className="info-title"> Style: </h2>
                <p className="p-restaurant">{selectedRestaurant.style}</p>
              </div>
              <div className="google-maps">
                <MapContainer {...selectedRestaurant} />
              </div>
            </div>
            <div className="special-title-container">
              {" "}
              <h1 className="special-title"> We have a SPECIAL for you</h1>{" "}
            </div>

            <div className="special-container">
              <div className="special-one">
                {specials.map((special) => (
                  <div key={special.id}>
                    <h3>{special.special_name}</h3>
                    <p>{special.description}</p>

                    <QRCodeGenerator
                      id={special.id}
                      name={special.special_name}
                      className="qr-code"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Restaurant;
