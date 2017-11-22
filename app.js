//app.js
import {Login} from '/utils/login.js';
import {Base} from '/utils/base.js';
import {Scoket} from '/utils/scoket.js';
var scoket = new Scoket()
var login = new Login()
App({
  onLaunch: function () {
   
    console.log('先执行APP注册')
   
   
  },
  onShow:function(){
    login.verify();
  },
 
 
 
})