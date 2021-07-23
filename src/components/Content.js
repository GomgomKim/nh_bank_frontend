import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { StaticsBranch, StaticsRider, StaticsFranchise } from "../pages";
import { DeliveryList, DeliveryHistoryEmployee, DeliveryHistoryRider } from "../pages";
import { FranchiseList, FranchiseChargeHistory, FranchiseFeeHistory } from "../pages";
import { PaymentList } from "../pages";
import { DepositAllHistory, DepositPaymentHistory, DepositWithdrawHistory } from "../pages";
import { LoanRider, LoanFranchise } from "../pages";
import { BikeList } from "../pages";
import { Inquiry, Notice } from "../pages";
import { OperatorManage, ControlAgentManage } from "../pages";
import {
  Aggregation, AddCost, LeaseDeposit, InsuranceDeposit,
  DeliveryCost, FeeDeposit, FrDuesDeposit, SellProdDeposit
} from "../pages";
import { NcashDailyList } from "../pages";

// import { Redirect } from "react-router-dom";
// import OperatorManage from "../pages/system/OperatorManage";


export default class Content extends Component {
  render() {
    return (
      // <Layout.Content style={{ margin: "2.5vh 16px 0",height:'82.5vh' }}>
      <Layout.Content>
        <div style={{ padding: 24, background: "#fff" }}>
          <Switch>

            <Route exact path="/statics/StaticsBranch" component={StaticsBranch} />
            <Route exact path="/statics/StaticsRider" component={StaticsRider} />
            <Route exact path="/statics/StaticsFranchise" component={StaticsFranchise} />

            <Route exact path="/delivery/DeliveryList" component={DeliveryList} />
            <Route exact path="/delivery/DeliveryHistoryEmployee" component={DeliveryHistoryEmployee} />
            <Route exact path="/delivery/DeliveryHistoryRider" component={DeliveryHistoryRider} />

            <Route exact path="/franchise/FranchiseList" component={FranchiseList} />
            <Route exact path="/franchise/FranchiseChargeHistory" component={FranchiseChargeHistory} />
            <Route exact path="/franchise/FranchiseFeeHistory" component={FranchiseFeeHistory} />

            <Route exact path="/payment/PaymentList" component={PaymentList} />

            <Route exact path="/deposit/DepositAllHistory" component={DepositAllHistory} />
            <Route exact path="/deposit/DepositPaymentHistory" component={DepositPaymentHistory} />
            <Route exact path="/deposit/DepositWithdrawHistory" component={DepositWithdrawHistory} />


            <Route exact path="/loan/LoanRider" component={LoanRider} />
            <Route exact path="/loan/LoanFranchise" component={LoanFranchise} />

            <Route exact path="/bike/BikeList" component={BikeList} />

            <Route exact path="/board/Inquiry" component={Inquiry} />
            <Route exact path="/board/Notice" component={Notice} />
            {/* <Redirect to="/board/inquiry" /> */}


            <Route exact path="/system/OperatorManage" component={OperatorManage} />
            <Route exact path="/system/ControlAgentManage" component={ControlAgentManage} />

            <Route exact path="/settlement/Aggregation" component={Aggregation} />
            <Route exact path="/settlement/AddCost" component={AddCost} />
            <Route exact path="/settlement/LeaseDeposit" component={LeaseDeposit} />
            <Route exact path="/settlement/InsuranceDeposit" component={InsuranceDeposit} />
            <Route exact path="/settlement/DeliveryCost" component={DeliveryCost} />
            <Route exact path="/settlement/FeeDeposit" component={FeeDeposit} />
            <Route exact path="/settlement/FrDuesDeposit" component={FrDuesDeposit} />
            <Route exact path="/settlement/SellProdDeposit" component={SellProdDeposit} />

            <Route exact path="/ncash/NcashDailyList" component={NcashDailyList} />


          </Switch>
        </div>
      </Layout.Content>
    );
  }
}
