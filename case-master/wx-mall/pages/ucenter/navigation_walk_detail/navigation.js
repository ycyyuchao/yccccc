var amapFile = require('../../../lib/amap-wx.js');
var config = require('../../../lib/config.js');

Page({
  data: {
    steps: {}
  },
  onLoad: function() {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: "3522278764320961cb382f97afc3a64a"});
    myAmapFun.getWalkingRoute({
      origin: '120.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function(data){
        if(data.paths && data.paths[0] && data.paths[0].steps){
          that.setData({
            steps: data.paths[0].steps
          });
        }
          
      },
      fail: function(info){

      }
    })
  }
})