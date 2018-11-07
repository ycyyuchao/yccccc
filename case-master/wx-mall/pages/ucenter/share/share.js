
// pages/ucenter/share/share.js

const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipUrl: ['../../../static/images/vip1.png', '../../../static/images/vip2.png', '../../../static/images/vip3.png'],//VIP图标
    details:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    util.request(api.shareDetails).then(function(res){
      if(res.errno === 0){
       var details = res.data;
       that.setData({
         details:details
       })
        
      }
    });

    wx.showShareMenu({
      //显示转发按钮
      withShareTicket: true
    });

    

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
  onShareAppMessage: function (opt) {
    if(opt.from === 'button'){
      //来自页面内的准发按钮
      console.log(opt.target);
    }
    return{
      title:'转发健贝雅',
      path:'pages/index/index',
      success:function(res){
        //转发成功
        console.log('转发成功：' + JSON.stringify(res));
        var shareTickets = res.shareTickets;
        if(shareTickets.length == 0){
          return false;
        }
        wx.getShareInfo({
          shareTicket: 'shareTickets[0]',
          success:function(res){
              console.log(res);

          }
        })
      },
      fail:function(){
        //转发失败
        console.log('转发失败：' + JSON.stringify(res));
      }
    }
    
  }
})