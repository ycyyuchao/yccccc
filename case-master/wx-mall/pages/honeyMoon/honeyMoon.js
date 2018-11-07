// pages/honeyMoon/honeyMoon.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: [
      "../../static/images/wenxin.jpg",
      "../../static/images/nuanyi.jpg",
      "../../static/images/haohua.jpg"
    ],
    serviceInfo: [
      {
        "name": "温馨月子餐",
        "discrible": "温馨大床房型",
        "price": "39800"
      },
      {
        "name": "暖意月子餐",
        "discrible": "暖意大床房型",
        "price": "49800"
      },
      {
        "name": "豪华月子餐",
        "discrible": "豪华大床房型",
        "price": "59800"
      }
    ],
    boxState: true, //领券弹出层状态
    btnState: false, //领券按钮状态
    vipUrl: ['../../static/images/vip1.png', '../../static/images/vip2.png', '../../static/images/vip3.png'],//VIP图标
    discount: ['-800', '-500', '-100'],
    collectBackImage: "/static/images/icon_collect.png",
    sellType: 1,
    openAttr: false,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000

  },

  goto: function (e) {
    this.setData({
      boxState: !this.data.boxState
    })
  },
  goout: function () {
    this.setData({
      boxState: !this.data.boxState
    })
  },
  //领取优惠券
  obtainCoupon: function (e) {
    this.setData({

      curId: e.currentTarget.dataset.id
    })
  },

//完成
  finish:function(){
    this.setData({
      boxState: !this.data.boxState
    })
  },

  closeAttrOrCollect: function () {
    let that = this;
    if (this.data.openAttr) {
      this.setData({
        openAttr: false,
      });
      if (that.data.userHasCollect == 1) {
        that.setData({
          'collectBackImage': that.data.hasCollectImage
        });
      } else {
        that.setData({
          'collectBackImage': that.data.noCollectImage
        });
      }
    } else {
      //添加或是取消收藏
      util.request(api.CollectAddOrDelete, { typeId: 0, valueId: this.data.id }, "POST")
        .then(function (res) {
          let _res = res;
          if (_res.errno == 0) {
            if (_res.data.type == 'add') {
              that.setData({
                'collectBackImage': that.data.hasCollectImage
              });
            } else {
              that.setData({
                'collectBackImage': that.data.noCollectImage
              });
            }

          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }

        });
    }

  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.request(api.indexGoods)
    this.setData({
      id: options.id
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})