import {Label} from 'label_model.js';
import {Config} from '../../utils/config.js';
var label = new Label()
Page({

  data: {
    labelArrow:[],
    shoeNum:0,
    imgUrl: Config.imgUrl
  },
  onLoad: function (options) {
    var friend_uid=options.uid;
    var friend_sex=options.sex
    var friend_uid2 = options.friend_uid2;
    var impressionnum = options.impressionnum;

    this.setData({
      friend_uid: friend_uid,
      friend_sex: friend_sex,
      friend_uid2: friend_uid2,
      num: impressionnum
    })
    this._loadData()
  },
  _loadData:function(){
    var that=this;
    var uid=wx.getStorageSync('userInfo').uid;
    var friend_uid = that.data.friend_uid;
    var friend_sex = that.data.friend_sex;
    var friend_uid2 = that.data.friend_uid2;
    var param = {
      friend_uid: friend_uid,
    }
    if (friend_uid2 || friend_uid2 != "") {
      label.getLabelList(param,function(res){
        console.log(res)
        that.setData({
          labelArrow: res.data.data,
          allShow:true,
          num:res.data.num
        })
      })
    }else{
    var labelList = label.labelList(friend_sex);
    
    
    label.getLabelList(param,function(res){
        console.log(res)
        var label=res.data.data
        var allShow;
        var shoeNum = that.data.shoeNum;
        if (res.data.num>2){
          allShow=true;
        }
        for (let i in label){
          label[i].hasImg=true;
          var differ=true;
          for (let j in labelList){
            if (label[i].name == labelList[j].name && label[i].create_type==0){
              differ=false;
              labelList[j] = label[i]
              if (label[i].is_good == 1) {
                label[i].clicked = true;
                shoeNum++;
              }
            }
            
          }
          
          if (differ){
            if (label[i].is_good == 1) {
              label[i].clicked = true;
              shoeNum++
            }
              labelList.push(label[i])
            }
        }
        if (shoeNum>2){
          allShow=true;
        }
        that.setData({
          labelArrow: labelList,
          allShow: allShow,
          shoeNum: shoeNum,
        })
    })

    } 
  },
  //标签点赞
  choiceLabel:function(e){
    var that=this;
    var friend_uid = that.data.friend_uid;
    var index = label.getDataSet(e, 'index');
    var labelArrow = this.data.labelArrow;
    var allShow = this.data.allShow;
    //是否点过赞
    if (labelArrow[index].clicked || allShow){
      that.showDetail(index)
    } 
    //是否为已添加标签
    else if (labelArrow[index].id){
    var shoeNum = this.data.shoeNum;
    var param={
      tag_id: labelArrow[index].id,
      friend_uid: friend_uid
    }
    label.choiceLabel(param,function(res){
      console.log(res.data)
      if (shoeNum < 2) {
        shoeNum++
      } else {
        allShow = true;
      }
      labelArrow[index].clicked = true;
      if (res.data.last_good_url){
        labelArrow[index].last_good_url = res.data.last_good_url
      }
      if (res.data.num){
        labelArrow[index].num = res.data.num
      }
      labelArrow[index].id = res.data.id;
      labelArrow[index].clicked=true;
      labelArrow[index].hasImg=true;
      that.setData({
        labelArrow: labelArrow,
        shoeNum: shoeNum,
        allShow: allShow
      })
    })
    }
    //添加标签
    else{
      var param={
        name: labelArrow[index].name,
        friend_uid: friend_uid,
        create_type:0
      }
      this.creatLabel(param,index)

    }
  },
  //创建标签
  creatLabel(param,index){
    var that=this;
    var labelArrow = this.data.labelArrow;
    var shoeNum = this.data.shoeNum;
    var allShow = this.data.allShow;
    wx.showNavigationBarLoading()
    label.creatLabel(param,function(res){
       console.log(res)
      if (shoeNum < 2) {
        shoeNum++
      } else {
        allShow = true;
      }
      res.data.clicked=true;
      res.data.hasImg=true;
      console.log('index:' + index + "create_type:" + res.data.create_type);
      if (res.data.create_type==0){
        labelArrow[index] = res.data;
       
       
      }else{
        labelArrow.push(res.data);
      }
      
      that.setData({
        labelArrow: labelArrow,
        shoeNum: shoeNum,
        allShow: allShow,
        isLayer: false,
        isAdd: false
      })
      label.showLog("添加成功!")
      wx.hideNavigationBarLoading();
    })
    
  },
  bindAddLabel:function(){
    var isLayer=true;
    var isAdd=true;
    this.setData({
      isLayer: isLayer,
      isAdd: isAdd
    })
  },
  addLableInput:function(e){
    var value=e.detail.value;
    this.setData({
      addValue: value
    })
  },
  addLabel:function(e){
    var that=this;
    var addValue = this.data.addValue;
    var friend_uid = that.data.friend_uid;
    var param={
      name: addValue,
      friend_uid: friend_uid,
      create_type:1
    }
    this.creatLabel(param)
    

  },
  
  hideLayer:function(){
    this.setData({
      isLayer: false,
      isAdd: false,
      detailShow: false
    })
  },
  showDetail: function (index){
    var that=this;
    var friend_uid = this.data.friend_uid;
    var labelArrow = this.data.labelArrow;
    if (!labelArrow[index].hasImg){
        return
    }
    var param={
      tag_id: labelArrow[index].id,
      friend_uid: friend_uid
    }
    label.labelInfo(param,function(res){
      var labelInfoList = res.data
      console.log(res)
      that.setData({
        isLayer: true,
        detailShow: true,
        labelInfoList: labelInfoList,
        labelName: labelArrow[index].name,
        labelNum: labelArrow[index].goods_num
      })
    })
   
    
  },
  closeDetail:function(){
    this.setData({
      isLayer: false,
      detailShow: false
    })
  }
  
})