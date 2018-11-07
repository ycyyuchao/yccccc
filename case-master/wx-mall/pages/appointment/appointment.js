const util = require('../../utils/util.js');
const api = require('../../config/api.js');


var t = "";//时间点

var d = "";//日期

var m = "";//月份

var y = "";//年份

var rnd1 = "";


Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    inputVal: '', //电话号码
    d: '', //预约日期
    t: '', //时间点
    m: '',//月份
    y: '',//年份
    dateTime: '',//预约时间
    goodsDetails: [],//商品信息
    id: '',
    btnParame: '获取验证码',//获取验证
    rnd: '',//随机验证码
    verify:'',//验证
    verityCode:''//验证码
  },
  //选择预约时间
  gotoCheck: function (e) {
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

  //获取验证码
  formSubmit(e) {
    
    var that = this;
    // hhh()
    console.log(this);
    that.setData({
      // rnd: rnd1,
      inputVal: e.detail.value.input
      
    })
    console.log(that.data.inputVal)
    util.request(api.sendMessage, {
      "phone": that.data.inputVal
    }).then(function (res) {
      console.log(that.data.inputVal)
      if (res.errno === 0) {
        that.setData({
          
        })
        
      }

    })
    
  },
  //立即预约
  justAppoint:function(e){

    this.setData({
      verityCode: e.detail.value.input
    })
    console.log(e.detail.value.input);
    console.log(this.data.verityCode);
    util.request(api.smsVerification, {
      "phone": this.data.inputVal,
      "code": this.data.verityCode,
      "gid": 1,
      "appoint": this.data.dateTime
    }).then(function (res) {
      console.log(that.data.inputVal)
      if (res.errno === 0) {
        that.setData({
          verify: res.data
        })

      }

    })

    if(this.data.inputVal){
      // wx.redirectTo({
      //   url:"../ucenter/serviceDetails/serviceDetails"
      // })
    
    }else{
      wx.showModal({
        title: '提示',
        content: '请输入手机号码验证',
        success:function(res){
          if(res.confirm){
            console.log('用户点击确认')
          }else if(res.confirm){
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  dateChange: function () {
    var myDate = new Date().getDate();//当前日期
    let days_style = new Array;
    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    for (let i = 1; i <= days_count; i++) {
      if (myDate == i) {
        console.log(255555);
        days_style.push({
          month: 'current',
          day: myDate,
          color: 'white',
          background: '#f00'
        });
      }
    }
  },
  //日历每天点击的用法
  dayClick: function (event) {
    console.log(new Date());
    console.log(new Date().getDate());
    var myDate = new Date().getDate();//当前日期
    let days_style = new Array;
    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    for (let i = 1; i <= days_count; i++) {
      if (event.detail.day == i && event.detail.day >= myDate) {
        days_style.push({
          month: 'current',
          day: event.detail.day,
          color: 'white',
          background: '#335BE2'
        });
      }
      if (myDate == i) {
        console.log(255555);
        days_style.push({
          month: 'current',
          day: myDate,
          color: 'white',
          background: '#f00'
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


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(2222);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(33333);
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