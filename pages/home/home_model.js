import {Base} from "../../utils/base.js";

class Home extends Base{
  constructor(){
    super()
  }
  getUserInfo(userId){
    
  }
  getMyInfo(callBack){
    var param={
      url:'user/get_user_info',
      type:"POST",
      eCallback:function(res){
        callBack && callBack(res)
      }
    }
    this.request(param)
    
  }
  getFriendInfo(friend_uid1, friend_uid2, friend_uid3,callBack){
    var data={
      friend_uid1: friend_uid1,
      friend_uid2: friend_uid2,
      friend_uid3: friend_uid3,
    }
    var params={
      url:'user/get_user_info',
      type:"POST",
      data:data,
      eCallback:function(res){
        callBack && callBack(res)
        
      }
    }
    this.request(params)
  }
  //加好友
  addFriend(param,callBack){
    var params={
      url:'friend/add_friend',
      type:'POST',
      data:param,
      eCallback:res=>{
        callBack && callBack(res)
      }
    }
    this.request(params)
  }
  //心动
  addHeartflow(param,callBack){
    var params={
      url: 'heartflow/add_heartflow',
      type:'POST',
      data: param,
      eCallback:res=>{
        callBack && callBack(res)
      }
    }
    this.request(params)
  }
  //索要手机号
  askForPhone(data,callBack){
    console.log(data)
    var params={
      url: 'notification/ask_for_phone',
      type:'POST',
      data:data,
      eCallback:res=>{
        callBack && callBack(res)
      }
    }
    this.request(params)
  }
}

export { Home}