import React from "react";
import "./home.css";

class Home extends React.Component {
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

          <div className="form-container">
            <form className="form-home">
              <div class="nl-field nl-dd">
                <a class="nl-field-toggle">any food</a>
                <ul>
                  <li class="nl-dd-checked">any food</li>
                  <li>Indian</li>
                  <li>French</li>
                  <li>Japanese</li>
                  <li>Italian</li>
                </ul>
              </div>
              <label>I feel like eating something fresh</label>
              <br></br>
              <label>and concious. I like </label>
              <select>
                <option> Italian </option>
                <option> Sushi </option>
                <option> Greek </option>
                <option> Spanish </option>
              </select>
              <label> style </label>
              <br></br>
              <label> and I want to spend around </label>
              <select>
                <option> € </option>
                <option> €€ </option>
                <option> €€€ </option>
                <option> €€€€ </option>
              </select>
              <br></br>
            </form>
            <div className="spacer2"></div>
            <button className="button-form"> Find a place!</button>
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
                    Eat fresh and concious products that are produced neer to
                    you. We guarantee quality in all the ingredients the
                    restaurants in our webpage select
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
                    why going to the same place when you can find thousands of
                    new experiences near to you? You will never get bored with
                    our explorer option
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

export default Home;
