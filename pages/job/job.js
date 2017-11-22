import{Job} from 'job_model.js';
var job = new Job();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobList:[],
    choiceId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },
  _loadData:function(){
    var that=this;
    job.getJobInfo(function(res){
      console.log(res.data);
      that.setData({
        jobList:res.data
      })
    })
  },
  jobChoice:function(e){
    var index = job.getDataSet(e,'index');
    var jobList = this.data.jobList;
    var clicked = jobList[index].clicked;
    var choiceId = jobList[index].name
    for (let i in jobList){
      jobList[i].clicked=false;
    }
    if (clicked){
      jobList[index].clicked=false;
      this.setData({
        jobList: jobList,
        choiceId: choiceId

      }) 
    }else{
      jobList[index].clicked = true;
      this.setData({
        jobList: jobList,
        choiceId: choiceId
      }) 
    }
    
  },
  upJob:function(){
    var userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo.job)
    var jobList = this.data.jobList;
    var that=this;
    var choiceId = this.data.choiceId;
    if (!choiceId){
      wx.showModal({
        title: '保存失败',
        content: '未选择职业',
      })
      return
    }else{
      var param={
        job: choiceId
      }
      job.upJob(param,function(res){
        console.log(res)
        userInfo.job = choiceId;
        wx.setStorageSync("userInfo", userInfo)
        wx.redirectTo({
          url: '../edit/edit',
        })
      })
    }
  }
  
})