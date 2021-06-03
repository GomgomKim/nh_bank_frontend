import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import { DeliveryList, DeliveryHistoryEmployee, DeliveryHistoryRider } from "../pages";



import { DepositPaymentHistory, DepositWithdrawHistory } from "../pages";
import { LoanRider, LoanFranchise } from "../pages";
import { BikeList } from "../pages";
import { BoardInquiry } from "../pages";
import { OperatorManage } from "../pages";

import { Redirect } from "react-router-dom";
// import OperatorManage from "../pages/system/OperatorManage";


export default class Content extends Component {
  render() {
    return (
      <Layout.Content style={{ margin: "24px 16px 0" }}>
        <div style={{ padding: 24, background: "#fff" }}>
          <Switch>
            <Route exact path="/delivery/DeliveryList" component={DeliveryList} />
            <Route exact path="/delivery/DeliveryHistoryEmployee" component={DeliveryHistoryEmployee} />
            <Route exact path="/delivery/DeliveryHistoryRider" component={DeliveryHistoryRider} />



            {/* <Route exact path="/deposit/depositPayment" component={DepositPayment} /> */}
            <Route exact path="/deposit/depositPaymentHistory" component={DepositPaymentHistory} />
            <Route exact path="/deposit/depositWithdrawHistory" component={DepositWithdrawHistory} />


            <Route exact path="/loan/loanRider" component={LoanRider} />
            <Route exact path="/loan/loanFranchise" component={LoanFranchise} />

            <Route exact path="/bike/BikeList" component={BikeList} />

            <Route exact path="/board/inquiry" component={BoardInquiry} />
            {/* <Redirect to="/board/inquiry" /> */}


            <Route exact path="/system/operatorManage" component={OperatorManage} />

          </Switch>
        </div>
      </Layout.Content>
    );
  }
}
