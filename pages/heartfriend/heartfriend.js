import { Heart } from 'heartfriend_model.js';
import{Config} from '../../utils/config.js';
var heart = new Heart;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageEmpty:{
      url: Config.imgUrl + 'blank_like.png',
      cont: '暂无星动'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData()
  },
  _loadData: function () {
    var that=this;
    
    heart.getInfo(function (res) {
      console.log(res)
      var heartInfo=res.data.data;
      if (res.data.length<1) {
        that.setData({
          isEmpty: true
        })
       }
      else{
      for (let i in heartInfo){
        heartInfo[i].age = heart.jsGetAge(heartInfo[i].birthday);
        heartInfo[i].isFriend = false;
        if (heartInfo[i].type==2){
          heartInfo[i].beckoning = Config.imgUrl +'all_like.png'
        }
      }
      that.setData({
        heartInfo: heartInfo,
        isEmpty:false
      })
      }
    })
    
  
  },
  friendHome: function (e) {
    var friend_uid1 = heart.getDataSet(e, 'one');
    var friend_uid2 = heart.getDataSet(e, 'two');
    var friend_uid3 = heart.getDataSet(e, 'three');
    var index = heart.getDataSet(e, 'index');
    var relationship = this.data.heartInfo[index].type;
    var uid =parseInt(this.data.heartInfo[index].friend_uid);
    if (friend_uid1 == undefined) {
      friend_uid1 = ''
    }
    if (friend_uid2 == undefined || friend_uid2 == 0) {
      friend_uid1 = uid;
      friend_uid2 = ''
    }
    if (friend_uid3 == undefined || friend_uid3 == 0) {
      friend_uid3 = ''
    }
    if (relationship==2){
      friend_uid1=uid;
      friend_uid2=""
      friend_uid3=""
    }
    wx.navigateTo({
      url: '../home/home?friend_uid1=' + friend_uid1 + '&friend_uid2=' + friend_uid2 + '&friend_uid3=' + friend_uid3,
    })
  }

})