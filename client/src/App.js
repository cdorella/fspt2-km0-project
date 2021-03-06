import React from "react";
import "./App.css";
import Home from "./pages/home.jsx";
import Restaurant from "./pages/restaurant.jsx";
import Login from "./components/login.jsx";
import UserProfile from "./components/user_profile.jsx";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Results from "./pages/results.jsx";
import ScrollToTop from "./components/scroll_to_top.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/" exact>
              <Home></Home>
            </Route>
            <Route path="/restaurant/:id" exact component={Restaurant}></Route>
            <Route path="/results" exact>
              <Results></Results>
            </Route>
            <Route path="/profile" exact component={UserProfile}></Route>
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
