const {get, post} = require("../utils/request.js");

//获取验证码接口
const getVerCode = function() {
    return get("/api/captchaImage")
}

//登录请求
const login = function(data) {
    return post("/api/login", data, false)
}

//获取用户信息
const getUserInfo = function() {
  return get("/api/system/user/profile", true)
}

//获取所有专业、年级菜单
const getMenu = function() {
  return get("/api/own/info/getMenu", true)
}

//注册接口
const register = function(data) {
  return post("/api/register", data, false)
}

const myApi = {
  getVerCode: getVerCode, //获取登录验证码
  login: login,            //登录接口
  getUserInfo: getUserInfo,  //获取用户信息
  getMenu: getMenu,          //获取年级、专业菜单
  register: register       //注册接口
}

module.exports = {
  ...myApi
}