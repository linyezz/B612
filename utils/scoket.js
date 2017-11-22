
import {Config} from "config.js";
class Scoket {
  constructor(){
    this.baseScoketUrl = Config.baseScoketUrl;
  }
  //链接socket
  connectScoket() {
    var that = this;
    var result;
    var baseScoketUrl = this.baseScoketUrl
    var scoketMessage=[];
    wx.setStorageSync('scoketMessage', scoketMessage)
    wx.connectSocket({
      url: baseScoketUrl,
      success: function () {
        result = true;
        console.log('Scoket链接成功')
        that.sendScoketMessage()
      }
    })

  }

  //发送请求
  sendScoketMessage() {

    var that = this;
    var uid = wx.getStorageSync('userInfo').uid
    var scoketData = wx.getStorageSync('scoketData')
    var authstr = scoketData.key;
    var timestamp = scoketData.time
    console.log('authstr:' + authstr)
    var data = {
      cmd: "login",
      uid: uid,
      timestamp: timestamp,
      authstr: authstr
    }
    data = JSON.stringify(data)
    wx.onSocketOpen(function () {
      wx.sendSocketMessage({
        data: data,
        success: res => {
          console.log(res)
          setInterval(function () {
            that.sendHeart()
          }, 60000)
        },
        fail: res => {
          console.log("发送失败：" + res.errMeg)
        }
      })
    })
    wx.onSocketClose(function (res) {
      console.log('Scoket链接失败')
      console.log(res)
      that.connectScoket()
    })
    wx.onSocketError(function (res) {
      console.log(res)
    })
    that.getSocketMessage()
  }
  //socket心跳
  sendHeart() {
    var data = {
      cmd: 'heart'
    }
    data = JSON.stringify(data)
    wx.sendSocketMessage({
      data: data,
    })
  }

  getSocketMessage(callBack){
    var scoketMessage = wx.getStorageSync('scoketMessage')
    wx.onSocketMessage(function (res) {
      console.log(res)
      var message = JSON.parse(res.data);
      if (message.cmd=='notice'){
        scoketMessage.unshift(message);
        wx.setStorageSync('scoketMessage', scoketMessage)
        wx.setStorageSync('hasNew',1);
        callBack && callBack(res)
      }
      
      

    })
  }
}
export { Scoket}