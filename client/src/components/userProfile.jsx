import React, { Component } from "react";
import axios from "axios";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
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
      // .then((response) => this.setState({ userId: response.data.id }))
      .catch((error) => console.log(error));
  };

  getRestaurantsByUser = (id) => {
    fetch(`http://localhost:5000/api/users/${id}/restaurants`)
      .then((response) => response.json())
      .then((response) => {
        // this.setState({ restaurants: response });
        console.log(response);
      });
  };

  render() {
    return (
      <div>
        <h1>testing</h1>
      </div>
    );
  }
}

export default UserProfile;
