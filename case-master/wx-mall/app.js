var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./services/user.js');

// page({
//   data:{
//     vipUrl:['../../static/images/vip1.png','../../static/images/vip2.png',]
//   }
// })

App({
  onLaunch: function (options) {
    //获取用户的登录信息
    console.log(options.scene)
    user.checkLogin().then(res => {
      console.log('app login')
      this.globalData.userInfo = wx.getStorageSync('userInfo');
      this.globalData.token = wx.getStorageSync('token');
      this.globalData.currentId = wx.getStorageSync('currentId');
    }).catch(() => {
      
    });
  },
  
  globalData: {
    userInfo: {
      nickName: 'Hi,游客',
      userName: '点击去登录',
      avatarUrl: 'http://p9kyr79ne.bkt.clouddn.com/1/20180531/150547696d798c.png'
    },
    token: '',
    userCoupon: 'NO_USE_COUPON',//默认不适用优惠券
    courseCouponCode: {},//购买课程的时候优惠券信息
    currentId: ''//导航栏当前ID
  },
  
})