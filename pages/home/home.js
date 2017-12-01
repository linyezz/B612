// pages/home/home.js
import { Home } from 'home_model.js';
import { Config } from '../../utils/config.js'
var home = new Home();
const app = getApp()

Page({

  data: {
    loadingHidden:false,
    hasLabel: false,
    homeBg: Config.imgUrl + 'hp_bj.png',
    imgUrl: Config.imgUrl,
    friend_uid1:'',
    friend_uid2:'',
    friend_uid3:''
  },
  onLoad: function (options) {
    var pages = getCurrentPages()
    console.log(pages)
    var friend_uid1 = options.friend_uid1
    var friend_uid2 = options.friend_uid2
    var friend_uid3 = options.friend_uid3
    console.log(friend_uid1 + ':friend_uid1')
    //判断是否为本人
    if (!friend_uid1) {
      var userInfo = wx.getStorageSync('userInfo');
      if (!userInfo) {
        home.getMyInfo(function (res) {
          userInfo = res.data;
            
        })
      }
      var phothList = userInfo.photo_path_list;
      var friendList = userInfo.user_info_list
      if (phothList.length > 3) {
        var length = phothList.length - 3
        console.log("length" + length)
        phothList.splice(3)
        userInfo.photo_path_list = phothList;
      }
      if (friendList.length > 5) {
        var length = friendList.length - 5
        friendList.splice(4)
        userInfo.user_info_list = friendList
      }
      console.log(userInfo.birthday)
      if (userInfo.birthday != 0) {
        var age = home.jsGetAge(userInfo.birthday)
        var constellation = home.getAstro(userInfo.birthday)
        userInfo.age = age;
        userInfo.constellation = constellation;
      }

      this.setData({
        userInfo: userInfo,
        isMy: true,
        loadingHidden: true
      })
    }
    else {
      this.setData({
        isMy: false,
        friend_uid1: friend_uid1,
        friend_uid2: friend_uid2,
        friend_uid3: friend_uid3,
      })
      this.getFriendInfo()
    }

  },
  getFriendInfo: function () {
    var that = this;
    var myInfo = wx.getStorageSync("userInfo")
    var friend_uid1 = that.data.friend_uid1
    var friend_uid2 = that.data.friend_uid2
    var friend_uid3 = that.data.friend_uid3
    home.getFriendInfo(friend_uid1, friend_uid2, friend_uid3, function (res) {
      var friendInfo = res.data;
      console.log(res);
      console.log(res.data.friend_uid3 + ":friendInfo.friend_uid3")
      var friendList = friendInfo.user_info_list;
      var phothList = friendInfo.photo_path_list;
      if (phothList.length > 4) {
        var length = phothList.length - 2
        phothList.splice(4)
        friendInfo.photo_path_list = phothList;
      }
      if (friendList.length > 5) {
        var length = friendList.length - 5
        friendList.splice(4, length)
        friendInfo.user_info_list = friendList
      }
      for (let i in friendList) {
        if (friendList[i] == null) {
          continue;
        }
        if (myInfo.uid == friendList[i].uid) {
          friendList[i].isMyself = true;
        }
      }
      //算年龄&&星座
      if (friendInfo.birthday != 0) {
        var age = home.jsGetAge(friendInfo.birthday)
        var constellation = home.getAstro(friendInfo.birthday)
        friendInfo.constellation = constellation;
        friendInfo.age = age
      }

      if (friendInfo.uid == friend_uid3) {
        console.log(friendInfo.friend_uid1)
        friendInfo.leave = 3
      }
      friendInfo.friend_uid1 = friend_uid1
      friendInfo.friend_uid2 = friend_uid2
      friendInfo.friend_uid3 = friend_uid3

      that.setData({
        userInfo: friendInfo,
        loadingHidden: true
      })

    })
  },


//去编辑
  goToEdit() {
    wx.navigateTo({
      url: '../edit/edit',
    })
  },
  //标签
  goToLabel: function (e) {
    var impressionnum = home.getDataSet(e,'impressionnum')
    var uid=this.data.userInfo.uid
    var sex=this.data.userInfo.sex;
    var uid2 = this.data.userInfo.friend_uid2
    var friend_uid2 = this.data.friend_uid2
   
      wx.navigateTo({
        url: '../label/label?uid=' + uid + '&sex=' + sex + "&friend_uid2=" + friend_uid2 + '&impressionnum=' + impressionnum,
      })
    
   
  },
  //好友列表
  goFriendList: function (e) {

    var friend_uid1 = home.getDataSet(e, 'friendone');
    var friend_uid2 = home.getDataSet(e, 'friendtwo');
    var leave = home.getDataSet(e, 'leave');
    if (friend_uid1 == undefined) {
      friend_uid1 = '';
    }
    if (friend_uid2 == undefined) {
      friend_uid2 = '';
    }
    if (leave == 3) {
      setTimeout(function(){
        wx.navigateTo({
          url: '../home/home?friend_uid1=' + friend_uid1 + '&friend_uid2=' + friend_uid2,
        },2000)
      })
      
    } else {
      wx.redirectTo({
        url: '../friends/friends?friend_uid1=' + friend_uid1 + '&friend_uid2=' + friend_uid2,
      })
    }
  },
  //去相册
  goToAlbum: function () {
    var uid = this.data.userInfo.uid;
    wx.navigateTo({
      url: '../album/album?uid=' + uid,
    })
  },
  //加好友
  addFriend(e) {
    var that = this;
    var friend_uid1 = home.getDataSet(e, 'friendone');
    var friend_uid2 = home.getDataSet(e, 'friendtwo');
    var friend_uid3 = home.getDataSet(e, 'friendthree');
    var leave = home.getDataSet(e, 'leave');
    var userInfo = that.data.userInfo;
    if (userInfo.is_add_friend==1){
        return;
    }
    if (friend_uid1 == undefined) {
      friend_uid1 = '';
    }
    if (friend_uid2 == undefined) {
      friend_uid2 = '';
    }
    if (leave == 3) {
      wx.navigateTo({
        url: '../middle/middle?friend_uid1=' + friend_uid1 + '&friend_uid2=' + friend_uid2 + '&friend_uid3=' + friend_uid3,
      })
    } else {
      var param = {
        friend_uid1: friend_uid1,
        friend_uid2: friend_uid2
      }
      home.addFriend(param, function (res) {
        console.log(res)
        userInfo.is_add_friend = 1;
        that.setData({
          userInfo: userInfo
        })
        home.showLog('发送成功!')
      })
    }
  },
  //心动
  Beckoning:function(){
    var that=this;
    var userInfo = that.data.userInfo;
    var myPhone = wx.getStorageSync('userInfo').phone_number;
    if (!myPhone || myPhone == "") {
      wx.navigateTo({
        url: '../phone/phone',
      })
      return;
    }
    if (userInfo.is_heartflow==1){
        return
    }else{
      var friend_uid1 = userInfo.friend_uid1;
      var friend_uid2 = userInfo.friend_uid2;
      var friend_uid3 = userInfo.friend_uid3; if (friend_uid1 == undefined) {
        friend_uid1 = '';
      }
      if (friend_uid2 == undefined) {
        friend_uid2 = '';
      }
      if (friend_uid3 == undefined) {
        friend_uid3 = '';
      }
      var param={
        heartflow_uid: userInfo.uid,
        friend_uid1: friend_uid1,
        friend_uid2: friend_uid2,
        friend_uid3: friend_uid3,
      }
      home.addHeartflow(param,function(res){
        console.log(res);
        userInfo.is_heartflow=1;
        that.setData({
          userInfo: userInfo
        })
        home.showLog('心动成功!')
      })
    }
    

  },
  getPhone:function(e){
      var that=this; 
      var myPhone=wx.getStorageSync('userInfo').phone_number;
      var thisUid=this.data.userInfo.uid;
      var thisInfo = this.data.userInfo;
      var thisPhone = this.data.userInfo.phone_number;
      var thisName = this.data.userInfo.nickname;
      var isSend = this.data.userInfo.is_send;
      var param = {
        friend_uid: thisUid
      }
      if (!myPhone || myPhone==""){
        wx.navigateTo({
          url: '../phone/phone',
        })
      } else if (thisInfo.is_open_phone == 0){
        
        if (thisInfo.is_agree_phone==1){
          that.showPhone(thisPhone, thisName)
        }else{
          if (isSend == 1) {
            home.showLog('你已经发送过请求')
          } else {
            home.askForPhone(param, function (res) {
              home.showLog('消息已发送')
              thisInfo.is_send=1
              that.setData({
                userInfo: thisInfo
              })
            })
          }
        }
        
      } else if (thisPhone == "" || !thisPhone){
        if (isSend==1){
          home.showLog('你已经发送过请求')
        }else {
          home.askForPhone(param, function (res) {
            home.showLog('消息已发送')
            thisInfo.is_send = 1
            that.setData({
              userInfo: thisInfo
            })
          })
        }
       
      }else{
        that.showPhone(thisPhone, thisName)
      }
  },
  //展示微信号
  showPhone(thisPhone, thisName){
    wx.setClipboardData({
      data: thisPhone,
      success: res => {
        wx.showModal({
          title: '微信号已复制',
          content: thisName + '微信号' + thisPhone + '已复制，快去添加微信好友聊天吧',
        })
      }
    })
  },
  previewImage:function(e){
    var src = home.getDataSet(e, 'previewimage')
    var srcs=[];
    srcs.push(src)
    console.log(src)
    wx.previewImage({
      urls: srcs,
    })
  }

})