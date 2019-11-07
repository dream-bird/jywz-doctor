import axios from "axios";
import session from "./util.session";

const MODE = {
  AUTH: "auth",
  DEFAULT: "default"
};

function http(mode) {
  let params = {};
  let headers = {
    "Content-Type": "application/json"
  };

  if (mode === MODE.AUTH) {
    let accessToken = session.get();
    if (accessToken === null) {
      return;
    }
    // params.access_token = accessToken;
    headers["Authorization"] = `Bearer${accessToken}`;
  }

  let instance = axios.create({
    timeout: 20 * 1000,
    baseURL: process.env.BASE_URL,
    headers: headers,
    params: params,
    transformRequest: function(data) {
      return mode === MODE.DEFAULT ? data : JSON.stringify(data);
    },
    validateStatus: function(status) {
      return status >= 200 && status < 300;
    }
  });

  instance.interceptors.response.use(
    function(response) {
      return Promise.resolve(response.data);
    },
    function(error) {
      /* eslint-disable */
      let message = "连接服务器失败";
      if (error && error.response.status) {
        let status = error.response.status;
        switch (status) {
          case 400:
            message = "网络连接失败，请稍后再试";
            if (
              error.response.data.error &&
              error.response.data.error === "invalid_grant"
            ) {
              message = "用户名或密码错误";
            }
            break;
          case 401:
            message = "未授权，请重新登录";
            break;
          case 403:
            message = "拒绝访问，请稍后再试";
            break;
          case 404:
            message = "未找到该资源";
            break;
          case 405:
            message = "请求方法未允许";
            break;
          case 406:
            message = error.response.data.message;
            break;
          case 408:
            message = "请求超时，请稍后再试";
            break;
          case 500:
            message = "服务维护中，请稍后再试";
            break;
          case 501:
            message = "网络未实现，请稍后再试";
            break;
          case 502:
            message = "网络错误，请稍后再试";
            break;
          case 503:
            message = "服务不可用，请稍后再试";
            break;
          case 504:
            message = "网络超时，请稍后再试";
            break;
          case 505:
            message = "不支持该请求，请稍后再试";
            break;
        }
      }
      return Promise.reject(message);
    }
  );

  return instance;
}

const get = function(config) {
  config.method = "get";
  return request(config);
};

const getWithAuth = function(config) {
  config.method = "get";
  return request(config, MODE.AUTH);
};

const post = function(config) {
  config.method = "post";
  return request(config);
};

const postWithAuth = function(config) {
  config.method = "post";
  return request(config, MODE.AUTH);
};

const put = function(config) {
  config.method = "put";
  return request(config);
};

const request = function(config, mode) {
  return new Promise((resolve, reject) => {
    http(mode)(config)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export { request, get, getWithAuth, post, postWithAuth, put };
