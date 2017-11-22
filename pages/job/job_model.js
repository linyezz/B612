import {Base} from "../../utils/base.js";
class Job extends Base{
  constructor(){
    super()
  }
  getJobInfo(callBack){
    var params={
      url:'user/get_job_list',
      type:"POST",
      eCallback:res=>{
        callBack && callBack(res)
      }
    }
    this.request(params)
  }
  upJob(param,callBack){
    var params = {
      url: 'user/update_user_info',
      type: "POST",
      data: param,
      eCallback: res => {
        callBack && callBack(res)
      }
    }
    this.request(params)
  }
}
export {Job}