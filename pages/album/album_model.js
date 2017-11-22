import {Base} from "../../utils/base.js";
class Album extends Base{
  constructor(){
    super();
  }
  getPhoto(param,callBack){
    var params={
      url: 'user/get_photo_list',
      type:'POST',
      data: param,
      eCallback:function(res){
        callBack && callBack(res)
      }
    }
    this.request(params)
  }
  addPhoto(url,callBack){
    var that = this;
    var param = {
      url: 'photo/photo',
      filePath: url,
      name: 'file',
      callBack: function (res) {
        callBack && callBack(res)
      }
    }
    that.upLoad(param);
  }
}
export { Album }