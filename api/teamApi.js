const {get, post} = require("../utils/request.js");

//获取验证码接口
const getTeamMembers = function() {
    return get("/api/common/members")
}

const teamApi = {
  getTeamMembers: getTeamMembers //获取团队成员数据
}

module.exports = {
  ...teamApi
}