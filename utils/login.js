
import { Scoket } from 'scoket.js';
var scoket = new Scoket()
var wxInfo={}
class Login {
  constructor() { }
  //登录程序
  verify() {
    var token = wx.getStorageSync('token');
    if (!token) {
      this.getTokenFromServer();
    } else {
      this.checkTokenFromServer(token);
    }
  }

  checkTokenFromServer(token) {
    var that = this;
    wx.checkSession({
      fail: res => {
        that.getTokenFromServer();
      },
      success: res => {
        // that.isTokenOverdue(token);
        that.getMyInfo()
        return;
      }
    })
  }



  getTokenFromServer() {
    var is_reg = false;
    var that = this;
    wx.login({
      success: res => {
        wx.request({
          url: 'https://t1-dsxq-mapi.miliyo.com/weixin/login?code=' + res.code,
          method: 'GET',
          success: res => {
            console.log(res)
            wx.setStorageSync('token', res.data.data.uca_id);
              if (res.data.data.is_reg==1){
            that.UserInfo()
              }else{
            that.getMyInfo();
            }


          }
        })
      }
    })

  }



  UserInfo() {
    var that = this
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // that.getUserInfo()
            },
            fail: function () {
              wx.openSetting({
              })
            },
            complete(res) {
              that.getUserInfo()
            }
          })
        } else {
          that.getUserInfo()
        }
      }
    })
  }
  getUserInfo() {
    var that=this;
    wx.getUserInfo({
      lang: 'zh_CN',
      success: data => {
        wxInfo = data.userInfo;
        wx.setStorage({
          key: 'wxInfo',
          data: wxInfo,
          success:function(){
            that.updataInfo() 
          }
        })
        console.log(data.userInfo)
       
      },
      fail: () => {
       wx.redirectTo({
         url: '../accredit/accredit',
       })
        // wx.removeStorageSync("token")
      }
    })
  }
  getMyInfo(){
    var that=this;
    console.log(wx.getStorageSync('token'));
    wx.request({
      url: 'https://t1-dsxq-mapi.miliyo.com/user/get_user_info',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'DSXQID=' + wx.getStorageSync('token')
      },
      success:res=>{
        console.log(res.data.data);
        console.log(res);
        if (res.data.ok==-1){
          that.getTokenFromServer()
          return;
        }
        if (res.data.data.nickname==''){
          that.UserInfo()
        }else{
        wx.setStorageSync('userInfo', res.data.data);
        that.socket()
        // wx.reLaunch({
        //   url: '/pages/planet/planet',
        // })
        }
      }
    })
  }

  updataInfo(){
    var that=this;
   wx.getStorage({
     key: 'wxInfo',
     success: function(res) {
       wx.request({
         url: 'https://t1-dsxq-mapi.miliyo.com/user/update_weixin_info',
         method: "POST",
         data: res.data,
         header: {
           'content-type': 'application/x-www-form-urlencoded',
           'Cookie': 'DSXQID=' + wx.getStorageSync('token')
         },
         success: ret => {
           console.log(ret.data);
           that.getMyInfo()
         }
       })
     },
   })
   
  }
  socket(){
    var userInfo = wx.getStorageSync("userInfo")
    var uid = userInfo.uid;
    wx.request({
      url: 'https://t1-dsxq-mapi.miliyo.com/user/get_socket_key',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'DSXQID=' + wx.getStorageSync('token')
      },
      success:function(res){
        console.log(res)
        wx.setStorageSync('scoketData', res.data.data)
        scoket.connectScoket();
      }
    })
  }
}
export { Login }