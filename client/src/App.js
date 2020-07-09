import React from "react";
import "./App.css";
import Home from "./home.jsx";
import Restaurant from "./restaurant.jsx";
import Login from "./components/Login.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home></Home>
          </Route>
          <Route path="/restaurant" exact>
            <Restaurant></Restaurant>
          </Route>
          <Route path="/login" exact>
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
