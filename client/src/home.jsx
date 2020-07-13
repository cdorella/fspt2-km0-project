import React from "react";
import "./home.css";
import { Link, withRouter } from "react-router-dom";

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
    if (value === "cheap eats") {
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
      <div className="container">
        <div className="header-container">
          <div className="header-title">
            <div className="right-header">
              <img
                id="logo-home"
                src="https://i.ibb.co/1XTRLTq/Cream-and-Black-Natural-Makeup-Beauty-Logo.png"
              ></img>
            </div>
            <div className="left-header">
              <div className="intro-container">
                <h1 className="intro-title">Hi, what are you looking for?</h1>
              </div>
            </div>
          </div>

          <Link className="button-restaurant" to="/login">
            <button>Admin Access</button>
          </Link>

          <div className="form-container">
            <form className="form-home">
              <div class="nl-field nl-dd">
                <label>
                  Hey! I feel like eating some km.0 and conscious food. Looking
                  for
                </label>

                <select onChange={this.handleCuisine}>
                  <option> any cuisine style </option>
                  {this.state.cuisines.map((cuisine) => (
                    <option id={cuisine.id} key={cuisine.id}>
                      {cuisine.cuisine_name.toLowerCase()}
                    </option>
                  ))}
                </select>
                <label> and I want it to be </label>
                <select onChange={this.handlePrice}>
                  <option> any price </option>
                  <option> cheap eats </option>
                  <option> mid-range </option>
                  <option> fine dining </option>
                </select>
              </div>
            </form>
            <div className="spacer2"></div>
            <button className="button-form" onClick={this.handleSearchQuery}>
              {" "}
              Find a place!
            </button>
          </div>
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
                    We guarantee quality in all the ingredients the restaurants
                    in our webpage select
                  </p>
                </div>
              </div>
              <div className="section-one-content1">
                <div className="little-header">
                  <h3>help local business</h3>
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
                    if you eat from restaurants near to you, you are helping
                    local producers and business owners to reach those customers
                    that also care about the selection of ingredients
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
                    experiences near to you? You will never get bored with our
                    explorer option
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {" "}
          <h1> images </h1>
          <img src="https://i.ibb.co/myqNZG0/Farmer-amico-2.png"></img>
          <img src="https://i.ibb.co/Yd2ScyW/Farmer-bro-2.png"></img>
          <img src="https://i.ibb.co/WWhdDdM/Farmer-rafiki-2.png"></img>
          <img src="https://i.ibb.co/HYBCF6P/Farmer-pana-1.png"></img>
          <img src="https://i.ibb.co/R9t3bXH/Farmer-amico-1.png"></img>
          <img src="https://i.ibb.co/s6qSp1C/Farmer-rafiki-1.png"></img>
          <img src="https://i.ibb.co/s6f3rLY/Farmer-bro-1.png"></img>
          <img src="https://i.ibb.co/XpWhG4q/Farmer-pana.png"></img>
          <img src="https://i.ibb.co/Fw3qG9t/Farmer-amico.png"></img>
          <img src="https://i.ibb.co/ykgxLP5/Farmer-rafiki.png"></img>
          <img src="https://i.ibb.co/FYD7SZt/Chef-rafiki.png"></img>
          <img src="https://i.ibb.co/J330V0Z/Chef-bro.png"></img>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
