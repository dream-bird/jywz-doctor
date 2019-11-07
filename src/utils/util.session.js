import storage from "./util.storage";

const session = {};
const role = location.pathname.split("/")[1];
const sessionKey = `${role}_SESSION`;
const expiresKey = `${role}_EXPIRES`;
const userKey = `${role}_USER`;

/**
 * 获取 User
 */
session.getUser = function() {
  return storage.get(userKey);
};

/**
 * 更新 User
 * @param obj
 */
session.updateUser = function(obj) {
  storage.set(userKey, obj);
};

/**
 * 移除 User
 */
session.removeUser = function() {
  storage.remove(userKey);
};

/**
 * 获取 Session
 * @returns {*}
 */
session.get = function() {
  let expireTime = storage.get(expiresKey);
  if (!expireTime) {
    return null;
  } else if (isExpires(expireTime)) {
    storage.remove(sessionKey);
    return null;
  } else {
    return storage.get(sessionKey);
  }
};

/**
 * 更新 Session
 * @param obj
 */
session.update = function(obj) {
  storage.set(sessionKey, obj.access_token);
  storage.set(expiresKey, getExpiresTime(obj.expires_in));
};

/**
 * 移除 Session
 */
session.remove = function() {
  storage.remove(sessionKey);
  storage.remove(expiresKey);
};

/**
 * 检查 Session 是否过期
 * @param expiresTime
 * @returns {boolean}
 */
function isExpires(expiresTime) {
  // 如果过期时间 - 当前时间 < 1 小时，则视为过期
  return expiresTime - new Date().getTime() <= 1 * 60; // * 60 * 1000;
}

/**
 * 获取 Session 过期时间
 * slot 由 API 返回，意为过期间隔，单位秒
 * @param slot
 * @returns {number}
 */
function getExpiresTime(slot) {
  return new Date().getTime() + slot * 1000;
}

export default session;
