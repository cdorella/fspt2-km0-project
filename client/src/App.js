import React from "react";
import "./App.css";
import Home from "./home.jsx";
import Restaurant from "./restaurant.jsx";
import Login from "./components/login.jsx";
import UserProfile from "./components/userProfile.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Results from "./Results.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" exact component={Login}>
            {/* <Login></Login> */}
          </Route>
          <Route path="/" exact>
            <Home></Home>
          </Route>
          <Route path="/restaurant" exact>
            <Restaurant></Restaurant>
          </Route>
          <Route path="/results" exact>
            <Results></Results>
          </Route>
          <Route path="/profile" exact>
            <UserProfile></UserProfile>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
