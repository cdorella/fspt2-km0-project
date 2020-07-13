import React from "react";
import "../App.css";
import axios from "axios";
import UserProfile from "./userProfile";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "davidfuentes@gmail.com",
      password: "davfue",
      userId: 0,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = () => {
    //send login request
    axios("/api/login", {
      method: "POST",
      data: {
        username: this.state.username,
        password: this.state.password,
      },
    })
      .then((response) => {
        console.log(response);
        //store my token locally
        //setItem = localstorage method
        localStorage.setItem("token", response.data.token);
        // this.requestData();
        // console.log(response.data.message, response.data.token);
        this.props.history.push("/profile");
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <div>
          <input
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
            type="text"
            className="form-control mb-2"
          />
          <input
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
            type="password"
            className="form-control mb-2"
          />
          <button className=" btn btn-primary" onClick={this.login}>
            Log in
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
