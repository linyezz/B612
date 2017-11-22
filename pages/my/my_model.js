import {Base} from "../../utils/base.js";
class My extends Base{
  constructor(){
    super()
  }
  getInfo(callBack){
    var userInfo = wx.getStorageSync("userInfo")
    if (userInfo){
      callBack && callBack(userInfo)
    }
  }
}
export { My}