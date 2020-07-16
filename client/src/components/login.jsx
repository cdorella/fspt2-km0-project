import React from "react";
import "../App.css";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = (event) => {
    event.preventDefault();
    axios("/api/login", {
      method: "POST",
      data: {
        username: this.state.username,
        password: this.state.password,
      },
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        this.props.history.push("/profile");
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.login}>
            <input
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
              type="text"
              placeholder="username"
              className="form-control mb-2"
            />
            <input
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
              type="password"
              placeholder="password"
              className="form-control mb-2"
            />
            <button className=" btn btn-primary">Log in</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
