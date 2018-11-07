// pages/newbie/newbie.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const app = getApp();
var flag = true;
Component({

  /**
   * 页面的初始数据
   */
  properties: {

  },
  data: {
    couponState: true, //领取页面
    doubleState: true, //翻倍页面
    shareState: true, //分享
    shareDetail: [{
        "num": "50",
        "cate": '初始'
      },
      {
        "num": "100",
        "cate": "5人助力"
      },
      {
        "num": "200",
        "cate": "15人助力"
      }
    ],

  },

  methods: {
    //立即领取
    get: function() {
      var newUserCoupon = app.globalData.newUserCoupon;
      var canGet = "";




      //遍历出可以直接领取的
      for (var i = 0; i < newUserCoupon.length; i++) {
        if (newUserCoupon[i].send_type == 1) {
          canGet = newUserCoupon[i]
        }

        util.request(api.applyCoupon, {
          cid: newUserCoupon[i].id,
          flag: flag
        }).then(function(res) {
          if (res.errno == 0) {
            flag = false;
          }
        })

      }
      this.setData({
        newUserCoupon: newUserCoupon,
        couponState: !this.data.couponState,
        canGet: canGet
      })

    },
    latent: function() {
      this.setData({
        couponState: !this.data.couponState
      })
    },
    //去翻倍
    toDouble: function() {
      this.setData({
        doubleState: !this.data.doubleState
      })
    },

    //去分享
    toShare: function() {
      this.setData({
        shareState: !this.data.shareState
      })
    },

    //分享给朋友
    shareTo: function() {
      wx.redirectTo({
        url: '/pages/ucenter/share/share',
      })
    },

    toUse: function() {
      wx.redirectTo({
        url: '/pages/goods/goods',
      })
    }

  }

})