// pages/settlement/settlement.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseaddr: false,//是否选择了收货地址
    balance: 0,//模拟钱包余额
    cartlist: [],//已选择的订单数据
    payactive: 1,//选择支付方式
    pay: [
      {
        title: "微信支付",
        id: 0
      },
      {
        title: "支付宝支付",
        id: 1
      },
      {
        title: "银行卡支付",
        id: 2
      },
      {
        title: "钱包支付",
        id: 3
      },
      {
        title: "到付",
        id: 4
      },
    ],
    distributionactive: 2,//选择快递方式
    distribution: [//
      {
        title: "圆通快递",
        id: 0
      },
      {
        title: "顺丰快递",
        id: 1
      },
      {
        title: "百世汇通",
        id: 2
      },
    ],
    prompt: "提示：使用微信登录并绑定账号，全场免邮费！",
    productprice: 0,//商品总金额
    preferentialprice: 20,//优惠金额，未有接口，模拟数据
    freight: 8,//运费，未有接口，模拟数据
    totalnum: 0,//
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
    // 获得购物车数据
    let that = this;
    var token = wx.getStorageSync('server_token');//返回的token值   
    var addrlist = wx.getStorageSync('addrlist');//本地缓存的购物车页面，虚拟数据    
    if (addrlist) {
      that.setData({
        chooseaddr: true,
        addrlist: addrlist
      })
    }
    let cartlist = wx.getStorageSync('cartlist');
    // console.log(cartlist);
    for (let i = 0; i < cartlist.length; i++) {
      let iscartlist = cartlist[i].Selected;
      if (iscartlist == false) {
        cartlist.splice(i, 1)
      }
    }
    // console.log(cartlist);
    that.setData({
      cartlist: cartlist
    });
    console.log(that.data);
    that.productprice();
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
  // 选择支付方式及快递
  paychoose: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    that.setData({
      payactive: id
    })
  },
  distributionchoose: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    that.setData({
      distributionactive: id
    })
  },
  // 确认留言事件
  messagefun: function (e) {
    let that = this;
    let message = e.detail.value;
    that.setData({
      message: message
    })
  },
  // 提交订单
  submit: function () {
    let that = this;
    let chooseaddr = that.data.chooseaddr;
    let payactive = that.data.payactive;
    let distributionactive = that.data.distributionactive;
    if (chooseaddr == true && payactive != null && distributionactive != null) {
      let token = wx.getStorageSync('server_token');//返回的token值   
      if (token) {
        let addrlist = that.data.cartlist;//本地缓存购物车数据，减少服务器压力   
        let goodsJsonStr = "";
        let goodsleng = addrlist.length;
        // 整理创建订单所需参数
        for (let i = 0; i < goodsleng; i++) {
          let propertyChildIds = addrlist[i].propertyChildIds;
          console.log(propertyChildIds);
          console.log(typeof (propertyChildIds));
          goodsJsonStr += '{goodsId:' + addrlist[i].goodsId + ',number:' + addrlist[i].number + ',propertyChildIds:' +  propertyChildIds + ',logisticsType:0}';
          if (i < goodsleng - 1) {
             goodsJsonStr += ',';
           }
        };
         goodsJsonStr = "[" + goodsJsonStr + "]";
         goodsJsonStr = goodsJsonStr.toString();//goodsJsonStr转字符串
        console.log(typeof(goodsJsonStr));
        let creatorderurl = 'https://api.it120.cc/tzk1300/order/create?token=' + token + '&goodsJsonStr=' + goodsJsonStr;
        //  + token + '&address=' + that.data.addrlist.addr + '&mobile=' + that.data.addrlist.phone + '&goodsJsonStr=' + goodsJsonStr;
        console.log(creatorderurl);
        console.log(token);
        wx.request({
          url: creatorderurl,
          //data报缺少参数，未知原因
          data: {
            //  token: token,
             address: that.data.addrlist.addr,
             mobile: that.data.addrlist.phone,
            //  goodsJsonStr:goodsJsonStr
           },
          header: {
            "content-type": "application/json"
          },
          method:"POST",
          success: function (res) {
            console.log(res);
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function () {

          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '请先绑定手机',
          success: function () {
            wx.navigateTo({
              url: '/pages/binding/binding',
            })
          }
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请完善订单具体内容',
      })
    }
  },
  // 获得订单各项金额
  productprice: function () {
    let that = this;
    let cartlist = that.data.cartlist;
    let productprice = that.data.productprice;
    for (let i = 0; i < cartlist.length; i++) {
      productprice += cartlist[i].price * cartlist[i].number
    }
    let preferentialprice = that.data.preferentialprice;
    let freight = that.data.freight;
    let totalnum = that.data.totalnum;
    totalnum = productprice - preferentialprice + freight;
    that.setData({
      productprice: productprice,
      totalnum: totalnum
    })
  },
})