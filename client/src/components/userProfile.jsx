import React, { Component } from "react";
import axios from "axios";

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
    //request private data
    axios("/api/profile", {
      method: "GET",
      headers: {
        //getItem = localstorage method
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
      login: !this.state.login,
    });
  };

  render() {
    const {
      restaurants,
      selected,
      specials,
      restaurantName,
      special_name,
      description,
      login,
    } = this.state;

    return (
      <div>
        <h1>Welcome Admin!</h1>
        <h2>Your restaurants:</h2>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <h3>{restaurant.name}</h3>
            <h3>Address: {restaurant.address}</h3>
            <button onClick={() => this.getSpecials(restaurant.id)}>
              Click here to see your current specials
            </button>
          </div>
        ))}

        {selected && (
          <div>
            <h2>Specials for restaurant: {restaurantName}</h2>
            {specials.map((special) => (
              <div key={special.id}>
                <h3>Name: {special.special_name}</h3>
                <h3>Description: {special.description}</h3>
                <button onClick={() => this.deleteSpecial(special.id)}>
                  Click here to delete this special
                </button>
              </div>
            ))}
            <div>
              <h3>Add a Special</h3>
              <form onSubmit={this.handleSubmit}>
                <label>Special Name: </label>
                <input
                  type="text"
                  placeholder="add name"
                  name="special_name"
                  value={special_name}
                  onChange={this.handleInputChange}
                />
                <label>Description: </label>
                <textarea
                  type="text"
                  placeholder="add description"
                  name="description"
                  rows="4"
                  cols="40"
                  value={description}
                  onChange={this.handleInputChange}
                />
                <button>Click here to add a new special</button>
              </form>
            </div>
          </div>
        )}

        <div>
          {login ? (
            <button onClick={this.logout}>LOG OUT</button>
          ) : (
            <a href="http://localhost:3000/login">
              <button>Back to log in</button>
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default UserProfile;
