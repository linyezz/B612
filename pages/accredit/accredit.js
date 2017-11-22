import{Config} from '../../utils/config.js';
Page({
  data: {
    imgUrl: Config.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  openSetting:function(){
    wx.openSetting({
      
    })
  }
})