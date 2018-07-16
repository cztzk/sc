// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: null,//判断订单状态分类
    page: 1,//加载第几页订单
    nomore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let that = this;
    that.setData({
      status: id,
      page: 1
    })
    let status = that.data.status;
    // 订单状态，-1 已关闭 0 待支付 1 已支付待发货 2 已发货待确认 3 确认收货待评价 4 已评价 5 所有的订单
    that.getorderList(status);
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
    let that = this;
    let nomore = this.data.nomore;
    if (!nomore) {
      that.getmoreorder();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获得订单列表
  // 订单状态，-1 已关闭 0 待支付 1 已支付待发货 2 已发货待确认 3 确认收货待评价 4 已评价 5 所有的订单
  getorderList: function (status) {
    let that = this;
    let token = wx.getStorageSync('server_token');
    let data;
    if (status == 5) {
      data = {
        token: token,
        pageSize: 8
      };
    } else {
      data = {
        token: token,
        status: status,
        pageSize: 8
      };
    }
    wx.request({
      url: app.ajaxUrl.url_base + '/order/list',
      data: data,
      success: function (res) {
        // console.log(res);
        if (res.data.code==0){
          that.setData({
            orderList: res.data.data.orderList
          });
        }else{
          that.setData({
            nomore: true
          })
        }
         
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  // 加载更多订单数据
  getmoreorder: function () {
    let that = this;
    let page = that.data.page;
    ++page;
    let status = that.data.status;
    let token = wx.getStorageSync('server_token');
    let data;
    if (status == 5) {
      data = {
        token: token,
        pageSize: 8,
        page: page
      };
    } else {
      data = {
        token: token,
        status: status,
        pageSize: 8,
        page: page
      };
    }
    wx.request({
      url: app.ajaxUrl.url_base + '/order/list',
      data: data,
      success: function (res) {
        // console.log(res.data.data.orderList);
        let moreorder = res.data.data.orderList;
        let orderList = that.data.orderList.concat(moreorder);
        that.setData({
          orderList: orderList,
          page: page
        });
        if (res.data.data.orderList.length < 8) {
          that.setData({
            nomore: true
          });
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  todetail: function () {
    wx.showModal({
      title: '提示',
      content: '接口功能数据不全，待开发',
    })
  }
})