// pages/ucenter/signin/signin.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
   
      boxData: [
        {
          title: '07-05',
          classState: false,
          mouth: 7,
          day: 5
        },
        {
          title: '07-06',
          classState: false,
          mouth: 7,
          day: 6
        },
        {
          title: '07-07',
          classState: false,
          mouth: 7,
          day: 7
        },
        {
          title: '07-08',
          classState: false,
          mouth: 7,
          day: 8
        },
        {
          title: '07-09',
          classState: false,
          mouth: 7,
          day: 9
        },
        {
          title: '07-10',
          classState: false,
          mouth: 7,
          day: 10
        },
        {
          title: '07-11',
          classState: false,
          mouth: 7,
          day: 11
        }
      ],
      index: 0,
      //积分
      integral: 0,
      //按钮状态
      btnState: false
      
  },
  //签到
    signin: function () {
      //得到日期
      let date = new Date();
      let mouth = date.getMonth() + 1;
      let day = date.getDay() + 1;

      let boxData = this.data.boxData;
      for (let i = 0; i < boxData.length; i++) {
        let m = boxData[i].mouth;
        let d = boxData[i].day;
        if (m == mouth && d == day) {
          this.setData({ index: i });
        }
      }
      let index = this.data.index;
      let temp = "boxData[" + index + "].classState";
      this.setData({ [temp]: true });
      this.setData({ btnState: true });
      this.setData({ integral: this.data.integral + 5 });
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