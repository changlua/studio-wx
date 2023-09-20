let indexApi = require('../../api/indexApi.js')

// pages/one/one.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "flag": true,
    //四个
    "teamCounts": []
  },

  click() {
    this.setData({
      "flag": false
    })
    console.log(this.data.flag)
    //临时存储
    // wx.setStorage({
    //   key: "isSee",
    //   data: "true"
    // });
    //打开tabbar
    wx.showTabBar({
      animation: true,
    })(this);
  },
  //获取团队数据
  getTeamCountsByApi(action = 0){
    console.log(111)
    indexApi.getTeamCounts()
    .then((res)=>{
      console.log(res);
      this.setData({
        "teamCounts": res.data
      });
      console.log(this.data.teamCounts);
      if (action == 1) {
        wx.stopPullDownRefresh();
      }
    }).catch((error) => {
      console.log("error:", error);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.hideTabBar(this);
    this.getTeamCountsByApi();
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
      this.getTeamCountsByApi(1);
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