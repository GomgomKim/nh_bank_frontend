import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Layout, Menu } from "antd";
import { reactLocalStorage } from "reactjs-localstorage";
import con from "../const";

const SubMenu = Menu.SubMenu;

class Sider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
      menus: [],
      selectedMenu: [],
    };
  }

  componentDidMount() {
    const userInfo = reactLocalStorage.getObject(con.appName + "#adminUser");
    
    if (userInfo.idx) this.handleChangeTabStatus(null);
  }

  onOpenChange = (openKeys) => {
    const userInfo = reactLocalStorage.getObject(con.appName + "#adminUser");
    let rootMenu = userInfo.adminAuth.map((list) => {
      return list.name;
    });
    const latestOpenKey = openKeys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    );
    if (rootMenu.indexOf(latestOpenKey) === -1) {
      // console.log(`rootMenu= ${JSON.stringify(rootMenu, null, 4)}`);
      // console.log(`openKeys= ${JSON.stringify(openKeys, null, 4)}`);
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  handleChangeTabStatus = (key) => {
    const userInfo = reactLocalStorage.getObject(con.appName + "#adminUser");
    // console.log(JSON.stringify(userInfo, null, 4))
    let selectedMenu = [];
    if (key) {
      this.setState({
        selectedMenu: [key],
      });
    } else {
      userInfo.adminAuth.forEach((value, index) => {
        if (value.subMenu) {
          value.subMenu.forEach((c) => {
            if (c.path === this.props.location.pathname) {
              selectedMenu = [c.name];
            }
          });
        } else {
          if (value.path === this.props.location.pathname) {
            selectedMenu = [value.name];
          }
        }
      });
      this.setState({
        selectedMenu: selectedMenu,
      });
    }
  };

  render() {
    const userInfo = reactLocalStorage.getObject(con.appName + "#adminUser");
    // console.log(JSON.stringify(userInfo, null, 4))
    return (
      <Layout.Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => { }}>
        <div
          style={{
            textAlign: "center",
            background: "rgba(255,255,255,.2)",
            margin: "16px",
            color: "#fff",
            padding: "10px",
          }}>
          관리 시스템
        </div>
        <Menu
          theme="dark"
          mode="inline"
          inlineIndent={15}
          onClick={(item) => {
          }}>

          <SubMenu
            key="FRANCHISE_MANAGE"
            title={
              <span>
                {/* <Icon type={row.icon} theme="outlined"/> */}
                <span>회원관리</span>
              </span>
            }>
            <Menu.Item key="FRANCHISE_MANAGE_TID">
              <Link exact="true" to="/user/User">
                <span className="nav-text">회원관리</span>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="CASH_MANAGE"
            title={
              <span>
                <span>뱅킹</span>
              </span>
            }>
            <Menu.Item key="CASH_CHARGE">
              <Link exact="true" to="/banking/DepositWithdraw">
                <span className="nav-text">입출금</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="CASH_USE">
              <Link exact="true" to="/banking/Send">
                <span className="nav-text">송금</span>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="BOARD_MANAGE"
            title={
              <span>
                <span>커뮤니티</span>
              </span>
            }>
            <Menu.Item key="BOARD_EVENT">
              <Link exact="true" to="/board/Notice">
                <span className="nav-text">게시판</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="BOARD_FAQ">
              <Link exact="true" to="/board/Inquiry">
                <span className="nav-text">데이터 사전</span>
              </Link>
            </Menu.Item>
          </SubMenu>

        </Menu>
      </Layout.Sider>

    );
  }
}

export default Sider;
