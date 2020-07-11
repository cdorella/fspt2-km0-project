import React from "react";
import "./restaurant.css";
import MapContainer from "./components/map_container";
import QRCodeGenerator from "./components/qr_code_generator";
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

                  <QRCodeGenerator
                    id={special.id}
                    name={special.special_name}
                  />
                </div>
              ))}

              <div className="spacer"></div>
            </div>
          </div>
        </div>

        <div className="spacer"></div>

        <Link className="button-restaurant" to="/">
          <button>Back to search</button>
        </Link>

        <div className="google-maps">
          <MapContainer {...selectedRestaurant} />
        </div>
      </div>
    );
  }
}

export default Restaurant;
