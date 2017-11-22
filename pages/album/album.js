// pages/album/album.js
import {Album} from 'album_model.js';
import{Config} from "../../utils/config.js"
var album=new Album();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    thumb_img_path:[],
    img_path:[],
    imgUrl: Config.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading()
    var fromId = options.uid;
    var userInfo =wx.getStorageSync('userInfo')
    var isMy
    var uid = userInfo.uid;
    if (uid == fromId){
      isMy=true;
    }
    this.setData({
      isMy: isMy,
      fromId: fromId
    })
    this._loadData(fromId)
  },
  _loadData:function(uid){
    wx.showNavigationBarLoading()
    var that=this;
    var page=this.data.page;
    var noPage;
    var thumb_img_path = this.data.thumb_img_path;
    var img_path = this.data.img_path;
    var param={
      uid: uid,
      page: page
    }
    album.getPhoto(param,function(res){
      console.log(res)
      var photoList = res.data;
      var isEmpty=false;
      if (page==1&&photoList.length==0){
        isEmpty=true;
      } else if (photoList.length==15){
        page += 1;
      } else if (photoList.length < 15){
        noPage=true;
      }
      for (let i in photoList){
        thumb_img_path.push(photoList[i].thumb_img_path)
        img_path.push(photoList[i].img_path)
      }
      
      that.setData({
        thumb_img_path: thumb_img_path,
        img_path: img_path,
        isEmpty: isEmpty,
        page: page,
        noPage: noPage
      })
      wx.hideNavigationBarLoading();
     
    })
  },
  addPhoto:function(){
    var that=this;
    var userPhote = that.data.thumb_img_path;
    var img_path = that.data.img_path;
    wx.chooseImage({
      count:1,
      // sizeType: ['compressed'],
      success: function(res) {
        console.log(res)
        var url = res.tempFilePaths[0]

        wx.saveFile({
          tempFilePath: url,
          success:function(res){
            var path = res.savedFilePath
            album.addPhoto(path, function (res) {
              console.log(res.data)
              var thatPhoto = JSON.parse(res.data);
              var photo = thatPhoto.photo
              console.log(photo)
              userPhote.unshift(photo.thumb_img_path)
              img_path.unshift(photo.img_path)
              that.setData({
                thumb_img_path: userPhote,
                img_path: img_path,
                isEmpty: false
              })
              album.showLog('上传成功！')
            })
          }
        })
        
      },
    })
  },
  previewImage:function(event){
    var src = album.getDataSet(event,'src')
    var index = parseInt(album.getDataSet(event, 'index'))
    
    console.log(src)
    wx.previewImage({
      current: src[index],
      urls: src,
    })
  },
  onReachBottom:function(){
    var fromId = this.data.fromId;
    var noPage=this.data.noPage;
    if (!noPage){
      this._loadData(fromId);
    }
   
  }
 
})