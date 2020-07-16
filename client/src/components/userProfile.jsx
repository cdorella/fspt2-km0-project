import React, { Component } from "react";
import axios from "axios";
import "./user_profile.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      selected: false,
      specials: [],
      restaurantId: 0,
      restaurantName: "",
      special_name: "",
      description: "",
      login: true,
    };
  }

  componentDidMount() {
    this.requestData();
  }

  requestData = () => {
    axios("/api/profile", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response);
        this.getRestaurantsByUser(response.data.id);
      })
      .catch((error) => console.log(error));
  };

  getRestaurantsByUser = (id) => {
    fetch(`api/users/${id}/restaurants`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          restaurants: response,
        });
      })
      .catch((error) => console.log(error));
  };

  getSpecials = (id) => {
    fetch(`api/restaurants/${id}/specials`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          selected: true,
          specials: response.specials,
          restaurantName: response.name,
          restaurantId: id,
        });
      })
      .catch((error) => console.log(error));
  };

  deleteSpecial = (id) => {
    const { restaurantId } = this.state;
    fetch(`/api/specials/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        this.getSpecials(restaurantId);
      })
      .catch((error) => console.log(error));
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const { restaurantId } = this.state;
    event.preventDefault();
    this.addSpecial(restaurantId);
    this.setState({
      special_name: "",
      description: "",
    });
  };

  addSpecial = (id) => {
    const { special_name, description } = this.state;

    fetch(`/api/restaurants/${id}/specials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        special_name: special_name,
        description: description,
        restaurantId: id,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.getSpecials(id);
      })
      .catch((err) => console.log(err));
  };

  logout = () => {
    this.setState({
      login: false,
    });
    window.localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  render() {
    const {
      restaurants,
      selected,
      specials,
      special_name,
      description,
      login,
    } = this.state;

    return (
      <div className="wrapper3">
        <div className="header">
          <div className="welcome">
            <h1>Welcome Admin!</h1>
          </div>
          <div className="logout">
            <div>
              {login ? (
                <button onClick={this.logout} className="button-logout">
                  LOG OUT
                </button>
              ) : (
                <a href="http://localhost:3000/login">
                  <button>Back to log in</button>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="restaurant-info1">
          <div className="resturant-right">
            <img
              src="https://i.ibb.co/fGSBRG8/Chef-bro-1.png"
              className="img-admin"
            ></img>
          </div>
          <div className="restaurant-left">
            <h2 className="admin-subtitle">Your restaurants:</h2>
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-container">
                <h3>{restaurant.name}</h3>
                <h3>Address: {restaurant.address}</h3>
                <button
                  onClick={() => this.getSpecials(restaurant.id)}
                  className="button-profile"
                >
                  See my specials
                </button>
              </div>
            ))}
            <div className="spacer3"></div>
            {selected && (
              <div className="special-section">
                <h2 className="admin-subtitle">Your Specials</h2>
                {specials.map((special) => (
                  <div key={special.id}>
                    <h3>Name: {special.special_name}</h3>
                    <h3>Description: {special.description}</h3>
                    <button
                      onClick={() => this.deleteSpecial(special.id)}
                      className="button-profile"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <div className="test<">
                  <h3 className="admin-subtitle">Or add a Special</h3>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-section">
                      <label className="label-form">Special Name: </label>
                      <input
                        className="input-form"
                        type="text"
                        placeholder="add name"
                        name="special_name"
                        value={special_name}
                        onChange={this.handleInputChange}
                      />
                    </div>

                    <div className="form-section">
                      <label className="label-form">Description: </label>
                      <textarea
                        className="input-form"
                        type="text"
                        name="description"
                        rows="4"
                        cols="40"
                        value={description}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <br></br>
                    <button className="button-profile">Add new special</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="spacer3"></div>
        <div className="special-container"></div>
      </div>
    );
  }
}

export default UserProfile;
