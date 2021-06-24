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
        onCollapse={(collapsed, type) => {}}>
        <div
          style={{
            textAlign: "center",
            background: "rgba(255,255,255,.2)",
            margin: "16px",
            color: "#fff",
            padding: "10px",
          }}>
          관리자 {console.log(userInfo)}
        </div>
        {userInfo.adminAuth ? (
          <Menu
            theme="dark"
            selectedKeys={this.state.selectedMenu}
            mode="inline"
            inlineIndent={15}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            onClick={(item) => {
              this.handleChangeTabStatus(item.key);
            }}>
            {userInfo.adminAuth.map((row) => {
              return row.subMenu ? (
                <SubMenu
                  key={row.name}
                  title={
                    <span>
                      {/* <Icon type={row.icon} theme="outlined"/> */}
                      <span>{row.nameKr}</span>
                    </span>
                  }>
                  {row.subMenu.map((child) => {
                    return child.subMenu ? (
                      <SubMenu
                        key={child.name}
                        title={
                          <span>
                            {/* <Icon type={row.icon} theme="outlined"/> */}
                            <span>{child.nameKr}</span>
                          </span>
                        }>
                        {child.subMenu.map((subChild) => (
                          <Menu.Item
                            key={subChild.name}
                            // className="multi-depth-menuitem"
                          >
                            <Link exact="true" to={subChild.path}>
                              {/* <Icon type={child.icon} theme="outlined"
                              /> */}
                              <span className="nav-text">
                                {subChild.nameKr}
                              </span>
                            </Link>
                          </Menu.Item>
                        ))}
                      </SubMenu>
                    ) : (
                      <Menu.Item key={child.name}>
                        <Link exact="true" to={child.path}>
                          {/* <Icon type={child.icon} theme="outlined"
                              /> */}
                          <span className="nav-text">{child.nameKr}</span>
                        </Link>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              ) : (
                <Menu.Item key={row.name}>
                  <Link exact="true" to={row.path}>
                    {/* <Icon type={row.icon} theme="outlined"
                        /> */}
                    <span className="nav-text">{row.nameKr}</span>
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
        ) : (
          <Redirect to="/main" />
        )}
      </Layout.Sider>
    );
  }
}

export default Sider;
