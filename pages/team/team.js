import Toast from '@vant/weapp/toast/toast';

// 引入api接口
let teamApi = require('../../api/teamApi.js')
let app = getApp();

// pages/team/team.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    detail: 'nav1',
    membersArr: [],
    // {name:xxx, navToId: xxx}
    navgiteArr: [],
    skeletonLoading: true
  },

  click(event) {
    let navToId = event.currentTarget.dataset.navid;
    this.setData({
      "detail": navToId
    });
    console.log(this.data.detail)
  },
  //生成导航栏数据
  generateNavigatorData(membersArr) {
    const navgiteArr = [];
    for (let i = 0; i < membersArr.length; i++) {
      let name = membersArr[i].grade;
      let navToId = "nav" + i;
      navgiteArr.push({"name": name, "navToId": navToId});
    } 
    this.setData({
      "navgiteArr": navgiteArr
    });
    console.log(navgiteArr);
  },
  //获取团队成员数据Api接口
  //action表示动作，默认0不做任何动作，action=1表示进行下拉关闭
  getTeamMembersByApi(action = 0) {
    teamApi.getTeamMembers()
    .then((res) => {
        console.log(res);
        this.setData({
          "membersArr": res.data
        });
        console.log(this.data.membersArr)
        //成功获取之后进行生成导航栏
        this.generateNavigatorData(this.data.membersArr);
        //若是下拉关闭
        if (action == 1) {
          wx.stopPullDownRefresh();
          console.log("刷新成功！")
        }
        //骨架屏开启
        this.setData({
          skeletonLoading: false
        });
    }).catch((error) => {
        console.log(error);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("高度：" + wx.getSystemInfoSync().windowHeight)
    this.setData({
      "height": wx.getSystemInfoSync().windowHeight
    });
    this.getTeamMembersByApi();
  },
  toMemberShow() {
    //判断是否登录，若是没有登录无法查看
    if (app.checkIsLogin()) {
      // console.log("跳转页面：", url);
      wx.navigateTo({
        url: "/pages/membershow/membershow",
      })
    }else {
      Toast("登录之后才可查看详细信息！");
    }

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

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
    console.log(666)
    this.getTeamMembersByApi(1);
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