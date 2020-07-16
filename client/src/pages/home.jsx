import React from "react";
import "./home.css";
import { Link, NavLink, withRouter } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisines: [],
      selectedCuisine: "",
      selectedPrice: "",
      restaurants: [],
    };
  }

  componentDidMount() {
    this.getCuisines();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  getCuisines = () => {
    fetch(`api/cuisines`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ cuisines: response });
      });
  };

  handleCuisine = (event) => {
    const { value } = event.target;
    const newState = {
      selectedCuisine: [`cuisine_name=${value}`],
    };
    this.setState(newState);
  };

  handlePrice = (event) => {
    const { value } = event.target;

    let price = 0;
    if (value === "budget") {
      price = 1;
    } else if (value === "mid-range") {
      price = 2;
    } else if (value === "fine dining") {
      price = 3;
    }

    const newState = {
      selectedPrice: [`price=${price}`],
    };
    this.setState(newState);
  };

  handleSearchQuery = (event) => {
    const { selectedCuisine, selectedPrice } = this.state;
    event.preventDefault();

    let queryString = [];

    if (selectedCuisine.length) {
      queryString.push(selectedCuisine);
    }
    if (selectedPrice.length) {
      queryString.push(selectedPrice);
    }
    if (!queryString.length) {
      this.fetchSearchResults(`api/search`);
    }

    this.fetchSearchResults(`api/search?${queryString.join("&")}`);
  };

  fetchSearchResults = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          restaurants: response,
        });
        this.props.history.push({
          pathname: "/results",
          state: { restaurants: this.state.restaurants },
        });
      });
  };

  render() {
    return (
      <div className="wrapper2">
        <div className="access-container">
          <div className="left-access"></div>
          <div className="right-login">
            <NavLink to="/login" className="access-login">
              Admin Access
            </NavLink>
          </div>
        </div>
        <div className="header-title">
          <div className="right-header">
            <img
              id="logo-home"
              src="https://i.ibb.co/Y0L6gvP/Cream-and-Black-Natural-Makeup-Beauty-Logo-removebg-preview.png"
            ></img>
          </div>
          <div className="left-header">
            <div className="intro-container">
              <h1 className="intro-title">Hi, what are you looking for?</h1>
            </div>
          </div>
        </div>

        <div className="contenedor">
          <form className="nl-form" id="form">
            <div class="nl-field nl-dd">
              <label>
                <h2 className="text-form">
                  {" "}
                  Hey! I feel like eating some local, seasonal and sustainable
                  food. Looking for{" "}
                </h2>
              </label>

              <select onChange={this.handleCuisine}>
                <ul className="nl-field-toggle"> any cuisine style </ul>
                <option>any cuisine style</option>
                {this.state.cuisines.map((cuisine) => (
                  <option
                    id={cuisine.id}
                    key={cuisine.id}
                    className="nl-dd-checked"
                  >
                    {cuisine.cuisine_name.toLowerCase()}
                  </option>
                ))}
              </select>
              <label>
                {" "}
                <h2 className="text-form">and I would like it to be </h2>{" "}
              </label>
              <select onChange={this.handlePrice}>
                <option className="nl-field-toggle"> any price </option>
                <option className="nl-dd-checked"> budget </option>
                <option className="nl-dd-checked"> mid-range </option>
                <option className="nl-dd-checked"> fine dining </option>
              </select>
            </div>
            <button className="button-form" onClick={this.handleSearchQuery}>
              {" "}
              Find a place!
            </button>
          </form>
          <ul class="bg-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="spacer1"></div>

        <div className="body">
          <h1 className="section-one-title"> what we do</h1>
          <div className="section-one">
            <div className="section-one-content">
              <div
                className="section-one-content1"
                style={{
                  backgroundColor: "rgba(190, 213, 174, 0.9)",
                }}
              >
                <div className="little-header">
                  <h3>proximity food</h3>
                </div>
                <div className="little-img">
                  <img
                    className="img-body"
                    src="https://i.ibb.co/7N4rYP4/Farmer-bro.png"
                  ></img>
                </div>
                <div className="little-contenet">
                  <div className="space-home"></div>
                  <div className="space-home2"></div>
                  <p>
                    {" "}
                    eat fresh and conscious products that are produced near you.
                    We guarantee the quality of all the ingredients the
                    restaurants in our webpage select
                  </p>
                </div>
              </div>
              <div className="section-one-content1">
                <div className="little-header">
                  <h3>help local businesses</h3>
                </div>
                <div className="little-img">
                  <img
                    className="img-body"
                    src="https://i.ibb.co/r38KzqC/Chef-pana.png"
                  ></img>
                </div>
                <div className="little-contenet">
                  <div className="space-home"></div>
                  <div className="space-home2"></div>
                  <p>
                    {" "}
                    if you eat from restaurants near you, you are helping local
                    producers and business owners to reach those customers that
                    also care about the selection of ingredients
                  </p>
                </div>
              </div>
              <div
                className="section-one-content1"
                style={{
                  backgroundColor: "rgba(190, 213, 174, 0.9)",
                }}
              >
                <div className="little-header">
                  <h3>explore new places</h3>
                </div>
                <div className="little-img">
                  <img
                    className="img-body"
                    src="https://i.ibb.co/87CsvfC/Eating-healthy-food-pana.png"
                  ></img>
                </div>
                <div className="little-contenet">
                  <div className="space-home"></div>
                  <div className="space-home2"></div>
                  <p>
                    {" "}
                    why go to the same place when you can find thousands of new
                    experiences near you? You will never get bored with our
                    explorer option
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="quote-container">
          <h1 className="quote">
            {" "}
            We believe Conscious Eating is a big step toward Conscious Living.{" "}
            <br></br>
            We are what we eat.{" "}
          </h1>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
