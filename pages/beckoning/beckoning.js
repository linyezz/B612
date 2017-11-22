import { Beckoning } from "beckoning_model.js";
import { Config } from '../../utils/config.js';
var beckoning = new Beckoning()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prompt:{
      title:"星动是私密的",
      img:'../../imgs/icon/card_like.png',
      cont: '在单身星球星动是私密的，当你们互相星动时即可获取对方微信号',
      types:1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLoadData();
    this.updateNotification();
  },
  getLoadData:function(){
    var heartflow = wx.getStorageSync('heartflow');
    var message = heartflow.data;
    for (let i in message){
      message[i].types='收到一条星动'
      message[i].url = Config.imgUrl +'news_like.png'
      var thisDate = beckoning.getTime().split(' ')[0];
      if (thisDate == message[i].add_time.split(' ')[0]) {
        message[i].time = message[i].add_time.split(' ')[1]
      } else {
        message[i].time = message[i].add_time.split(' ')[0]
      }
      if (message[i].type==2){
        message[i].types = '你与' + message[i].nickname+'互相星动';
        message[i].beckoning = true;
        message[i].beckoningIcon = Config.imgUrl +'all_like.png';
        message[i].url = message[i].thumb_head_url;
      }
    }
    this.setData({
      message: message
    })
  },
  bindMessageTap:function(e){
    var index = beckoning.getDataSet(e,'index')
    var message=this.data.message;
    var prompt = this.data.prompt;
    if (!message[index].beckoning){
      prompt.show = true;
      this.setData({
        prompt: prompt,
        isLayer:true
      })
    }
  },
  hideLayer:function(e){
    var prompt = this.data.prompt;
    
      prompt.show = false;
      this.setData({
        prompt: prompt,
        isLayer: false
      })
  
  },
  updateNotification:function(){
    var time = beckoning.getTime();
    var data = {
      last_see_heartflow: time
    }
    beckoning.updateNotification(data, function (res) {
      console.log(res)
    })
  },
  bindMessageTap:function(e){
    var index = beckoning.getDataSet(e,'index');
    var message = this.data.message;
    var friend_uid1 = message[index].friend_uid
    if (message[index].beckoning){
      wx.navigateTo({
        url: '../home/home?friend_uid1=' + friend_uid1,
      })
    }
    
  }

})