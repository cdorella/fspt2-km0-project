import React from "react";
import "./home.css";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <h1> container </h1>
        <div className="header-container">
          <div className="header-title">
            <div className="left-header">
              <h1> Food selected with heart</h1>
              <h2> for those who care</h2>
            </div>
            <div className="right-header">
              <h2> Km 0 restaurants </h2>
            </div>
          </div>
          <div className="searcher-container">
            <div className="left-title-container">
              <div className="title-container">
                <h1> Find concious food near you </h1>
              </div>
              <div className="form-container">
                <h1>form container</h1>
              </div>
            </div>
            <div className="right-title-container">
              <div className="image-container">
                <img
                  id="img-header"
                  src="https://i.ibb.co/ngwF494/Farmer-pana-2.png"
                ></img>
              </div>
            </div>
          </div>
        </div>
        <div className="body">
          <h1>body</h1>
          <div className="section-one">
            <h1>section one</h1>
          </div>
        </div>
        <div>
          {" "}
          <h1> images </h1>
          <img src="https://i.ibb.co/ngwF494/Farmer-pana-2.png"></img>
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
          <img src="https://i.ibb.co/7N4rYP4/Farmer-bro.png"></img>
          <img src="https://i.ibb.co/FYD7SZt/Chef-rafiki.png"></img>
          <img src="https://i.ibb.co/J330V0Z/Chef-bro.png"></img>
          <img src="https://i.ibb.co/r38KzqC/Chef-pana.png"></img>
        </div>
      </div>
    );
  }
}

export default Home;
