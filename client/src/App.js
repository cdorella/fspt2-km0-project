import React from "react";
import "./App.css";
import Home from "./home.jsx";
import Restaurant from "./restaurant.jsx";
import Login from "./components/login.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Results from "./Results.jsx";
import ScrollToTop from "./components/scroll_to_top.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact>
              <Home></Home>
            </Route>
            <Route path="/restaurant/:id" exact component={Restaurant}></Route>
            <Route path="/login" exact>
              <Login></Login>
            </Route>
            <Route path="/results" exact>
              <Results></Results>
            </Route>
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
