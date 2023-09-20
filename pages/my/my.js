import Toast from '@vant/weapp/toast/toast';
var app = getApp();
// 引入api接口
let myApi = require('../../api/myApi.js')
let rsaUtil = require('../../utils/rsaUtil.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // "tabs": [
    //   {
    //     "image1" : "/resources/images/txl.png",
    //     "name" :"编辑资料"
    //   },
    //   {
    //     "image1" : "/resources/images/tq.png",
    //     "name" :"Github"
    //   },
    //   {
    //     "image1" : "/resources/images/xw.png",
    //     "name" :"Gitee"
    //   },
    //   {
    //     "image1" : "/resources/images/qq.png",
    //     "name" :"QQ：939974883"
    //   }
    // ],
    //登录组件展示
    loginShow: false,
    // 验证码base64编码
    base64Img: "",
    //登录表单
    loginForm: {
      username: "",
      password: "",
      code: "",
      uuid: ""
    },
    // 注册相关
    registerShow: false,
    registerForm: {
      username: "",
      password: "",
      invitationCode: ""
    },
    //用户是否已经登录
    isLogin: false,
    //用户信息
    userInfo: {
      userName: "",
      avatar: ""
    }
  },
  clickLogin() {
    this.setData({ loginShow: true });
    // 获取最新登录验证码
    this.refreshVerCode();
  },
  onCloseLogin() {
    this.setData({ loginShow: false });
  },
  //刷新验证码
  refreshVerCode() {
    //获取验证码
    myApi.getVerCode()
      .then((res) => {
        // console.log(res);
        //构建base64字符串
        // let base64Img = 'data:image/png;base64,' + res.data.img;
        let base64Img = res.data.img;
        this.setData({
          "base64Img": base64Img,
          "loginForm.uuid": res.data.uuid
        });
        // console.log(this.data.loginForm)
      }).catch((error) => {
        console.log(error);
      })
  },
  //初始化用户登录信息
  initUserLogin() {
    //若是网络异常

    //获取用户信息
    this.getUserInfoByApi();
  },
  //登录
  login(event) {
    //可得到表单中的name值
    // console.log(event.detail.value)
    //临时保存下密码
    let originPasswd = event.detail.value.password;
    //读取登录用户表单
    this.setData({
      "loginForm.username": event.detail.value.username,
      "loginForm.password": rsaUtil.encryt(event.detail.value.password),
      "loginForm.code": event.detail.value.code
    });
    // console.log(rsaUtil.encryt(event.detail.value.password))
    // console.log("提交的登录数据：", this.data.loginForm);
    //发起登录请求
    myApi.login(this.data.loginForm)
      .then((res) => {
        // console.log(res);
        //登录成功，获取token存储到本地
        wx.setStorageSync('token', res.data.token);
        //提示信息
        Toast("登录成功！");
        //初始化用户信息
        this.initUserLogin();
        //清空数据
        this.clearLoginForm();
        //关闭pop栏目
        this.onCloseLogin();
      }).catch((error) => {
        console.log("error:", error);
        // 恢复原先未加密密码
        this.setData({
          "loginForm.password": originPasswd
        });
        //刷新验证码
        this.refreshVerCode();
        //提示信息
        Toast(error);
      })
  },
  //登录完成之后清空输入数据
  clearLoginForm() {
    this.setData({
      "loginForm": {
        username: "",
        password: "",
        code: "",
        uuid: ""
      },
    })
  },
  //获取用户信息
  getUserInfoByApi() {
    myApi.getUserInfo()
      .then((res) => {
        console.log(res);
        //此时才表示登录成功
        this.setData({
          isLogin: true
        });
        //更新用户信息
        this.setData({
          "userInfo": {
            userName: res.data.user.userName,
            avatar: res.data.user.avatar
          }
        })
      }).catch((error) => {
        console.log(error);
        
      })
  },
  //注册
  clickRegister() {
    this.setData({ registerShow: true });
  },
  //注册功能
  register(event) {
    let originPasswd = event.detail.value.password;
    //注册表单数据封装
    this.setData({
      "registerForm.username": event.detail.value.username,
      "registerForm.password": rsaUtil.encryt(event.detail.value.password),
      "registerForm.invitationCode": event.detail.value.invitationCode
    });
    console.log(this.data.registerForm);
    //发起注册请求
    myApi.register(this.data.registerForm)
      .then((res) => {
        console.log(res);
        //提示信息
        Toast("注册成功！");
        //清除注册表单
        this.setData({
          "registerForm": {
            username: "",
            password: "",
            invitationCode: ""
          },
        });
        //关闭注册界面
        this.setData({ registerShow: false });
        //打开登录界面
        // this.setData({ loginShow: true });
      }).catch((error) => {
        console.log("error:", error);
        Toast(error);
        this.setData({
          "registerForm.password": originPasswd
        });
      })
  },
  onCloseRegister() {
    this.setData({ registerShow: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //同步最新数据
    // this.synUserData();
    console.log(111)
    //检测目前是否登录
    if (app.checkIsLogin()) {
      this.initUserLogin();
    }
  },
  //跳转页面
  clickNavTo(event) {
    let pageName = event.currentTarget.dataset.nav;
    let url = "/pages/" + pageName + "/" + pageName;
    console.log(url)
    // console.log("跳转页面：", url);
    wx.navigateTo({
      url: url,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("onshow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})