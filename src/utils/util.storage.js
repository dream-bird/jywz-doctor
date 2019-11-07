// https://www.npmjs.com/package/js-cookie
import Cookies from "js-cookie";
import pkg from "../../package";

const flag = pkg.name + "_" + pkg.version;
const storage = {};

storage.key = function(key) {
  return (flag + "_" + key).toUpperCase();
};

storage.set = function(key, value) {
  let _key = storage.key(key);
  Cookies.set(_key, value);
};

storage.get = function(key) {
  let _key = storage.key(key);
  // return Cookies.get(_key)
  return Cookies.getJSON(_key);
};

storage.remove = function(key) {
  let _key = storage.key(key);
  Cookies.remove(_key);
};

export default storage;
