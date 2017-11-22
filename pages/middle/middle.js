import { Config } from '../../utils/config.js';
import{Middle} from 'middle_model.js';
var middle= new Middle()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:Config.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var friend_uid2 = options.friend_uid2
    var friend_uid3 = options.friend_uid3
    var friend={
      friend_uid2: friend_uid2,
      friend_uid3: friend_uid3
    }
    this.setData({
      friend: friend
    })
    this._loadData();
  },
  _loadData(){
    var that=this;
    var userInfo = wx.getStorageSync('userInfo');
    var param=that.data.friend;
    middle.getMIddleInfo(param,function(res){
      console.log(res.data)
      that.setData({
        userInfo: userInfo,
        friendList:res.data
      })
    })
  }
 
})