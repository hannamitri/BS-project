import logo from "./logo.svg";
import "./components/App.css";
import React, { useState, useEffect, useRef } from "react";
import Menu from "./controllers/Menu";
import Travel from "./components/Tarvel";
import Places from "./components/Places";
import Flight from "./components/Flight";
import Account from "./components/Account";
import Activities from "./components/Activities";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Logout from "./components/Logout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

<link
  rel="stylesheet"
  href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css"
/>;

function App() {
  const [id, setId] = useState(0);
  const LoginContainer = () => (
    <div>
      <Route path="/">
        <Login id={id} setId={setId} />
      </Route>
      <Route path="/register">
        <Registration />
      </Route>
    </div>
  );

  const RegistrationContainer = () => (
    <div>
      <Route path="/register">
        <Registration />
      </Route>
    </div>
  );

  const DefaultContainer = () => (
    <div>
      <Menu />
      <Route path="/travel">
        {" "}
        <Travel id={id} />
      </Route>

      <Route path="/places">
        <Places />
      </Route>

      <Route path="/activities">
        <Activities />
      </Route>

      <Route path="/flight">
        <Flight id={id} />
      </Route>

      <Route path="/account">
        <Account id={id} />
      </Route>
    </div>
  );

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/TraveltoLebanon" component={LoginContainer} />
          <Route exact path="/" component={LoginContainer} />
          <Route exact path="/(register)" component={RegistrationContainer} />
          <Route component={DefaultContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
  