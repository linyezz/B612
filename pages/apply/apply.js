import { Config } from '../../utils/config.js';
import{Apply} from 'apply_model.js';
var apply = new Apply()
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
    this.updateNotification()
    this.getInfo()
  },
  getInfo(){
    var friendApply = wx.getStorageSync('friendApply');
    console.log(friendList)
    var friendList = friendApply.data;
    for (let i in friendList){
      friendList[i].friendApply=true;
      friendList[i].isFriend=false;
      friendList[i].friend_uid2 = friendList[i].uid;
      friendList[i].age = apply.jsGetAge(friendList[i].birthday)
      var thisDate = apply.getTime().split(' ')[0];
      if (thisDate == friendList[i].add_time.split(' ')[0]) {
        friendList[i].time = friendList[i].add_time.split(' ')[1]
      } else {
        friendList[i].time = friendList[i].add_time.split(' ')[0]
      }
    }
    this.setData({
      friendList: friendList
    })
    
  },
  updateNotification(){
    var time = apply.getTime();
    var data={
      last_see_friend: time
    }
    apply.updateNotification(data,function(res){
      console.log(res)
    })
  },
  agreeApply(e){
    var that=this;
    var friend_uid = apply.getDataSet(e,'uid')
    var index = apply.getDataSet(e,'index')
    var friendList = this.data.friendList
    var param={
      friend_uid: friend_uid
    }
    apply.agreeApply(param,function(res){
      console.log(res)
      if(res.ok==1){
        friendList[index].isFriend = true;
        that.setData({
          friendList: friendList
        })
      }
    })
  },
  friendHome: function (e) {
    var friend_uid1 = apply.getDataSet(e, 'one');
    var friend_uid2 = apply.getDataSet(e, 'two');
    var friend_uid3 = apply.getDataSet(e, 'three');
    if (friend_uid1 == undefined) {
      friend_uid1 = ''
    }
    if (friend_uid2 == undefined) {
      friend_uid2 = ''
    }
    if (friend_uid3 == undefined) {
      friend_uid3 = ''
    }
    wx.navigateTo({
      url: '../home/home?friend_uid1=' + friend_uid1 + '&friend_uid2=' + friend_uid2 + '&friend_uid3=' + friend_uid3,
    })
  }
  
})