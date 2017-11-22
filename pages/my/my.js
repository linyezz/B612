import {My} from "my_model.js";
import {Scoket} from "../../utils/scoket.js";
var my= new My()
var scoket = new Scoket();
const app =getApp()
Page({

  data: {
    
  },

  onLoad: function (options) {
    this._loadData();
  },
  _loadData(){
    var that=this;
    my.getInfo(function(userInfo){
      let isRedHidden=true;
      var hasNew=wx.getStorageSync('hasNew')
      if (hasNew==1){
        isRedHidden=false
      }else{
        isRedHidden=true
      }
        that.setData({
          userInfo:userInfo,
          isRedHidden: isRedHidden
        })
    })
    scoket.getSocketMessage(function(res){
      console.log(res)
      that.setData({
        isRedHidden:false
      })
    })
  },
onShow(){
  var userInfo = wx.getStorageSync('userInfo');
  this.setData({
    userInfo: userInfo,
  })
},
navigateToMyPlanet:function(){
  var usrtId=this.data.userInfo
  wx.navigateTo({
    url: '../home/home',
  })
},
  goToFriend:function(e){
    wx.navigateTo({
      url: '../friends/friends?from=1',
    })
  },
  getPhoneNum:function(e){
    
  },
  getPhoneNumber:function(e){
    
  },
  navigateToMessage:function(e){
    this.setData({
      isRedHidden: true
    })
    wx.setStorageSync('hasNew', 0);
    wx.navigateTo({
      url: '../message/message',
    })
  },
  toPhone:function(e){
    wx.navigateTo({
      url: '../phone/phone',
    })
  },
  gotoHeartFriend:function(e){
    wx.navigateTo({
      url: '../heartfriend/heartfriend',
    })
  }

})