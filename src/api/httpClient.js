import Axios from "axios";
import util from "util";
import Const from "../const";
import { reactLocalStorage } from "reactjs-localstorage";
let loadingCount = 0;

global.language = "ko";
global.lanList = ["ko", "en", "ja", "zh"];

const serverUrl =
  Const.serverProtocol + "://" + Const.serverIp + ":" + Const.serverPort;

const makeUrl = (url, params) => {
  var result = serverUrl + url;
  if (params === null) return result;
  params.forEach((param) => {
    result = util.format(result, param);
  });
  return result;
};

const httpExec = (method, url, data) => {
  loadingCount++;
  if (loadingCount === 1)
    global.document.getElementById("loadingSpinner").style.display = "block";

  return new Promise((resolve, reject) => {
    Axios({
      method: method,
      url: url,
      data: data,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // if (
        //   url === serverUrl + httpUrl.login ||
        //   url === serverUrl + httpUrl.logout
        // ) {
        // } else {
        //   if (
        //     (method === 'PUT' || method === 'POST' || method === 'DELETE') &&
        //     response.data.result === 'SUCCESS'
        //   ) {
        //     alert('완료');
        //   }
        // }
        resolve(response.data);
        loadingCount--;
        if (loadingCount === 0)
          global.document.getElementById("loadingSpinner").style.display =
            "none";
      })
      .catch((error) => {
        // console.log(JSON.stringify(error, null, 4));
        if (error.message.includes("401")) {
          alert("로그인이 만료되었습니다. 다시 로그인해주세요");
          reactLocalStorage.remove("adminUser");
          global.location.href = "/";
        }
        // if (error.response.data.message === 'E10003') {
        //   if (!isAlertOpened) {
        //     isAlertOpened = true;
        //     alert('장기간 미사용으로 자동 로그아웃 되었습니다.');
        //     global.location.href = '/';
        //   }
        // } else if (error.response.data.data === 'E10003') {
        //   if (!isAlertOpened) {
        //     isAlertOpened = true;
        //     alert('접근 권한이 없습니다. 로그인 해주세요.');
        //     global.location.href = '/';
        //   }
        // }
        // alert(JSON.stringify(error));
        reject(error);
        loadingCount--;
        if (loadingCount === 0)
          global.document.getElementById("loadingSpinner").style.display =
            "none";
      });
  });
};

const httpGet = (url, params, data) => {
  return httpExec("GET", makeUrl(url, params), data);
  // return new Promise((resolve, reject) => {
  //   Axios.get(makeUrl(url, params), data)
  //     .then(response => {
  //       resolve(response.data);
  //     })
  //     .catch(error => {
  //       reject(error);
  //     });
  // });
};

const httpPut = (url, params, data) => {
  return httpExec("PUT", makeUrl(url, params), data);
  // return new Promise((resolve, reject) => {
  //   Axios.put(makeUrl(url, params), data)
  //     .then(response => {
  //       resolve(response.data);
  //     })
  //     .catch(error => {
  //       reject(error);
  //     });
  // });
};

const httpPost = (url, params, data) => {
  return httpExec("POST", makeUrl(url, params), data);
  // return new Promise((resolve, reject) => {
  //   Axios.post(makeUrl(url, params), data)
  //     .then(response => {
  //       resolve(response.data);
  //     })
  //     .catch(error => {
  //       reject(error);
  //     });
  // });
};

const httpDownload = (url, params, data) => {
  // return httpExec('GET', makeUrl(url, params), data);
  return new Promise((resolve, reject) => {
    Axios({
      method: "GET",
      url: makeUrl(url, params),
      data: data,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
    })
      .then((response) => {
        var blob = new Blob([response.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        resolve(blob);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const httpUrl = {
  login: "/login",
  logout: "/logout",

  //게시판
  inquiryList: "/inquiry/list?pageSize=%s&pageNum=%s",
  inquiryUpdate: "/inquiry/modify",
};

const imageType = ["image/jpeg", "image/png", "image/bmp"];

export {
  serverUrl,
  httpExec,
  makeUrl,
  httpGet,
  httpUrl,
  httpPut,
  httpPost,
  httpDownload,
  imageType,
};