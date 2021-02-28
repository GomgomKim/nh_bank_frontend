import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { BoardInquiry } from "../pages";
import { Redirect } from "react-router-dom";

export default class Content extends Component {
  render() {
    return (
      <Layout.Content style={{ margin: "24px 16px 0" }}>
        <div style={{ padding: 24, background: "#fff" }}>
          <Switch>
            {/* 게시글 */}
            <Route exact path="/board/inquiry" component={BoardInquiry} />
            <Redirect to="/board/inquiry" />

          </Switch>
        </div>
      </Layout.Content>
    );
  }
}
