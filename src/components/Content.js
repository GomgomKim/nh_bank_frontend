import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { User } from "../pages";
import { Inquiry, Notice } from "../pages";
import { DepositWithdraw, Send } from "../pages";

// import { Redirect } from "react-router-dom";
// import OperatorManage from "../pages/system/OperatorManage";

export default class Content extends Component {
  render() {
    return (
      // <Layout.Content style={{ margin: "2.5vh 16px 0",height:'82.5vh' }}>
      <Layout.Content>
        <div style={{ padding: 24, background: "#fff" }}>
          <Switch>
            <Route exact path="/user/User" component={User} />
            <Route exact path="/board/Inquiry" component={Inquiry} />
            <Route exact path="/board/Notice" component={Notice} />
            <Route exact path="/banking/DepositWithdraw" component={DepositWithdraw} />
            <Route exact path="/banking/Send" component={Send} />
          </Switch>
        </div>
      </Layout.Content>
    );
  }
}
