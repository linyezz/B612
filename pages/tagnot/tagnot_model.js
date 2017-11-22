import{Base} from '../../utils/base.js';
class Tag extends Base{
  constructor(){
    super()
  }
  updateNotification(data,callBack){
    var param = {
      url: 'notification/update_notification',
      type: "POST",
      data: data,
      eCallback: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(param)
  }
}
export {Tag}