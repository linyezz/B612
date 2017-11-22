import { Planet } from "planet_model.js";
import {Config} from '../../utils/config.js';
var planet = new Planet()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:false,
    current: 0,
    page: 1,
    planetList: [],
    isLast: 0,
    imgUrl: Config.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userInfo = wx.getStorageSync('userInfo');
    var friendId = options.id;
    var uid = this.userInfo.uid;
    this.setData({
      myStyle: '-webkit-transform: scale(0.5) translate3d(110%,0,0)',
      userInfo: this.userInfo
    })
    if (friendId) {
      console.log(friendId)
      planet.addShareFriend(friendId, function (res) {
        var palnet = res.data;

        console.log(res)
      })
    }
    this._loadData()

  },

  onReady: function () {
    var that = this
    var query = wx.createSelectorQuery();
    var planetLIst = query.select('.swiper-item')
    //  console.log(planetLIst)
    planetLIst.boundingClientRect()
    query.exec(function (res) {
      //  console.log(res)
      var pageH = res[0].height;
      that.setData({
        pageH: pageH
      })
    })
    
  },
  _loadData() {
    var planetList = this.data.planetList
    var that = this;
    var page = this.data.page
    var roate, headRoate;
    var current = that.data.current
    var lastCurrent = that.data.lastCurrent
    var param = {
      page: page
    }
    if (lastCurrent <= current) {
      that.setData({
        isLast: 1
      })
      that.changeItem();
      return;
    }
    planet.getFriendInnfo(param, function (res) {
      console.log(res)
      var planet = res.data.first_friend
      console.log(planet)
      if (!planet || planet.length == 0) {

        if (page == 1) {
          that.setData({
            myStyle: '-webkit-transform: scale(1)',
            current: 0,
            isLast: 1
          })
        }
       
          current = current;
          that.setData({
            // isLast: 1,
            lastCurrent: current + 1,
            loadingHidden: true
          })
          that.changeItem();
        return
      }
      console.log(page)
      if (page == 1) {
        var style = '-webkit-transform: scale(1)'
      } else {
        var style = '-webkit-transform: scale(0.5) translate3d(110%,0,0)'
      }
      planet.style = style;
      var planetTrank = res.data.two_friend
      for (let i in planetTrank) {
        if (i == 0) {
          roate = "-webkit-transform: rotate(290deg)",
            headRoate = "-webkit-transform: rotate(-290deg)"
        } else if (i == 1) {
          roate = "-webkit-transform: rotate(0deg)",
            headRoate = "-webkit-transform: rotate(0deg)"
        } else {
          roate = "-webkit-transform: rotate(170deg)",
            headRoate = "-webkit-transform: rotate(-170deg)"
        }
        planetTrank[i].roate = roate;
        planetTrank[i].headRoate = headRoate;

      }
      planet.planetTrank = planetTrank
      planetList.push(planet)
      page += 1
      that.setData({
        planetList: planetList,
        hasFriend: true,
        page: page,
        loadingHidden:true
      })
      if (page == 2) {
        that._loadData()
      }
      that.changeItem();
    })
  },
  touchStart: function (e) {
    var startY = e.touches[0].pageY;
    this.setData({
      startY: startY,
      endY: 0
    })
  },
  touchMove: function (e) {
    var endY = e.touches[0].pageY;
    var startY = this.data.startY;
    var moveY = endY - startY;
    var pageH = this.data.pageH;
    var current = this.data.current
    var scrollY = moveY - (current * pageH)
    var swiperMove = '-webkit-transform: translate3d(0,' + scrollY + 'px,0);-webkit-transition-duration:0s'
    this.setData({
      swiperMove: swiperMove,
      endY: moveY
    })
  },
  touchEnd: function (e) {
    var that=this
    var current = this.data.current;
    var lastCurrent = this.data.lastCurrent;
    var arrow = this.data.planetList;
    var all = arrow.length - 2;
    var pageH = this.data.pageH;
    var mostWidth = pageH * 0.4;
    var endY = this.data.endY;
    var isLast = that.data.isLast
    if (mostWidth < (-endY)) {
      current++;
      if (current>lastCurrent) {
        current--
        console.log("current:" + current)
      }
      if (all < -1) {
        current = 0;
      } else if (current > all) {
        var endHeight = pageH * current;
        var swiperMove = '-webkit-transform: translate3d(0,' + -endHeight + 'px,0);-webkit-transition:-webkit-transform 1s'
        this.setData({
          swiperMove: swiperMove,
          current: current
        })
        this.addFrineds()
      return;
      }
      this.setData({
        current: current
      })
      this.changeItem();
    } else if (endY > mostWidth) {
      var myStyle
      console.log(isLast)
     
      current--;
      
      if (current < 0) {
        current = 0;
      }
      that.setData({
        isLast: 0,
        current: current
      })
      this.changeItem();
    } 
    

    var endHeight = pageH * current;
    var swiperMove = '-webkit-transform: translate3d(0,' + -endHeight + 'px,0);-webkit-transition:-webkit-transform 1s'
    this.setData({
      swiperMove: swiperMove,
      current: current
    })
    
  },
  changeItem: function (e) {
    var that=this
    var isLast = this.data.isLast;
    var current = this.data.current
    var index = this.data.current;
    var arrow = this.data.planetList;
    var all = arrow.length - 1;
    var lastCurrent = this.data.lastCurrent
    if (isLast == 1) {
      this.setData({
        myStyle: '-webkit-transform: scale(1) translate3d(0,0,0);-webkit-transition: -webkit-transform 1s',
        isLast: 0
      })
    } else {
      if (isLast == 0) {
        that.setData({
          myStyle: '-webkit-transform: scale(0.5) translate3d(110%,0,0);-webkit-transition: -webkit-transform 1s'
        })
        
      }
     
      arrow[index].style = '-webkit-transform: scale(1) translate3d(0,0,0);-webkit-transition: -webkit-transform 1s';

      if (index != all) {
        arrow[index + 1].style = '-webkit-transform: scale(0.5) translate3d(110%,0,0);-webkit-transition: -webkit-transform 1s';
      }
    }
    if (index != 0)
      arrow[index - 1].style = '-webkit-transform: scale(0.5) translate3d(110%,0,0);-webkit-transition: -webkit-transform 1s';
    this.setData({
      planetList: arrow
    })

  },
  addFrineds: function () {
    this._loadData()
  },
  share: function (e) {
    console.log('ok')
    var uid = this.userInfo.uid;
    wx.navigateTo({
      url: '../share/share?uid=' + uid + '&types=1',
    })
  },
  toFriend(e){
   
    var friend_uid1 = planet.getDataSet(e, 'friendone');
    var friend_uid2 = planet.getDataSet(e, 'friendtwo');
    var index = planet.getDataSet(e,'index')
    var planetIndex = planet.getDataSet(e,'planetindex')
    var planetList = this.data.planetList;
    let level=3;
    if (index != undefined){
      var planetTrank = planetList[planetIndex].planetTrank;
      level = planetTrank[index].friend_level
    }
   
    console.log(planetTrank)
    if (level==1){
      friend_uid1 = friend_uid2;
    }
    if (friend_uid1 == undefined) {
      friend_uid1 = '';
    }
    if (friend_uid2 == undefined || level==1) {
      friend_uid2 = '';
    }
    setTimeout(function () {
      wx.navigateTo({
        url: '../home/home?friend_uid1=' + friend_uid1 + '&friend_uid2=' + friend_uid2,
      }, 2000)
    })
  }

})