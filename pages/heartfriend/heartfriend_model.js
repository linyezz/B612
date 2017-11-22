import{Base} from '../../utils/base.js';
class Heart extends Base{
  constructor(){
    super()
  }
  getInfo(callBack){
    var param={
      url: 'heartflow/get_had_heartflow_list',
      type:"POST",
      eCallback:function(res){
        callBack && callBack(res)
      }
    }
    this.request(param)
  }
}
export{Heart}