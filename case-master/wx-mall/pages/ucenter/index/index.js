var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../services/user.js');

var app = getApp();

Page({
  data: {
    userInfo: {},
    hasMobile: '',
    ishow: 'none',
    vipUrl: ['../../../static/images/vip1.png', '../../../static/images/vip2.png', '../../../static/images/vip3.png'], //VIP图标地址
    weekpoint: '请登录',
    point: '请登录',
    newGift: '', //新人大礼包领取

  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(app.globalData)


  },
  onReady: function() {

  },
  onShow: function() {

    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');

    // 页面显示
    if (userInfo && token) {

      app.globalData.userInfo = userInfo;
      app.globalData.token = token;
      this.getPoint();
    }

    this.setData({
      userInfo: app.globalData.userInfo,
    });

  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭
  },
  bindGetUserInfo(e) {

    var that = this;

    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      user.loginByWeixin(e.detail).then(res => {
        this.setData({
          userInfo: res.data.userInfo
        });
        app.globalData.userInfo = res.data.userInfo;
        app.globalData.token = res.data.token;
        var flag = wx.getStorageSync("hasGetNewUserCoupon");
        console.log(flag)
        if (flag == "") flag = false;
        console.log(res.data.newUser)
        if (res.data.newUser == true && flag == false) {
          this.setData({
            ishow: "block",
            newGift: !this.data.newGift
          })

          //获取优惠卷
          wx.setStorageSync('newUserCouponList', res.data.couponlist);
          app.globalData.newUserCoupon = wx.getStorageSync("newUserCouponList");

        }
        that.getPoint();

      }).catch((err) => {
        console.log(err)
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告通知',
        content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
        success: function(res) {
          if (res.confirm) {
            wx.openSetting({
              success: (res) => {
                user.loginByWeixin(e.detail).then(res => {
                  this.setData({
                    userInfo: res.data.userInfo
                  });
                  app.globalData.userInfo = res.data.userInfo;
                  app.globalData.token = res.data.token;
                  var flag = wx.getStorageSync("hasGetNewUserCoupon");
                  console.log(flag)
                  if (flag == "") flag = false;
                  console.log(res.data.newUser)
                  if (res.data.newUser == true && flag == false) {
                    this.setData({
                      ishow: "block",
                      newGift: !this.data.newGift
                    })

                    //获取优惠卷
                    wx.setStorageSync('newUserCouponList', res.data.couponlist);
                    app.globalData.newUserCoupon = wx.getStorageSync("newUserCouponList");
                  }
                  that.getPoint();

                }).catch((err) => {
                  console.log(err)
                });
              }

            })
          }
        }
      });
    }
  },
  exitLogin: function() {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function(res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    })

  },

  //请求服务器获取用户积分 
  getPoint: function() {
    var that = this;
    util.request(api.getPoint).then(function(res) {
      if (res.data != null) {
        that.setData({
          point: res.data.userInfo.point,
          weekpoint: res.data.userInfo.weekpoint
        })
      }


    })

  }
})