import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

import "./App.css";
import Layout from "./components/Layout";
import { NotFound, Login } from "./pages";
import con from "./const";

class App extends Component {
  componentDidMount() {
  }

  render() {
    const { location } = this.props;
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        {location.pathname === "/404" ? (
          <Route component={NotFound} />
        ) : (
          <Route path="/:page" component={Layout} />
        )}
      </Switch>
    );
  }
}

export default withRouter(App);
