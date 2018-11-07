// component/HeaderNav/HeaderNav.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    popShow: false,
    details:[],
    kind:[
      '产后修复',
      '营养月子餐',
      '蜜月套餐',
      '移动月子会所',
      '母婴商城',
      '宝宝早教'
    ],
    currentId:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {

    popUp: function () {
      this.setData({
        popShow: !this.data.popShow
      })
    },
    packUp:function(){
      this.setData({
        popShow: !this.data.popShow
      })
    },
    click:function(e){
      var id = e.currentTarget.dataset.id;
      this.setData({
        currentId:id
        
      })
      app.globalData.currentId = id;
      console.log(app.globalData.currentId);
    },
    clickAggin:function(e){
      var id = e.currentTarget.dataset.id;
      this.setData({
        currentId: id,
        popShow: !this.data.popShow
      })
    },
    created:function(){
      console.log(66666);
      var that = this;
      util.request(api.category).then(function(res){
        if(errno===0){
          var details = res.data;
        }
      })
    }
  }
})
