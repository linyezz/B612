import {Edit} from 'edit_model.js';
import { Config } from "../../utils/config.js"
var edit=new Edit()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    customItem: '全部',
    date:"",
    imgUrl: Config.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    var address = userInfo.address;
    console.log(address)
    var region = address.split(',');
    if (userInfo.birthday == "" || !userInfo.birthday){
      userInfo.birthday="0000-00-00"
    }
    this.setData({
      userInfo: userInfo,
      region: region,
      date: userInfo.birthday.split(' ')[0]
    })
  },
  onShow:function(){
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo,
    })
  },
  //修改年龄
  bindDateChange:function(e){
    var userInfo = this.data.userInfo;
    var birthday = {
      birthday: e.detail.value
    };
    console.log(birthday)
    //  var age = edit.jsGetAge(birthday);
    //  console.log(age)
    this.setData({
      date:e.detail.value
    })
    edit.updataInfo(birthday,(res)=>{
      userInfo.birthday = e.detail.value;
      wx.setStorageSync('userInfo', userInfo)
    })
  },
  //更新地址
  bindRegionChange: function (e) {
    var that=this;
    var userInfo=this.data.userInfo;
    var address = e.detail.value.join(',')
    var param={
      address: address
    }
    this.setData({
      region: e.detail.value
    })
    edit.updataInfo(param,(res)=>{
      console.log(res);
      userInfo.address = address;
      wx.setStorageSync('userInfo', userInfo)
    })
    
  },
  goToChange:function(e){
    var mold = edit.getDataSet(e,'mold');
    wx.navigateTo({
      url: '../changeText/changeText?mold=' + mold
    })
  },
  //修改头像
  changeImg:function(e){
    var that=this;
    var userInfo = that.data.userInfo;
    wx.chooseImage({
      count:1,
      success: function(res) {
        wx.saveFile({
          tempFilePath: res.tempFilePaths[0],
          success:res=>{
            console.log(res.savedFilePath)
            edit.saveHeadImg(res.savedFilePath,function(res){
              console.log(res.data)
              var result = JSON.parse(res.data)
              console.log(result)
              if (result.ok==1){
                wx.showToast({
                  title: '修改成功',
                  icon:'success'
                })
                userInfo.thumb_head_url = result.photo.thumb_head_url;
                userInfo.head_url = result.photo.head_url;
                that.setData({
                  userInfo: userInfo
                })
                wx.setStorageSync('userInfo', userInfo)
              }
              
            })
          }
        })
      },
    })
  },
  choiceJob:function(){
    wx.navigateTo({
      url: '../job/job',
    })
  }

})