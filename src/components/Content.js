import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";


import { DepositPaymentHistory, DepositWithdrawHistory } from "../pages";
import { LoanRider, LoanFranchise } from "../pages";
import { BoardInquiry } from "../pages";
import { Redirect } from "react-router-dom";


export default class Content extends Component {
  render() {
    return (
      <Layout.Content style={{ margin: "24px 16px 0" }}>
        <div style={{ padding: 24, background: "#fff" }}>
          <Switch>
            {/* 게시글 */}
            {/* <Route exact path="/deposit/depositPayment" component={DepositPayment} /> */}
            <Route exact path="/deposit/depositPaymentHistory" component={DepositPaymentHistory} />
            <Route exact path="/deposit/depositWithdrawHistory" component={DepositWithdrawHistory} />


            <Route exact path="/loan/loanRider" component={LoanRider} />
            <Route exact path="/loan/loanFranchise" component={LoanFranchise} />





            <Route exact path="/board/inquiry" component={BoardInquiry} />
            <Redirect to="/board/inquiry" />

          </Switch>
        </div>
      </Layout.Content>
    );
  }
}
