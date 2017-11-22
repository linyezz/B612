import {Base} from '../../utils/base.js';
class Edit extends Base{
  constructor(){
    super()
  }
  updataInfo(param,callBack){
    var that = this;
    var params={
      url:'user/update_user_info',
      data: param,
      type:"POST",
      eCallback:function(res){
        callBack && callBack(res)
      }
    }
    that.request(params)
  }

  saveHeadImg(url,callBack){
    var that=this;
      var param={
        url:'photo/face',
        filePath:url,
        name:'file',
        callBack:function(res){
          callBack && callBack(res)
        }
      }
      that.upLoad(param);
  }
}
export { Edit}