
import{Login} from 'login.js';
var login = new Login();
class Base {
  constructor() {
    this.baseRestUrl = 'https://t1-dsxq-mapi.miliyo.com/';
    this.baseScoketUrl = "wss://imserver.miliyo.com/websocket ";
    this.baseUpUrl = "https://t1-dsxq-up.miliyo.com/"
  }
  //http 请求类, 当noRefech为true时，不做未授权重试机制,默认为get请求方法
  request(params) {
    var that = this,
      url = this.baseRestUrl + params.url;
    if (!params.type) {
      params.type = 'get';
    }
    if (params.setUpUrl == false) {
      url = params.url;
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'DSXQID=' + wx.getStorageSync('token')

      },
      success: function (res) {
        //验证token是否过期
        if (res.data.ok == -1) {
          login.getTokenFromServer();
        } else {
          params.eCallback && params.eCallback(res.data);
        }

      },
      fail: function (err) {
        that.processError(err)
      }
    })

  }

  //上传请求
  upLoad(param) {
    var that = this,
      url = this.baseUpUrl + param.url;
    wx.uploadFile({
      url: url,
      filePath: param.filePath,
      name: param.name,
      header: {
        'Cookie': 'DSXQID=' + wx.getStorageSync('token')
      },
      success: function (res) {

        param.callBack && param.callBack(res);
      },
      fail: function (err) {
        that.processError(err)
      }
    })

  }
  processError(err) {
    console.log(err);
  }

  //获取自定义参数
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };
  //检查用户授权
  checkUserAuth(param) {
    var that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope' + param.scope]) {
          that.getUserAuth(param)
        } else {
          param.callBack && param.callBack(res)
        }
      }
    })
  }
  //用户授权
  getUserAuth(param) {
    var that = this;
    wx.authorize({
      scope: param.scope,
      success: res => {
        param.callBack && param.callBack(res)
      }
    })
  }
  
  //生日转换为年龄
  jsGetAge(strBirthday) {
    var returnAge;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
      returnAge = 0;//同年 则为0岁  
    }
    else {
      var ageDiff = nowYear - birthYear; //年之差  
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          var dayDiff = nowDay - birthDay;//日之差  
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          }
          else {
            returnAge = ageDiff;
          }
        }
        else {
          var monthDiff = nowMonth - birthMonth;//月之差  
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          }
          else {
            returnAge = ageDiff;
          }
        }
      }
      else {
        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天  
      }
    }

    return returnAge;

  }
  //提示
  showLog(title, icon, time) {
    if (!time) {
      time = 1500;
    }
    if (!icon) {
      icon = 'success'
    }
    wx.showToast({
      title: title,
      icon: icon,
      duration: time
    })
  }
  //计算时间差
  differTime(starTime,endTime){
    var differTime;
    starTime = new Date(starTime.replace(/\-/g, "/"))
    endTime = new Date(endTime.replace(/\-/g, "/"))
    differTime = parseInt(starTime - endTime);
    return differTime
  }
  //获取时间
  getTime(){
    var date = new Date()  
    var month = date.getMonth() + 1;
    var day = date.getDate()
    if (parseInt(month)<10){
      month = '0' + month.toString
    }
    if (parseInt(day)<10){
      day = '0' + day
    }
    var time = date.getFullYear() + '-' +month+'-' + day + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() ;
    return time
    
}
//计算星座
  getAstro(strBirthday) {
  var strBirthdayArr = strBirthday.split("-");
  var month = strBirthdayArr[1];
  var day = strBirthdayArr[2];
  var s = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
  var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
  return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
}

}
export { Base }