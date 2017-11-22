import {Base} from '../../utils/base.js';
class Apply extends Base{
  constructor(){
    super()
  }
  updateNotification(data,callBack){
    var param={
      url: 'notification/update_notification',
      type:"POST",
      data: data,
      eCallback:function(res){
        callBack && callBack(res)
      }
    }
    this.request(param)
  }
  agreeApply(param,callBack){
    var params = {
      url: 'friend/add_apply_friend',
      data: param,
      type:"POST",
      eCallback:function(res){
        callBack && callBack(res)
      }
    }
    this.request(params)
  }

}
export { Apply}