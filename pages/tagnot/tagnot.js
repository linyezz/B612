// pages/tagnot/tagnot.js
import{Tag} from 'tagnot_model.js';
var tag =new Tag()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLoadData()
    this.updateNotification()
  },
  updateNotification() {
    var time = tag.getTime();
    var data = {
      last_see_impress: time
    }
    tag.updateNotification(data, function (res) {
      console.log(res)
    })
  }, 
  getLoadData: function () {
    var labelMessage = wx.getStorageSync('labelMessage');
    var message = labelMessage.data;
    for (let i in message) {
      message[i].types = message[i].nickname
      message[i].url = message[i].thumb_head_url;
      message[i].cont = '添加了印象:' + message[i].name;
    }
    this.setData({
      message: message
    })
  },
})