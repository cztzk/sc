//app.js
const app = getApp()
App({
  ajaxUrl: {
    // 请求服务器主域名
    url_base: 'https://api.it120.cc/tzk1300/',
  },
  onLaunch: function () {
    var token = wx.getStorageSync('server_token');//返回的token值
    var token_expire = wx.getStorageSync('server_token_expire');//登录时间
    var nowTime = new Date();//现在时间
    // 本地缓存购物车内容,模拟购物车数据
    let carlist = [
      {
        goodsId: "46834",
        logisticsType: 0,
        number: 4,
        price: 121.22,
        propertiesdata: ["红色", "M"],
        propertyChildIds:"4225,12164,4226,12168",
        shopimg: "https://cdn.it120.cc/apifactory/2018/05/02/a7a9df6d3162102e90340e17695af55f.jpg",
        shopname: "商品二",
        Selected: true
      },
      {
        goodsId: "46834",
        logisticsType: 0,
        number: 3,
        price: 121.22,
        propertiesdata: ["红色", "XL"],
        propertyChildIds:"4225,12164,4226,12170",
        shopimg: "https://cdn.it120.cc/apifactory/2018/05/02/a7a9df6d3162102e90340e17695af55f.jpg",
        shopname: "商品二",
        Selected: false
      }
    ];
    wx.setStorageSync('cartlist', carlist);
    var token = wx.getStorageSync('server_token');//返回的token值
    console.log(token);
    console.log(token_expire);
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
   
  },

  globalData: {
    userInfo: null,
  }
})