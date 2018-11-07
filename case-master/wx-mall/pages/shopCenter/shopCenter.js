// pages/shopCenter/shopCenter.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:[],
    imgSrc:'../../static/images/expand.png',//收起展开的icon路劲
    showState:true,//列表状态
    changeState:'展开', //收起、展开
    btnState:false, //按钮状态
    vipUrl: ['../../static/images/vip1.png', '../../static/images/vip2.png', '../../static/images/vip3.png']//VIP图标

  
  },

//展开收起
  showHide:function(e){
    if (this.data.showState){
      this.setData({
        imgSrc: '../../static/images/hide.png',
        showState: !this.data.showState,
        changeState: '收起'

      })
    }else{
      this.setData({
        imgSrc: '../../static/images/expand.png',
        showState: !this.data.showState,
        changeState: '展开'

      })
    }
    
   
  },

  //领取优惠券
  obtainCoupon:function(e){
    this.setData({
     
      curId: e.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.request(api.getCoupon).then(function(res){
      if(res.errno === 0){
        that.setData({
          details:res.data
        })
      }
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