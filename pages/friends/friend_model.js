import {Base} from '../../utils/base.js';

class Friend extends Base{
  constructor(){
    super()
  }
  getMyFriend(callBack){
    var params={
      url: 'friend/get_friend_list',
      type:"POST",
      eCallback:function(res){
        callBack&& callBack(res)
      }
    }
    this.request(params)
  }
  getTwoFriend(friend_uid1,callBack){
    var params = {
      url: 'friend/get_friend_list',
      type: "POST",
      data: { friend_uid1: friend_uid1},
      eCallback: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params)
  }
  getThreeFriend(friend_uid1, friend_uid2,callBack){
    var params = {
      url: 'friend/get_friend_list',
      type: "POST",
      data: { friend_uid1: friend_uid1, friend_uid2: friend_uid2},
      eCallback: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params)
  }

  getFriendInfo(){
   
  }
  
}
export { Friend}