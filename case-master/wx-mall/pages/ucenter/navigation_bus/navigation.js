var amapFile = require('../../../lib/amap-wx.js');
var config = require('../../../lib/config.js');

Page({
  data: {
    markers: [{
      iconPath: "../../../static/images/marker_red.png",
      id: 0,
      latitude: 39.989643,
      longitude: 116.481028,
      width: 23,
      height: 33
    },{
        iconPath: "../../../static/images/marker_yellow.png",
      id: 0,
      latitude: 39.90816,
      longitude: 116.434446,
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    transits: [],
    polyline: []
  },
  onLoad: function() {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: "3522278764320961cb382f97afc3a64a"});
    myAmapFun.getTransitRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      city: '北京',
      success: function(data){
        if(data && data.transits){
          var transits = data.transits;
          for(var i = 0; i < transits.length; i++){
            var segments = transits[i].segments;
            transits[i].transport = [];
            for(var j = 0; j < segments.length; j++){
              if(segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name){
                var name = segments[j].bus.buslines[0].name
                if(j!==0){
                  name = '--' + name;
                }
                transits[i].transport.push(name);
              }
            }
          }
        }
        that.setData({
          transits: transits
        });
          
      },
      fail: function(info){

      }
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../navigation_car/navigation'
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      url: '../navigation_bus/navigation'
    })
  },
  goToRide: function (e) {
    wx.redirectTo({
      url: '../navigation_ride/navigation'
    })
  },
  goToWalk: function (e) {
    wx.redirectTo({
      url: '../navigation_walk/navigation'
    })
  }
})