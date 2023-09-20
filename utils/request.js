import Toast from '@vant/weapp/toast/toast';
let auth = require('./auth.js')
const GET = 'GET';
const POST = 'POST';
// const baseUrl = 'https://www.codercl.cn';
const baseUrl = 'http://localhost:8999';

function request(method, url, data, isToken) {
	return new Promise((resolve, reject) => {
		let header = {
		    'content-type': 'application/json' 
    };
    // console.log("isToken:" + isToken);
    //表示需要携带token
    if (isToken) {
      //判断token是否存在
      let token = wx.getStorageSync('token')
      // console.log("token:" + token);
      if (!token) {
        Toast("请重新登录！");
        reject("token失效");
      }
      //添加token
      header.Authorization = 'Bearer ' + token;
    }
		wx.request({
			url: baseUrl + url,
			method: method,
			header: header,
			data: method === 'POST' ? JSON.stringify(data) : data,
			success: (res) => {
        console.log(res)
				if(res.data.code === 200){
					resolve(res.data);
				} else if (res.data.code === 401){
          //退出登录
          auth.exitLogin();
          reject("登录状态已过期，请重新登录！");
				}else {
          reject(res.data.msg);
        }
			},
			fail: (err) => {
        if (err && err.errMsg == "request:fail ") {
          console.log("err:", err);
          Toast("网络异常！");
        }else {
          Toast(err)
          reject(err);
        }
			}
    })
	})
}

function get(url, isToken = false){
  return request(GET, url, null, isToken)
}

function post(url, data, isToken = true){
  return request('POST', url, data, isToken)
}

module.exports = {
	get, post
}