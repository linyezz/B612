import{Base} from '../../utils/base.js';
class Message extends Base{
  constructor(){
    super()
  }
  getFriendApply(callBack){
    var param={
      url: 'friend/get_apply_friend_list',
      type:"POST",
      eCallback:function(res){
        callBack && callBack(res);
      }
    }
    this.request(param)
  }
  getHeartflow(callBack){
    var param = {
      url: 'heartflow/get_heartflow_list',
      type: "POST",
      eCallback: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(param)
  }
  getLabel(callBack){
    var param = {
      url: 'impress_tag/get_impress_message_list',
      type: "POST",
      eCallback: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(param)
  }
  getPhoneNumberMessage(callBack){
    var param = {
      url: 'notification/get_ask_phone_list',
      type: "POST",
      eCallback: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(param)
  }
  agreePhone(data,callBack){
    var params={
      url: 'notification/agree_need_phone',
      type:'POST',
      data: data,
      eCallback:function(res){
        callBack && callBack(res);
      }
    }
    this.request(params)
  }
}
export {Message}