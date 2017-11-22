import {Base}  from '../../utils/base.js';
class Phone extends Base{
  constructor(){
    super()
  }
  test(param,callBack){
    var params={
      url: 'user/auth_mobile',
      type:"POST",
      data: param,
      eCallback:res=>{
        callBack && callBack(res)
      }
    }
    this.request(params)
  }

  updataInfo(param, callBack) {
    var that = this;
    var params = {
      url: 'user/update_user_info',
      data: param,
      type: "POST",
      eCallback: function (res) {
        callBack && callBack(res)
      }
    }
    that.request(params)
  }
}
export { Phone}