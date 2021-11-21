import React, { Component } from "react";
import { connect } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { Form, Input, Button, Checkbox } from "antd";
import Icon from '@ant-design/icons';

import { login } from "../actions/loginAction";
import { httpPost, httpUrl } from "../api/httpClient";
import { withRouter } from "react-router-dom";
import Const from "../const";

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.formRef = React.createRef();
  }

  handleSubmit = (e) => {
    this.props.history.push('/main')

    // httpPost(httpUrl.login, [], {
    //   ...this.formRef.current.getFieldsValue()
    // })
    //   .then((res) => {
    //     // console.log(JSON.stringify(res, null, 4))
    //     if (res.data.result) {
    //       this.props.onLogin({
    //         ...res.data.adminUser,
    //         authList: res.data.authorities,
    //       });
    //       if(res.data.adminUser.adminAuth.length === 0)
    //         this.props.history.push('/main')
    //       else
    //         this.props.history.push(res.data.adminUser.adminAuth[0].subMenu[0].path)
    //     }
    //     else {
    //       alert("아이디 또는 비밀번호가 잘못되었습니다.")
    //     }
    //   })
    //   .catch((error) => { });
  }

  componentDidMount() {
  }

  render() {

    return (
      <div className="login-container">
        <Form ref={this.formRef} onFinish={this.handleSubmit} className="login-form">
          <div className="login-img">
            <img src={require('../img/login_img.png').default} />
          </div>
          <div className="login-text">
              NH 은행업무시스템
          </div>
          <FormItem
            name="id"
            rules={
              [{ required: true, message: "아이디를 입력해주세요" }]
            }
          >
            <Input
              prefix={
                <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="아이디"
            />
          </FormItem>
          <FormItem
            name="password"
            rules={
              [{ required: true, message: "비밀번호를 입력해주세요." }]
            }>
            <Input
              prefix={
                <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              type="password"
              placeholder="비밀번호"
            />
          </FormItem>
          {/* <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
            })(<Checkbox className="checkbox mt-15">아이디 저장</Checkbox>)}
          </FormItem> */}
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}>
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    isLogin: state.login.isLogin,
    loginInfo: state.login.loginInfo,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (userinfo) => dispatch(login(userinfo)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
