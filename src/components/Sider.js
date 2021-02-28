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
        onCollapse={(collapsed, type) => {}}>
        <div
          style={{
            textAlign: "center",
            background: "rgba(255,255,255,.2)",
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
                  key="BOARD_MANAGE"
                  title={
                    <span>
                      {/* <Icon type={row.icon} theme="outlined"/> */}
                      <span>게시글관리</span>
                    </span>
                  }>
                    
                      <Menu.Item key="BOARD_HOME_INQUIRY">
                        <Link exact="true" to="/board/inquiry">
                          {/* <Icon type={child.icon} theme="outlined"
                              /> */}
                          <span className="nav-text">홈페이지문의</span>
                        </Link>
                      </Menu.Item>
                </SubMenu>

          </Menu>
      </Layout.Sider>
    );
  }
}

export default Sider;
