import {Base} from '../../utils/base.js';
class Middle extends Base{
    constructor(){
      super()
    }
    getMIddleInfo(param,callBack){
      var params={
        url: 'user/get_probably_user',
        type:"POST",
        data:param,
        eCallback:res=>{
          callBack && callBack(res)
        }
      }
      this.request(params)
    }
}
export { Middle}