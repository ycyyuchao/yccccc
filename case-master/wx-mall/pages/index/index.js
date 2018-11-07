const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');


//获取应用实例
const app = getApp();
console.log(app.globalData.currentId);
Page({
  data: {
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    floorGoods: [],
    banner: [],
    channel: [],
    bannerApi: ['../../static/images/banner01.jpg', '../../static/images/banner02.jpg', '../../static/images/banner04.jpg'],
    honeymoon: [{
        "url": "../../static/images/wenxin.jpg",
        "name": "温馨蜜月餐"
      },
      {
        "url": "../../static/images/nuanyi.jpg",
        "name": "暖意蜜月餐"
      },
      {
        "url": "../../static/images/haohua.jpg",
        "name": "豪华蜜月餐"
      }
    ],
    popShow: false,
    details: [],
    kind: [
      '母婴商城',
      '产后修复',
      '营养月子餐',
      '蜜月套餐',
      '移动月子会所',
      '宝宝早教'
    ],
    currentId: '',
    chanhou: [{
        "url": '../../static/images/chanhou01.jpg',
        "name": '私密调理',
        "content": '净化养护： 特殊的生理结构使女性在生活、工作中有许多尴尬：阴道炎、盆腔炎等妇科疾病不仅影响生活和工作，更是女性健康的隐形杀手。本项目可活血化瘀、清除女性生殖系统中的'
      },
      {
        "url": '../../static/images/chanhou02.jpg',
        "name": '妊娠纹修复',
        "content": '妊娠纹修复是帮助腹部肌肤新陈代谢，协助腹部肌肤脂替氧化，同时对妊娠纹及体纹进行全面营养修复，增强皮肤结缔组织的弹性和柔韧性，全面改善皮肤的扩张力，还产后妈妈健康美'
      },
      {
        "url": '../../static/images/chanhou03.jpg',
        "name": '小儿推拿',
        "content": '小儿推拿 小儿推拿是建立在中医学整体观念的基础上，以阴阳五行脏腑经络等学说为理论指导，运用手法刺激穴位，以调整脏腑功能、保健预防为目的的一种方法，对常见病、消化道症'
      },
      {
        "url": '../../static/images/chanhou04.jpg',
        "name": '满月发汗',
        "content": '生儿育女是女性一生中的大事，生产后的妇女由于筋骨表里大开，又因出血较多和体力消耗，体内正气不足，元气尚未恢复，身体抵抗力会下降很多，这时风寒暑湿等外邪便会乘机侵入'
      },
      {
        "url": '../../static/images/chanhou05.jpg',
        "name": '产后塑形',
        "content": '产后塑形 孕妇生产后由于皮肤在怀孕时受到拉扯，导致纹路的产生，通过局部塑形可恢复肌肤的紧致。产后瘦身并不是单纯减脂，它包括体重降低、脂肪消除、疏通经络、饮食恢复等'
      },
      {
        "url": '../../static/images/chanhou06.jpg',
        "name": '排残乳',
        "content": '排残乳 哺乳后组织萎缩，断奶后残留在乳房里的奶水没有及时排出，就会形成残乳，人体正常温度是36.5度，这些残留的乳汁长时间存留在乳房内就会发酵变质，形成浓水，甚至血脓'
      },
      {
        "url": '../../static/images/chanhou07.jpg',
        "name": '催乳',
        "content": '催乳 按摩催乳的原理是理气活血，多采用点按揉拿的基本手法，但在实际应用时须多种手法相互配合。 催乳治疗有利于奶汁的分泌和排出，同时达到促进乳汁分泌目的，以满足婴儿需'
      },
      // {
      //   "url": '../../static/images/chanhou08.jpg',
      //   "name": '骨盆修复',
      //   "content": '骨盆修复 在孕期，身体会分泌一种激素，叫耻骨松驰剂。它用于骨盆耻骨联合，让骨质慢慢疏松，有助于分娩时骨缝的打开，这也是为什么孕后期和产后医生都会建议大量补钙的原因'
      // },
      // {
      //   "url": '../../static/images/chanhou09.jpg',
      //   "name": '卵巢活血排毒',
      //   "content": '卵巢活血排毒 卵巢是女人的重要器官，卵巢掌控着女性的雌性激素分泌、女性的体形变化、女性的皮肤光滑、亮泽，如果卵巢功能衰退，最明显的就是皮肤松弛，容颜衰老。想要自己的'
      // },
      // {
      //   "url": '../../static/images/chanhou10.jpg',
      //   "name": '产后子宫恢复',
      //   "content": '产后子宫恢复 主要包括三方面： 子宫体的复原：产后10-14天，子宫变小，降入骨盆腔内，这时就摸不到子宫底了。 子宫颈的复原：产后子宫壁很薄，皱起来就如同袖口，4周左右子宫颈'
      // }
    ],
    yingyang: [{
        "time": '第一周期',
        "title": '排',
        "content": '清除毒素，补充血气，恢复体力，为健康母乳分泌打造基础',
        "img": '../../static/images/yingyang01.jpg'
      },
      {
        "time": '第二周期',
        "title": '润',
        "content": '滋养脏器，畅通血气，收缩岔骨，预防内脏下垂和体形不良变化',
        "img": '../../static/images/yingyang02.jpg'
      },
      {
        "time": '第三周期',
        "title": '调',
        "content": '全面调理，温和进补，恢复元气',
        "img": '../../static/images/yingyang03.jpg'
      },
      {
        "time": '第四周期',
        "title": '养',
        "content": '益气补血，容光焕发，肌肤红润有光泽，重塑窈窕身材',
        "img": '../../static/images/yingyang04.jpg'
      },
    ],


  },
  onShareAppMessage: function() {
    return {
      title: 'NideShop',
      desc: '键贝雅微信小程序商城',
      path: '/pages/index/index'
    }
  },
  popUp: function() {
    this.setData({
      popShow: !this.data.popShow
    })
  },
  packUp: function() {
    this.setData({
      popShow: !this.data.popShow
    })
  },
  click: function(e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      currentId: id

    })
    app.globalData.currentId = id;
    console.log(app.globalData.currentId);
  },
  clickAggin: function(e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      currentId: id,
      popShow: !this.data.popShow
    })
  },
  created: function() {
    var that = this;
    util.request(api.category).then(function(res) {
      if (res.errno == 0) {
        var details = res.data;
        console.log(details)
        that.setData({
          details: details
        });
        if (details.length > 0) {
          var cid = details[0].id;
          that.setData({
            cid: cid
          })
        }

      }
    }).then(() => {
      //请求默认cid的商品列表
      util.request(api.IndexGoods,{cid:that.data.cid}).then(function(res) {
        if (res.errno == 0) {
          console.log(res.data)
        }
      })
    })
  },


  getIndexData: function() {
    let that = this;
    util.request(api.IndexUrl).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brand: res.data.brandList,
          floorGoods: res.data.categoryList,
          banner: res.data.banner,
          channel: res.data.channel
        });
      }
    });
  },
  onLoad: function(options) {
    console.log(app.globalData.currentId);
    var that = this;
    that.getIndexData();
    var currentId = app.globalData.currentId;
    that.setData({
      currentId
    });


    that.created();
    //请求商品类型


  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
})