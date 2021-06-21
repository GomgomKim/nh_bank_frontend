import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Layout, Menu } from "antd";
import { reactLocalStorage } from "reactjs-localstorage";

const SubMenu = Menu.SubMenu;

class Sider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <Layout.Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => { }}>
        <div
          style={{
            textAlign: "center",
            // background: "rgba(255,255,255,.2)",
            border: "1px solid #fff",
            margin: "16px",
            color: "#fff",
            padding: "10px",
          }}>
          관리자
        </div>
        <Menu
          theme="dark"
          mode="inline"
          inlineIndent={15}
          onClick={(item) => {
          }}>

          <SubMenu
            key="STATICS_MANAGE"
            title={
              <span>
                {/* <Icon type={row.icon} theme="outlined"/> */}
                <span>통계</span>
              </span>

            }>

            <Menu.Item key="STATICS_BRANCH">
              <Link exact="true" to="/statics/StaticsBranch">
                {/* <Icon type={child.icon} theme="outlined"
                              /> */}
                <span className="nav-text">지점 매출</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="STATICS_RIDER">
              <Link exact="true" to="/statics/StaticsRider">
                {/* <Icon type={child.icon} theme="outlined"
                              /> */}
                <span className="nav-text">라이더 통계</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="STATICS_FRANCHISE">
              <Link exact="true" to="/statics/StaticsFranchise">
                {/* <Icon type={child.icon} theme="outlined"
                              /> */}
                <span className="nav-text">가맹점 통계</span>
              </Link>
            </Menu.Item>
          </SubMenu>


          <SubMenu
            key="DELIVERY_MANAGE"
            title={
              <span>
                <span>배달내역관리</span>
              </span>

            }>

            <Menu.Item key="DELIVERY_LIST">
              <Link exact="true" to="/delivery/DeliveryList">
                <span className="nav-text">배달목록</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="DELIVERY_HISTORY_EMPLOYEE">
              <Link exact="true" to="/delivery/DeliveryHistoryEmployee">
                <span className="nav-text">정직원 배달내역</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="DELIVERY_HISTORY_RIDER">
              <Link exact="true" to="/delivery/DeliveryHistoryRider">
                <span className="nav-text">라이더 배달내역</span>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="FRANCHISE_MANAGE"
            title={
              <span>
                {/* <Icon type={row.icon} theme="outlined"/> */}
                <span>가맹점관리</span>
              </span>

            }>

            <Menu.Item key="FRANCHISE_LIST">
              <Link exact="true" to="/franchise/FranchiseList">
                {/* <Icon type={child.icon} theme="outlined"
                              /> */}
                <span className="nav-text">가맹점 목록</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="FRANCHISE_FEE_HISTORY">
              <Link exact="true" to="/franchise/FranchiseFeeHistory">
                {/* <Icon type={child.icon} theme="outlined"
                              /> */}
                <span className="nav-text">가맹비 내역</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="FRANCHISE_CHARGE_HISTORY">
              <Link exact="true" to="/franchise/FranchiseChargeHistory">
                {/* <Icon type={child.icon} theme="outlined"
                              /> */}
                <span className="nav-text">충전내역</span>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="ADVANCE_PAYMENT_MANAGE"
            title={
              <span>
                {/* <Icon type={row.icon} theme="outlined"/> */}
                <span>선지급관리</span>
              </span>

            }>

            <Menu.Item key="ADVANCE_PAYMENT_LIST">
              <Link exact="true" to="/payment/PaymentList">
                {/* <Icon type={child.icon} theme="outlined"
                              /> */}
                <span className="nav-text">선지급 내역</span>
              </Link>
            </Menu.Item>
          </SubMenu>


          <SubMenu
            key="DEPOSIT_MANAGE"
            title={
              <span>
                <span>예치금관리</span>
              </span>

            }>

            {/* <Menu.Item key="DEPOSIT_PAYMENT">
              <Link exact="true" to="/deposit/DepositPayment">
             
                <span className="nav-text">예치금 지급</span>
              </Link>
            </Menu.Item> */}

            <Menu.Item key="DEPOSIT_PAYMENT_HISTORY">
              <Link exact="true" to="/deposit/DepositPaymentHistory">
                {/* <Icon type={child.icon} theme="outlined"
                              /> */}
                <span className="nav-text">예치금 내역</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="DEPOSIT_WITHDRAW_HISTORY">
              <Link exact="true" to="/deposit/DepositWithdrawHistory">

                <span className="nav-text">예치금 출금내역</span>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="LOAN_MANAGE"
            title={
              <span>
                <span>대출관리</span>
              </span>

            }>

            <Menu.Item key="LOAN_RIDER">
              <Link exact="true" to="/loan/LoanRider">
                <span className="nav-text">라이더 대출목록</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="LOAN_FRANCHISE">
              <Link exact="true" to="/loan/LoanFranchise">
                <span className="nav-text">가맹점 대출목록</span>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="BIKE_MANAGE"
            title={
              <span>
                {/* <Icon type={row.icon} theme="outlined"/> */}
                <span>바이크관리</span>
              </span>

            }>

            <Menu.Item key="BIKE_LIST">
              <Link exact="true" to="/bike/BikeList">
                {/* <Icon type={child.icon} theme="outlined"
                              /> */}
                <span className="nav-text">바이크 목록</span>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="BOARD_MANAGE"
            title={
              <span>

                <span>게시글관리</span>
              </span>

            }>

            <Menu.Item key="BOARD_INQUIRY">
              <Link exact="true" to="/board/Inquiry">

                <span className="nav-text">홈페이지문의</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="BOARD_NOTICE">
              <Link exact="true" to="/board/Notice">

                <span className="nav-text">홈페이지공지</span>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="SYSTEM_MANAGE"
            title={
              <span>
                <span>시스템관리</span>
              </span>

            }>

            <Menu.Item key="OPERATOR_MANAGE">
              <Link exact="true" to="/system/OperatorManage">
                <span className="nav-text"> 운영자 관리</span>
              </Link>
            </Menu.Item>
          </SubMenu>


        </Menu>
      </Layout.Sider>
    );
  }
}

export default Sider;
