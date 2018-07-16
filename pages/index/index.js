// pages/case/case.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: "../../images/logo.png",
    searchplaceholder: '搜索',
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    navList: [
      {
        title: "全部商品",
        img: "../../images/nav_icon_1.png",
        url: 'allproduct',
        id: 1
      },
      {
        title: "品牌折扣",
        img: "../../images/nav_icon_2.png",
        url: 'discount',
        id: 2
      },
      {
        title: "达人晒图",
        img: "../../images/nav_icon_3.png",
        url: 'saitu',
        id: 3
      },
      {
        title: "充值预付",
        img: "../../images/nav_icon_4.png",
        url: 'recharge',
        id: 4
      },
      {
        title: "合作加盟",
        img: "../../images/nav_icon_5.png",
        url: 'join',
        id: 5
      },
      {
        title: "绑定包邮",
        img: "../../images/nav_icon_6.png",
        url: 'binding',
        id: 6
      },
      {
        title: "钱包管理",
        img: "../../images/nav_icon_7.png",
        url: 'wallet',
        id: 7
      }
    ],
    datu: '../../images/test.png',
    xiaotu: '../../images/test.png',
    recommendLsit: [
      {
        img: "../../images/test.png",
        title: '产品名称',
        url: 'productdetail',
        id: 0
      },
      {
        img: "../../images/test.png",
        title: '产品名称',
        url: 'productdetail',
        id: 1
      },
      {
        img: "../../images/test.png",
        title: '产品名称',
        url: 'productdetail',
        id: 2
      },
      {
        img: "../../images/test.png",
        title: '产品名称',
        url: 'productdetail',
        id: 3
      },
      {
        img: "../../images/test.png",
        title: '产品名称',
        url: 'productdetail',
        id: 4
      },
      {
        img: "../../images/test.png",
        title: '产品名称',
        url: 'productdetail',
        id: 5
      },
      {
        img: "../../images/test.png",
        title: '产品名称',
        url: 'productdetail',
        id: 6
      },
      {
        img: "../../images/test.png",
        title: '产品名称',
        url: 'productdetail',
        id: 7
      },
      {
        img: "../../images/test.png",
        title: '产品名称',
        url: 'productdetail',
        id: 8
      }
    ],
    classList: [
      {
        eng: "T恤",
        title: "T-SHIRT",
        img: "../../images/classify_icon_1.png",
        id: 1
      },
      {
        eng: "衬衫",
        title: "T-SHIRT",
        img: "../../images/classify_icon_2.png",
        id: 2
      },
      {
        eng: "卫衣",
        title: "T-SHIRT",
        img: "../../images/classify_icon_3.png",
        id: 3
      },
      {
        eng: "毛衣",
        title: "T-SHIRT",
        img: "../../images/classify_icon_4.png",
        id: 4
      },
      {
        eng: "外套",
        title: "T-SHIRT",
        img: "../../images/classify_icon_5.png",
        id: 5
      },
      {
        eng: "配饰",
        title: "T-SHIRT",
        img: "../../images/classify_icon_6.png",
        id: 6
      },
      {
        eng: "休闲裤",
        title: "T-SHIRT",
        img: "../../images/classify_icon_7.png",
        id: 7
      },
      {
        eng: "牛仔裤",
        title: "T-SHIRT",
        img: "../../images/classify_icon_8.png",
        id: 8
      }
    ],
    hotTitle: '一  热卖产品  一',
    hotleng:null,
    hotlist:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获得banner
    this.getbanner();
    // 获得产品参数
    this.gethotfun();
  // 金额格式化
    // this.number_format(1111);
    // console.log(this.data.hotleng)
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

  },
  // 获得banner
  getbanner:function(){
    var that = this;
    wx.request({
      url: app.ajaxUrl.url_base +'banner/list',
      data:{
        type:"banner"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data.data);
        that.setData({
          imgUrls: Array.from(res.data.data)
        });
      },
      fail:function(res){
        console.log(res);
      }
    })
  },
  // 获得热卖产品数据
  gethotfun() {
    var that = this;
    wx.request({
      url: app.ajaxUrl.url_base + 'shop/goods/list',
      data: {
        page: 1,
        pageSize: 4
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data.data);
        that.setData({
          hotlist: res.data.data,
          hotleng: res.data.data.length
        })
        //  console.log(that.data.hot.length);
      }
    })
  },
  // 金额格式化
  number_format(num) {
    num = parseFloat(num);
    // console.log(num);
    var SUM = "";
    var sumFol = num.toFixed(2);
    var sumtotalStr = sumFol;
    var sumEndStr = sumtotalStr.slice(sumtotalStr.indexOf("."));
    var sumStr = sumtotalStr.slice(0, sumtotalStr.indexOf("."));
    var i;
    if (num.toString().length <= 3) {
      // console.log(num);
      return num;
    }
    if (sumStr.toString().length > 3) {
      var count = 0;
      if (sumStr.toString().length % 3 == 0) {
        count = sumStr.toString().length / 3;
      } else {
        count = (sumStr.toString().length - sumStr.toString().length % 3) / 3;
      }
      var text = "";
      for (i = 0; i < count; i++) {
        if ((count - i - 1) * 3 + sumStr.toString().length % 3 != 0) {
          text = "," + sumStr.slice((count - i - 1) * 3 + sumStr.toString().length % 3, (count - i - 1) * 3 + sumStr.toString().length % 3 + 3) + text;
        } else {
          text = sumStr.slice((count - i - 1) * 3 + sumStr.toString().length % 3, (count - i - 1) * 3 + sumStr.toString().length % 3 + 3) + text;
        }
      }
      SUM = sumStr.slice(0, sumStr.toString().length % 3) + text + sumEndStr;
      // console.log(SUM);
      return SUM;
    }
    // console.log(sumFol);
    return sumFol;
  }
})
