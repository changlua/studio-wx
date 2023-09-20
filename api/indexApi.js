const {get, post} = require("../utils/request.js");

//获取团队数据
const getTeamCounts = function() {
    return get("/api/index/counts")
}

const indexApi = {
  getTeamCounts: getTeamCounts //获取团队数据
}

module.exports = {
  ...indexApi
}