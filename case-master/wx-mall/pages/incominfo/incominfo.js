const util = require('../../utils/util.js');
const api = require('../../config/api.js');

var currentDate = new Date(); //当前时间
var currentYear = currentDate.getFullYear(); //当前年
var currentMonth = currentDate.getMonth() + 1; ////当前月
var stroDetail = [];
var DetailLists = [];
var income = true;
var platform = ""; //手机型号
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tapHdCurrent: "0",
    tapBdCurrent: 0,
    page: 1,
    size: 8,
    myPoint:''
  },

  init() {
    var that = this;
    stroDetail = [];
    DetailLists = [];
    that.setData({
      DetailList: DetailLists
    })
  },

  tap: function(e) {
    var that = this;
    that.init();
    that.data.page = 1; //切换时重置分页条件
    var current = e.currentTarget.dataset.id; //获取到绑定的数据
    if (current == 0) {
      // DO Noting
      income = true;
    } else {
      income = false;
    }
    util.request(api.ConsDetail + '?income=' + income + '&&page=' + that.data.page + "&&size=" + that.data.size).then(function(res) {
      if (res.errno === 0) {
        //处理数据
        var DetailList = that.DetailListHandle(res.data)
      }
    })
    console.log(current)
    that.setData({
      tapHdCurrent: current,
      tapBdCurrent: current
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.init();
    var myPoint = options.val;
    this.setData({myPoint})
    var res = wx.getSystemInfoSync()
    platform = res.platform
    //当前页面一加载就请求 积分收入
    util.request(api.ConsDetail + "?income=true&&page=" + that.data.page + "&&size=" + that.data.size).then(function(res) {
      if (res.errno === 0) {
        //处理数据
        var DetailList = that.DetailListHandle(res.data)

      }
    })

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;

    this.data.page = this.data.page + 1;
    util.request(api.ConsDetail + '?income=' + income + '&&page=' + that.data.page + "&&size=" + that.data.size).then(function(res) {
      if (res.errno === 0) {
        //处理数据
        var DetailList = that.DetailListHandle(res.data)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //消费明细的每一项进行处理
  DateItemHandel(DetailList) {
    if (DetailList.incomorpay) { //处理收入支出
      DetailList.incominfo_num = -DetailList.incominfo_num;
    };
    if (platform == "ios") {
      var date = util.formatTime(new Date(DetailList.incomtime)).replace(/-/g, '/')
    } else {
      var date = util.formatTime(new Date(DetailList.incomtime));
    }
    DetailList.incomtime = date;
    //根据传来的日期判断是否是本月
    var thisYear = new Date(date).getFullYear();
    var thisMonth = new Date(date).getMonth() + 1;
    if (thisYear == currentYear && thisMonth == currentMonth) { //本月
      DetailList.IscurrMonth = "本月"
    } else if (thisYear == currentYear) {
      DetailList.IscurrMonth = thisMonth + "月"
    } else {
      DetailList.IscurrMonth = thisYear + '年' + thisMonth + '月'
    }
    this.AddIfication(DetailList);
  },

  //根据IscurrMonth进行分类 成数组 最后装到大数组里面
  AddIfication: function(DetailList) {
    if (DetailLists.length > 0) {
      for (var i = 0; i < DetailLists.length; i++) {
        if (DetailLists[i].IscurrMonth + "" === DetailList.IscurrMonth + "") {
          DetailLists[i].arr.push(DetailList)
        } else {
          var newArr = [];
          newArr.push(DetailList)
          var newObj = {
            IscurrMonth: DetailList.IscurrMonth,
            arr: newArr
          };
          stroDetail.push(newObj)
        }
      }
    } else { //第一次初始化数据
      var newArr = []
      newArr.push(DetailList)
      var newObj = {
        IscurrMonth: DetailList.IscurrMonth,
        arr: newArr
      }
      DetailLists.push(newObj)
    }
  },

  //消费明细处理 以及我的积分计算
  DetailListHandle: function(DetailList) {

    let that = this;
    if (DetailList.length <= 0) {
      return false;
    } else {
      for (var i = 0; i < DetailList.length; i++) {
        that.DateItemHandel(DetailList[i]);
      }
      var finalDetail = DetailLists.concat(stroDetail)
      this.setData({
        DetailList: finalDetail
        
      })
    }
  }
})