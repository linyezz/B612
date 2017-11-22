import {Config} from '../../utils/config.js';
import {Phone} from "phone_model.js";
import {Login} from '../../utils/login.js';
var login = new Login()
var phone=new Phone()
Page({

  
  data: {
    imgUrl: Config.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myPhone = wx.getStorageSync('userInfo').phone_number;
    var isApply=true;
    if (!myPhone || myPhone==''){
      isApply=false;
    }
    this.setData({
      isApply: isApply,
      phoneNumber: myPhone
    })
  },

  getPhoneNumber: function (e) {
    var userInfo = wx.getStorageSync('userInfo')
    console.log(e.detail)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    var that=this;
    var param={
      data: e.detail.encryptedData,
      iv: e.detail.iv
    }
    if (param.data!=undefined){
      phone.test(param, function (res) {
        if (res.data){
        userInfo.phone_number = res.data;
        
        wx.setStorageSync('userInfo', userInfo)
        that.setData({
          phoneNumber: res.data,
          isApply:true
        })
        }else{
          login.getTokenFromServer();
          wx.showModal({
            title: '授权失败',
            content: '请重新授权',
            showCancel:false
          })
        }
      })
    }
  
  } ,
  switchChange:function(e){
    console.log(e.detail.value)
    var isOpenPhone
    var isOpen = e.detail.value;
    if (isOpen){
      isOpenPhone=1
    }else{
      isOpenPhone = 0
    }
    var data={
      is_open_phone: isOpenPhone
    }
    phone.updataInfo(data,function(res){
      console.log(res)
    })
  }

})