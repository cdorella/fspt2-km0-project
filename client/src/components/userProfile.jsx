import React, { Component } from "react";
import axios from "axios";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      specials: [],
      restaurantId: 0,
      success: false,
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
    fetch(`http://localhost:5000/api/users/${id}/restaurants`)
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
    fetch(`http://localhost:5000/api/restaurants/${id}/specials`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          specials: response,
          restaurantId: id,
        });
      })
      .catch((error) => console.log(error));
  };

  deleteSpecial = (id) => {
    fetch(`/api/specials/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        // upon success, update tasks
        this.setState({
          success: true,
        });
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
    event.preventDefault();
    this.addSpecial();
    this.setState({
      special_name: "",
      description: "",
    });
  };
  // WORK IN PROGRESS
  addSpecial = () => {
    const { restaurantId, special_name, description } = this.state;
    console.log(restaurantId, special_name, description);
    // fetch(
    //   `http://localhost:5000/api/restaurants/${restaurantId}/specials`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       special_name: special_name,
    //       description: description,
    //       restaurantId: restaurantId,
    //     }),
    //   }
    //     .then((response) => response.json())
    //     .then((response) => console.log(response))
    //     .catch((error) => console.log(error))
    // );
    // fetch(`http://localhost:5000/api/restaurants/${restaurantId}/specials`)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     this.setState({
    //       specials: response,
    //     });
    //   })
    //   .catch((error) => console.log(error));
  };

  logout = () => {
    this.setState({
      login: !this.state.login,
    });
  };

  render() {
    const {
      restaurants,
      specials,
      success,
      special_name,
      description,
      login,
    } = this.state;
    return (
      <div>
        <h1>Your restaurants</h1>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <h3>Name: {restaurant.name}</h3>
            <h3>Address: {restaurant.address}</h3>
            <button onClick={() => this.getSpecials(restaurant.id)}>
              Click here to see your Specials
            </button>
            {specials.map((special) => (
              <div key={special.id}>
                <h3>Name: {special.special_name}</h3>
                <h3>Description: {special.description}</h3>
                <button onClick={() => this.deleteSpecial(special.id)}>
                  Click here to delete this Special
                </button>
              </div>
            ))}
          </div>
        ))}
        {/* MISSING WORK OUT HOW TO MAKE SPECIAL DISSAPEAR */}
        {success && (
          <div>
            <h2>Special Deleted!</h2>
          </div>
        )}
        <div>
          <h3>Add Special</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Special Name: </label>
            <input
              type="text"
              placeholder="add name"
              name="special_name"
              value={special_name}
              onChange={this.handleInputChange}
            />
            <label>Special Description: </label>
            <input
              type="text"
              placeholder="add description"
              name="description"
              value={description}
              onChange={this.handleInputChange}
            />
          </form>
          <button>Click here to Add Special</button>
        </div>
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
