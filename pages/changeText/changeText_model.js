import {Base} from "../../utils/base.js";
class Change extends Base {
  constructor() {
    super();
  }
  updataInfo(param, objName,callBack) {
    var that = this;
    var obj={};
    obj[objName] = param
    var params = {
      url: 'user/update_user_info',
      data: obj,
      type: "POST",
      eCallback: function (res) {
        callBack && callBack(res)
      }
    }
    that.request(params)
  }
}

export {Change}