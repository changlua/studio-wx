import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';

let auth = require('../../utils/auth.js')
let myApi = require('../../api/myApi.js')
let edituserApi = require('../../api/edituserApi.js')


// pages/edituser/edituser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //---年级字段
    //{gradeId: 1, gradeNum: 2022}
    gradeOptions: [],
    gradeNames: {
      text: 'gradeNum',
      value: 'gradeId'
    },
    gradeShow: false, //年级选择展示
    gradeFieldValue: '',//字段key
    gradeCascaderValue: '',//value
    //---年级字段
    //---专业字段
    //0: {majorId: 1, majorName: "计算机科学"}
    majorOptions: [],
    majorNames: {
      text: 'majorName',
      value: 'majorId'
    },
    majorShow: false,
    majorFieldValue: '',//字段key
    majorCascaderValue: '',//value
    //---专业字段
    // 用户表单
    editUserForm: {
      realName: "",
      majorId: "",
      gradeId: "",
      description: "",
      perImg: ""
    },
    isLoading: true,
    //文件上传数组
    fileList: []
  },
  //退出登录
  clickExit() {
    Dialog.confirm({
      message: '确认要退出登录吗？',
    })
    .then(() => {
      auth.exitLogin();
    }).catch(() => {
      // on cancel
    });
  },
  //专业字段相关方法
  onMajorCasClick() {
    this.setData({
      majorShow: true,
    });
  },
  //关闭
  onMajorCasClose() {
    this.setData({
      majorShow: false,
    });
  },
  //选择结束
  onMajorCasFinish(e) {
    //selectedOptions选项名称、value对应的值
    const { selectedOptions, value } = e.detail;
    console.log("selectedOptions:", selectedOptions)
    const fieldValue = selectedOptions
      .map((option) => option.majorName || option.name)
      .join('/');
    console.log("fieldValue:", fieldValue)
    console.log("value:", value)
    this.setData({
      majorFieldValue: fieldValue,
      majorCascaderValue: value,
    })
    console.log(this.data.majorFieldValue);
    console.log(this.data.majorCascaderValue);
    this.onMajorCasClose();
  },
  //年级相关方法
  onGradeCasClick() {
    this.setData({
      gradeShow: true,
    });
  },
  //关闭
  onGradeCasClose() {
    this.setData({
      gradeShow: false,
    });
  },
  //选择结束
  onGradeCasFinish(e) {
    //selectedOptions选项名称、value对应的值
    const { selectedOptions, value } = e.detail;
    console.log("selectedOptions:", selectedOptions)
    const fieldValue = selectedOptions
      .map((option) => option.gradeNum || option.name)
      .join('/');
    console.log("fieldValue:", fieldValue)
    console.log("value:", value)
    this.setData({
      gradeFieldValue: fieldValue,
      gradeCascaderValue: value,
    })
    console.log(this.data.gradeFieldValue);
    console.log(this.data.gradeCascaderValue);
    this.onGradeCasClose();
  },
  //保存编辑
  editUser(event) {
    console.log(event.detail.value);
    this.setData({
      "editUserForm.realName": event.detail.value.realName,
      "editUserForm.majorId": this.data.majorCascaderValue,
      "editUserForm.gradeId": this.data.gradeCascaderValue,
      "editUserForm.description": event.detail.value.description
    });
    console.log(this.data.editUserForm);
    this.editUserByApi(this.data.editUserForm)
  },
  clearEditUserForm() {
        //设置姓名、个人介绍
        this.setData({
          "editUserForm.realName": '',
          "editUserForm.description": '',
        })
        //设置专业字段
        this.setData({
          majorFieldValue: '',
          majorCascaderValue: '',
        })
        //设置年级字段
        this.setData({
          gradeFieldValue: '',
          gradeCascaderValue: '',
        })
  },
  //保存用户
  editUserByApi(data){
    Dialog.confirm({
      message: '确认保存编辑的用户信息吗？',
    })
    .then(() => {
      //调用保存
      edituserApi.editUser(data)
      .then((res) => {
        console.log(res)
        Toast("保存成功！");
      }).catch((error) => {
        console.log("error:", error);
      })
    })
    .catch(() => {
      // on cancel
    });
  },
  //获取菜单数据（调用获取年级、专业接口）
  getMenuByApi() {
    myApi.getMenu()
    .then((res) => {
      console.log(res);
      this.setData({
        "majorOptions": res.data.majors,
        "gradeOptions": res.data.grades
      });
      console.log("majors:", this.data.majorOptions)
      console.log("grades:", this.data.gradeOptions)
    }).catch((error) => {
      console.log("error:", error);
    })
  },
  //获取用户数据
  getUserInfoByApi() {
    myApi.getUserInfo()
      .then((res) => {
        console.log(res);
        //设置姓名、个人介绍
        this.setData({
          "editUserForm.realName": res.data.user.realName,
          "editUserForm.description": res.data.user.description,
          "editUserForm.perImg": res.data.user.perImg,
        })
        //设置专业字段
        this.setData({
          majorFieldValue: res.data.user.majorName,
          majorCascaderValue: res.data.user.majorId,
        })
        //设置年级字段
        this.setData({
          gradeFieldValue: res.data.user.gradeNum,
          gradeCascaderValue: res.data.user.gradeId,
        })
      }).catch((error) => {
          console.log(error);
      })
  },
  //文件上传组件
  beforeRead(event) {
    console.log("beforeRead...")
    const { file, callback } = event.detail;
    //图片不能超过10MB
    if (file.size > 10 * 1024 * 1024) {
      Toast("文件大小不能超过10M!");
      callback(false);
    }
    let name = file.url.substring(file.url.lastIndexOf("."));
    //http://tmp/WMb69lOn0SUVf2aee9aed0a1fa8f07c1fcadcb908898.jpg
    console.log("name", file.url);
    //图片必须是 .png 或 .jpg!
    if (name != '.png' && name != '.jpg') {
      Toast("图片必须是 .png 或 .jpg!");
      callback(false);
    }
    callback(true)
  },
  afterRead(event) {
    console.log("afterRead...")
    const that = this
    const {file} = event.detail;
    wx.uploadFile({
      url:'http://localhost:8999/api/zf/api/upload',
      filePath: file.url,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data;charset=UTF-8",
        "Authorization": 'Bearer ' + wx.getStorageSync('token')
      },
      formData: {
        "file": file.url
      },
      success: function (res) {
        console.log(res);
        //需要将结果数据进行反序列化
        console.log(JSON.parse(res.data));
        let data = JSON.parse(res.data);
        Toast("上传成功！");
        that.setData({
          "editUserForm.perImg": data.data.visitUrl
        });
      },
      fail: function (res) {}
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      this.setData({
        isLoading: true
      })
      this.getMenuByApi();
      this.getUserInfoByApi();
      this.setData({
        isLoading: false
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