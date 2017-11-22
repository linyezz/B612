import  {Base} from '../../utils/base.js';
class Planet extends Base{
  constructor(){
    super()
  }

  addShareFriend(param,callBack){
    
    var param={
      url: 'friend/share_add_friend',
      type:"POST",
      data: { share_uid: param},
      eCallback:function(res){
        callBack && callBack(res)
      }
    }
    this.request(param)
  }
  getFriendInnfo(param,callBack){
    var param={
      url: 'friend/get_index_friend_list',
      type:"POST",
      data: param,
      eCallback:function(res){
        callBack && callBack(res)
      }
    }
    this.request(param)
  }

  
}
export { Planet}