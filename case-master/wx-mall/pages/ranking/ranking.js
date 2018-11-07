// pages/ranking/ranking.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipUrl: ['../../static/images/vip1.png', '../../static/images/vip2.png', '../../static/images/vip3.png'],//VIP图标
    ranking:['../../static/images/au.png','../../static/images/ag.png','../../static/images/cu.png']  //排行榜前三
    

  },
  init(){

    details: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.request(api.rankingDetails).then(function(res){
      if(res.errno === 0){
        var details = res.data;
        that.setData({
          details
        })
      }
      console.log(details.length);
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