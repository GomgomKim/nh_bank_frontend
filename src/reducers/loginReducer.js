import { LOGIN, LOGOUT } from '../actions/loginAction';
import { reactLocalStorage } from 'reactjs-localstorage';
import con from "../const";

const loginInitialState = {
  isLogin: false,
  loginInfo: {
    createDate: '',
    idx: 0,
    ipAddress: '',
    mobile: '',
    name: '',
    password: '',
    superAdmin: 0,
    userId: '',
    authList: [],
  },
};

const login = (state = loginInitialState, action) => {
  // console.log(JSON.stringify(action, null, 4))
  switch (action.type) {
    case LOGIN:
      reactLocalStorage.setObject(con.appName + '#adminUser', action.loginInfo);
      return Object.assign({}, state, {
        isLogin: true,
        loginInfo: action.loginInfo,
      });
    case LOGOUT:
      reactLocalStorage.remove(con + '#adminUser');
      return Object.assign({}, state, {
        isLogin: false,
        loginInfo: {
          createDate: '',
          idx: 0,
          ipAddress: '',
          mobile: '',
          name: '',
          password: '',
          superAdmin: 0,
          userId: '',
          authList: [],
        },
      });
    default:
      return state;
  }
};

export default login;
