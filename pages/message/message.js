import { Config } from '../../utils/config.js'
import {Message} from "message_model.js";
var message=new Message()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isEmpty:false,
    pageEmpty:{
      name:'我的心动',
      url: Config.imgUrl+'blank_news.png',
      cont:'暂无通知',
      socketOpen:false,
      imgUrl: Config.imgUrl
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApplyFriend();
    this.getHeartflow();
    this.getLabel();
    this.getPhoneNumberMessage()
  },
  //添加好友消息查询
  getApplyFriend(){
    var that=this;
    message.getFriendApply(function(res){
      let friendApply=res.data;
      let applyList = friendApply.data;
      let cont ='你有新的好友申请';
      if (applyList.length==0){
        cont='暂无好友申请'
      }
      let lastTime =friendApply.last_time;
      let num=0;
      let time;
      for (let i in applyList){
        var thisTime =applyList[i].add_time;
        if (message.differTime(thisTime,lastTime)>0){
          num++;
        }
        if(i==0){
          var thisDate = message.getTime().split(' ')[0];
          if (thisDate == friendApply.last_time.split(' ')[0]){
            time = friendApply.last_time.split(' ')[1]
          }else{
            time = friendApply.last_time.split(' ')[0]
          }
          
        }
      }
      var Apply = {
        url: Config.imgUrl +'news_friend.png',
        types:'好友申请',
        cont: cont,
        time: time,
        num: num
      }
      that.setData({
        Apply: Apply
      })
      wx.setStorageSync('friendApply', friendApply)
      console.log(res)
    })
  },
//心动消息列表查询
  getHeartflow(){
    var that = this;
    message.getHeartflow(function(res){
      console.log(res)
      let heartflow = res.data;
      let heartflowList = heartflow.data
      let lastTime = heartflow.last_time;
      let num = 0;
      let time;
      for (let i in heartflowList) {
        var thisTime = heartflowList[i].add_time;
        if (message.differTime(thisTime, lastTime) > 0 || lastTime == "0000-00-00 00:00:00") {
          num++;
        }
        if (i == 0) {
          var thisDate = message.getTime().split(' ')[0];
          if (thisDate == heartflowList[i].add_time.split(' ')[0]) {
            time = heartflowList[i].add_time.split(' ')[1]
          } else {
            time = heartflowList[i].add_time.split(' ')[0]
          }

        }
      }
      var beckoning={
        url: Config.imgUrl + 'news_like.png',
        types: '收到的星动',
        cont: '收到'+num+'条新星动',
        time: time,
        num: num
      }
      that.setData({
        beckoning: beckoning
      })
      wx.setStorageSync('heartflow', heartflow)
    })
  },
  //添加标签消息查询
  getLabel(){
    var that = this;
    message.getLabel(function(res){
      console.log(res)
      let label = res.data;
      let laeblList = label.data
      let lastTime = label.last_see_impress;
      let num = 0;
      let time,name;
      for (let i in laeblList) {
        var thisTime = laeblList[i].add_time;
        if (message.differTime(thisTime, lastTime) > 0 || lastTime == "0000-00-00 00:00:00") {
          num++;
        }
        if (i == 0) {
          var thisDate = message.getTime().split(' ')[0];
          if (thisDate == laeblList[i].add_time.split(' ')[0]) {
            time = laeblList[i].add_time.split(' ')[1]
          } else {
            time = laeblList[i].add_time.split(' ')[0]
          }
          name = laeblList[i].nickname
        }
      }
      let cont = name + '给你添加了新的印象';
      if (laeblList.length == 0 || !laeblList){
        cont='无新标签'
      }
      var labelMessage={
        url: Config.imgUrl + 'news_yinxiang.png',
        types: '印象',
        cont: cont,
        time: time,
        num: num
      }
      that.setData({
        labelMessage: labelMessage
      })
      wx.setStorageSync('labelMessage', label)
    })
  },
  //索要手机号消息查询
  getPhoneNumberMessage:function(){
    var that=this;
    message.getPhoneNumberMessage(function(res){
      console.log(res)
      var getPhoneList=res.data;
      for (let i in getPhoneList){
        getPhoneList[i].types = getPhoneList[i].nickname;
        getPhoneList[i].url = getPhoneList[i].thumb_head_url;
        getPhoneList[i].cont = '申请查看你的微信号';
        getPhoneList[i].getPhone=true;
        getPhoneList[i].canCheck=false;
        var thisDate = message.getTime().split(' ')[0];
        console.log('thisDate:' + thisDate + ":" + getPhoneList[i].add_time.split(' ')[0])
        if (thisDate == getPhoneList[i].add_time.split(' ')[0]) {
          getPhoneList[i].time = getPhoneList[i].add_time.split(' ')[1]
        } else {
          getPhoneList[i].time = getPhoneList[i].add_time.split(' ')[0]
        }
        if (getPhoneList[i].status==1){
          getPhoneList[i].agreePhone=true;

        }
        if (getPhoneList[i].status==3){
          getPhoneList[i].getPhone = false;
          getPhoneList[i].canCheck=true;
          getPhoneList[i].cont = '已同意你查看微信号';

        }

      }
      that.setData({
        getPhoneList: getPhoneList
      })

    })
  },
  //同意添手机号
  agreePhone:function(e){
    var that=this;
    var index = message.getDataSet(e,'index')
    var getPhoneList = this.data.getPhoneList;
    var from_uid = getPhoneList[index].from_uid;
    var userInfo=wx.getStorageSync('userInfo')
    var id = getPhoneList[index].id;
    if (getPhoneList[index].status==1){
      return
    }
    if (userInfo.phone_number = '' || !userInfo.phone_number){
      wx.navigateTo({
        url: '../phone/phone',
      })
      return
    }
    var param={
      from_uid: from_uid,
      id:id
    }
    message.agreePhone(param,function(res){

      console.log(res)
      getPhoneList[index].agreePhone=true;
      that.setData({
        getPhoneList: getPhoneList
      })
    })
  },
  //消息点击事件
  bindMessageTap(e){
    var that = this;
    var click = message.getDataSet(e,'type')
    console.log(click)
    switch(click){
      case 1:
        wx.navigateTo({
          url: '../apply/apply',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../beckoning/beckoning',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../tagnot/tagnot',
        })  
        break;
      case 4:
        var index = message.getDataSet(e, 'index')
        var getPhoneList = this.data.getPhoneList;
        var from_uid = getPhoneList[index].from_uid;
        console.log(getPhoneList[index])
        if (getPhoneList[index].status == 3) {
          wx.navigateTo({
            url: '../home/home?friend_uid1=' + from_uid
          })  
          
        }
        break;  
    }
  }

  
})