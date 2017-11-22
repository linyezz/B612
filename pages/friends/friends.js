import { Friend} from 'friend_model.js';
import {Config} from '../../utils/config.js'
var friend = new Friend();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageEmpty:{
      url:Config.imgUrl+'blank_friend.png',
      cont:'暂无好友'
    },
    imgUrl: Config.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages=getCurrentPages();
    console.log(pages)
    var friend_uid1 = options.friend_uid1 
    var friend_uid2 = options.friend_uid2 
   this.myInfo=wx.getStorageSync("userInfo")
    if (friend_uid1 && friend_uid2){
      this.setData({
        friend_uid1: friend_uid1,
        friend_uid2: friend_uid2
      })
      this.getThreeFriend()
    } else if (friend_uid1 && !friend_uid2){
      this.setData({
        friend_uid1: friend_uid1
      })
      this.getTwoFriend()
    }else{
      this.getMYfriend()
    }
    
  },
  getMYfriend:function(){
    var that=this;
    var isEmpty;
    friend.getMyFriend(function(res){
      var friendList = res.data
      if (friendList.length==0){
        isEmpty=true;
      }
      for (let i in friendList){
        if (friendList[i].birthday!=0){
          var birthday = friendList[i].birthday
          friendList[i].age = friend.jsGetAge(birthday)
        }
        friendList[i].friend_uid1 = friendList[i].uid;

      }
      that.setData({
        friendList: friendList,
        isEmpty: isEmpty
      })
      console.log(res.data)

    })


    
  },
  getTwoFriend:function(){
    var that=this;
    var isEmpty;
    var myInfo = this.myInfo;
    var friend_uid1 = that.data.friend_uid1;
    friend.getTwoFriend(friend_uid1,function(res){
      var friendList=res.data;
      for (let i in friendList){
        if (friendList[i].uid == myInfo.uid){
          friendList[i].isMy=true;
          friendList.length == 1 ? isEmpty = true : isEmpty=false;
        }
        if (friendList[i].birthday != 0) {
          var birthday = friendList[i].birthday
          friendList[i].age = friend.jsGetAge(birthday)
        }
        friendList[i].otherFriend=true;
        if (friendList[i].friend_level==1){
          friendList[i].friend_uid1 = friendList[i].uid;
        }else{
          friendList[i].friend_uid1 = friend_uid1;
          friendList[i].friend_uid2 = friendList[i].uid;
        }
      }
      that.setData({
        friendList: friendList,
        isEmpty: isEmpty
      })
      console.log(res.data);
    })
  },
  getThreeFriend:function(){
    var that = this;
    var isEmpty;
    var myInfo = this.myInfo;
    var friend_uid1 = that.data.friend_uid1;
    var friend_uid2 = that.data.friend_uid2;
    friend.getThreeFriend(friend_uid1,friend_uid2,function(res) {
      var friendList = res.data;
      for (let i in friendList) {
        if (friendList[i].uid == myInfo.uid) {
          friendList[i].isMy = true;
          friendList.length == 1 ? isEmpty = true : isEmpty = false;
        }
        if (friendList[i].birthday != 0) {
          var birthday = friendList[i].birthday
          friendList[i].age = friend.jsGetAge(birthday)
        }
        if (friendList[i].friend_level == 1) {
          friendList[i].friend_uid1 = friendList[i].uid;
        } else if (friendList[i].friend_level == 2){
          friendList[i].friend_uid1 = friend_uid2;
          friendList[i].friend_uid2 = friendList[i].uid;
        }else{
          friendList[i].friend_uid1 = friend_uid1;
          friendList[i].friend_uid2 = friend_uid2;
          friendList[i].friend_uid3 = friendList[i].uid;
        }
        friendList[i].otherFriend = true;
      }
      that.setData({
        friendList: friendList,
        isEmpty: isEmpty
      })
      console.log(res.data);
    })
  },
  tipTouch:function(e){
    console.log(e)
    
  },
  friendHome:function(e){
    var friend_uid1 = friend.getDataSet(e,'one');
    var friend_uid2 = friend.getDataSet(e,'two');
    var friend_uid3 = friend.getDataSet(e,'three');
    if (friend_uid1 == undefined){
      friend_uid1=''
    }
    if (friend_uid2 == undefined){
      friend_uid2=''
    }
    if (friend_uid3 == undefined){
      friend_uid3=''
    }
    wx.redirectTo({
      url: '../home/home?friend_uid1=' + friend_uid1 + '&friend_uid2=' + friend_uid2 + '&friend_uid3=' + friend_uid3,
    })
  }
})