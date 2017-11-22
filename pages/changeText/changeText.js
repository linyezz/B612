import {Change} from "changeText_model.js";
import { Config } from "../../utils/config.js"
var change= new Change();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordNum: 0,
    content: '',
    immgUrl: Config.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var mold = options.mold;
    this._loadData(mold)
    
    
  },
  _loadData:function(mold){
    var title, value, maxlength,objName;
    var content = this.data.content;
    var userInfo=wx.getStorageSync("userInfo")
    var length = content.replace(" ", "").length
    console.log(mold)
    if(mold==1){
      title = "昵称"
      value = userInfo.nickname
      maxlength = 10
      objName = "nickname"
    } else if(mold==2){
      title = "内星独白"
      value = userInfo.inner_monologue
      maxlength = 30
      objName = "inner_monologue"
    }else if(mold==3){
      title = "星趣爱好"
      value = userInfo.hobby
      maxlength = 30
      objName = "hobby"
    }else if(mold==4){
      title = "星理想"
      value = userInfo.ideal_star
      maxlength = 30
      objName = "ideal_star"
    }
    this.setData({
      title: title,
      content: value,
      wordNum: length,
      maxlength: maxlength,
      mold: mold,
      objName: objName
    })
  },
  bindInput: function (e) {
    var num = e.detail.value.replace(" ", "").length;
    var content = e.detail.value;
    this.setData({
      wordNum: num,
      content: content
    })
  },
  postContent: function () {
    var content = this.data.content;
    var objName = this.data.objName;
    if (content==''){
      wx.showModal({
        title: '保存失败',
        content: '不能为空',
      })
      return
    }
    var userInfo=wx.getStorageSync('userInfo')
    change.updataInfo(content,objName,function(res){
      userInfo[objName] = content;
      wx.setStorageSync('userInfo', userInfo)
     wx.navigateBack({
       
     })
    })

  }
})