const exitLogin = function() {
      //清空缓存
      wx.clearStorageSync();
      //重新加载到首页
      wx.reLaunch({
        url: '/pages/my/my'
      })
}

const auth = {
  exitLogin: exitLogin
}

module.exports = {
  ...auth
}