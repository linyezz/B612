// pages/share/share.js
import { Share} from "share_model.js";
var share = new Share();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  
  onLoad: function (options) {
    var that=this;
    
    var uid = options.uid;
    var types = options.types;
    that.setData({
      types: types,
      uid: uid
    })
      that.drawImg()
    
    
    
    
  },
  drawImg(){

    var context = wx.createCanvasContext('share');

    context.fill(0, 0, 310, 248)
    context.drawImage('../../imgs/icon/card_share_planet.png', 0, 0, 310, 248)
    
    context.draw();
    context.setFillStyle('#212121')
    
    context.setFillStyle('white')
    context.setFontSize(16)
    context.fillText('你愿意成为我的小星星吗?', 63, 38)
    context.draw(true);
    
  },
 keepPicture:function(){
   var that=this;
   wx.canvasToTempFilePath({
     canvasId: 'share',
     success:res=>{
        that.setData({
          url: res.tempFilePath
        })
        that.saveImageToPhotosAlbum()
     }
   })
 },
 saveImageToPhotosAlbum:function(){
   var that=this
   var tempFilePath = that.data.url;
    var parem={
      scope:'writePhotosAlbum',
      callBack:function(){
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success:function(){
            wx.showToast({
              title: '保存到相册成功！',
              icon:'success'
            })
          }
        })
      }
    }
    share.checkUserAuth(parem)
 },
 onShareAppMessage:function(rs){
   var types = this.data.types
   var uid =this.data.uid
   if (types==1){
     return {
       title:"你愿意成为我的小星星吗",
       path: '/pages/planet/planet?id='+uid,
       success:function(res){
         wx.showToast({
           title: '转发成功！',
           icon: 'success'
         })
       },
       fail:function(res){
         console.log(res)
       }
   }
   }
   
 }

})