// pages/ucenter/serviceDetails/serviceDetails.js

const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');


var t = "";//时间点

var d = "";//日期

var m = "";//月份

var y = "";//年份
Page({

  /**
   * 页面的初始数据
   */
  data: {


    //订单跟踪状态
    statusOrder: [
      '已预约',
      '待沟通',
      '预约成功',
      '到店服务',
      '评价'
    ],
    currentState: '0',//订单的当前状态
    dateState: true,
    year: new Date().getFullYear(), // 年份
    month: new Date().getMonth() + 1, // 月份
    timing: [
      "8:00",
      "9:00",
      "10:00",
      "11:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00"
    ],
    current: 0,
    inputValue: '', //电话号码
    d: '', //预约日期
    t: '', //时间点
    m: '',//月份
    y: '',//年份
    dateTime: '',//预约时间
  },
  //到店导航
  navigatorTo:function(){
    wx.redirectTo({
      url: '../map/map',
    })
    // wx.chooseLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     console.log(latitude);
    //     console.log(longitude);
    //     wx.openLocation({
    //       latitude: latitude,
    //       longitude: longitude,
    //       scale: 28,
    //       address: address,
    //     })
    //   }
    // })
  },
  //拨打电话
  call:function(){
    wx.makePhoneCall({
      phoneNumber: '15574970450',
      success:function(){
        console.log('成功拨打电话');
      }
    })
  },
  changeDate: function () {
    this.setData({
      dateState: !this.data.dateState
    })
  },
  //选择日期
  check: function (e) {
    t = e.currentTarget.dataset.items;
    this.setData({
      current: e.currentTarget.dataset.id,
      t: e.currentTarget.dataset.items,
      dateTime: y + "年" + m + "月" + d + "日" + " " + t
    })

    console.log(this.data.dateTime);

  },
  submit: function () {
    this.setData({
      dateState: !this.data.dateState
    })
  },
  //日历每天点击的用法
  dayClick: function (event) {
    let days_style = new Array;
    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    for (let i = 1; i <= days_count; i++) {
      if (event.detail.day == i) {
        days_style.push({
          month: 'current',
          day: event.detail.day,
          color: 'white',
          background: '#335BE2'
        });
      }
    }
    d = event.detail.day;
    m = event.detail.month;
    y = event.detail.year;
    this.setData({
      days_style,
      dateTime: y + "年" + m + "月" + d + "日" + " " + t

    })



    console.log(this.data.dateTime);
    console.log(event.detail);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.request(api.serverDetails).then(function(res){
      if (res.errno == 0){
        var details = res.data;
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