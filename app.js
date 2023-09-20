
// app.js
App({
  onLaunch() {
    this.initUserInfo();
  },
  globalData: {
    //校验是否登录
    isLogin: false
  },
  //初始化操作
  initUserInfo() {
    //判断用户是否登录
    if (!this.checkIsLogin()) {
      this.globalData.isLogin = false;
      return;
    }
    //设置为已登录
    this.globalData.isLogin = true;
  },
  //检测是否登录
  checkIsLogin() {
    let token = wx.getStorageSync('token');
    if (token) return true;
    return false;
  },

})
