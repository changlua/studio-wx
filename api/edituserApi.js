const {get, post} = require("../utils/request.js");

//修改用户信息
const editUser = function(data) {
    return post("/api/own/info", data)
}

const edituserApi = {
  editUser: editUser //编辑用户
}

module.exports = {
  ...edituserApi
}