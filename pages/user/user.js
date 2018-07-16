// pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    bing:false,//是否绑定手机号
    balance:"0.00",
    commission: {
      img: "../../images/user/commission.jpg",
      title: '我的佣金',
      url: 'commission'
    },
    erweima:{
      img: "../../images/user/erweima.jpg",
      title: '我的二维码',
      url: 'erweima',
      maskimg: "../../images/user/erweima_mask.jpg"
    },
    erweimamask:false,
    order:{
      url:'order',
      title:'我的订单',
      id:5//判断订单页面属于全部还是个别分类
    },
    orderclassbtn:[
      {
        id:0,
        title:'待付款',
        img: "../../images/user/orderclassbtn_1.jpg",
        url: 'order',
      },
      {
        id: 1,
        title: '待发货',
        img: "../../images/user/orderclassbtn_2.jpg",
        url: 'order',
      },
      {
        id: 2,
        title: '待收货',
        img: "../../images/user/orderclassbtn_3.jpg",
        url: 'order',
      },
      {
        id: 3,
        title: '已评价',
        img: "../../images/user/orderclassbtn_4.jpg",
        url: 'order',
      }
    ],
    otherbtn:[
      {
        title: '我的钱包',
        img: "../../images/user/otherbt_1.jpg",
        url: 'wallet',
      },
      {
        title: '优惠券',
        img: "../../images/user/otherbt_2.jpg",
        url: 'preferential',
      },
      {
        title: '我的嗮图',
        img: "../../images/user/otherbt_3.jpg",
        url: 'saitu',
      },
      {
        title: '我的关注',
        img: "../../images/user/otherbt_4.jpg",
        url: 'like',
      },
      {
        title: '浏览历史',
        img: "../../images/user/otherbt_5.jpg",
        url: 'like',
      },
      {
        title: '好友推荐',
        img: "../../images/user/otherbt_4.jpg",
        url: 'like',
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息及余额
    var that=this;
    wx.getUserInfo({
      success:res =>{
        // console.log(res);
        this.setData({
          userInfo: res.userInfo,
          balance:"100.00"//余额
        })
        // console.log(that.data.balance);
      },
      fail:res=>{
        console.log(res);
      }
    })
    // 判断是否绑定手机号
    var token = wx.getStorageSync('server_token');//返回的token值
    var token_expire = wx.getStorageSync('server_token_expire');//登录时间
    var nowTime = new Date();//现在时间
    //  console.log(token);
    //  console.log(token_expire);
    if (!token && nowTime > token_expire) {
      wx.navigateTo({
        url: '/pages/binding/binding',
      })
    }else{
      that.setData({
        bing:true
      })
    }
    
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
  erweima:function(){
    var that=this;
    that.setData({
      erweimamask:true
    })
  },
  erweimamask:function(){
    var that = this;
    that.setData({
      erweimamask: false
    })
  },

  
})