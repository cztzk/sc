// pages/productlist/productlist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navsum: 0,
    productbtn: [
      {
        title: '所有',
        id: 0
      },
      {
        title: '推荐',
        id: 1
      },
      {
        title: '销量升序',
        id: 2
      },
      {
        title: '销量降序',
        id: 3
      }
    ],
    page: 1,
    nomore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '正在加载' });
    var that = this;
    let all = {
      page: 1,
      pageSize: 6
    };
    that.getdata(all);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(function () {
      wx.hideLoading({ title: '正在加载' });
    }, 2000)
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
      that.getmore();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 导航条点击事件
  navClick: function (e) {
    var that = this;
    let id = e.currentTarget.dataset.id;
    // console.log(id);
    this.setData({
      navsum: id,
      nomore: false
    });
    // orderBy排序规则
    // priceUp 商品升序，priceDown 商品倒序，ordersUp 销量升序，ordersDown 销量降序
    // recommendStatus	int	推荐状态：不传该参数获取所有商品；0为一般商品；1为推荐商品
    switch (id) {
      case 0:
        let all = {
          page: 1,
          pageSize: 6
        };
        that.getdata(all);
        break;
      case 1:
        let tui = {
          page: 1,
          pageSize: 6,
          recommendStatus: 1
        };
        that.getdata(tui);
        break;
      case 2:
        let up = {
          page: 1,
          pageSize: 6,
          orderBy: "ordersUp"
        };
        that.getdata(up);
        break;
      default:
        let down = {
          page: 1,
          pageSize: 6,
          orderBy: "ordersDown"
        };
        that.getdata(down);
    }
  },
  // 获得产品参数
  getdata: function (data) {
    var that = this;
    wx.request({
      url: app.ajaxUrl.url_base + 'shop/goods/list',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data.code);
        if (res.data.code == 0) {
          that.setData({
            hotlist: res.data.data,
            page: 1
            // hotleng: res.data.data.length
          })
        } else {
          //  console.log(404);
          that.setData({
            nomore: true
          })
        }
        //  console.log(that.data.hot.length);
      }
    })
  },
  getmore: function () {
    let that = this;
    let sum = that.data.navsum;
    // console.log(sum);
    switch (sum) {
      case 0:
        var moredata = {
          page: that.data.page,
          pageSize: 6
        };
        break;
      case 1:
        var moredata = {
          page: that.data.page,
          pageSize: 6,
          recommendStatus: 1
        };
        break;
      case 2:
        var moredata = {
          page: that.data.page,
          pageSize: 6,
          orderBy: "ordersUp"
        };
        break;
      default:
        var moredata = {
          page: that.data.page,
          pageSize: 6,
          orderBy: "ordersDown"
        };
    }
    // console.log(moredata);
    ++moredata.page;
    that.setData({
      page: moredata.page
    })
    // console.log(moredata);
    wx.showLoading({ title: '加载数据中' });
    wx.request({
      url: app.ajaxUrl.url_base + 'shop/goods/list',
      data: moredata,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code != 404) {
          // console.log(res.data.data);
          let newslist = res.data.data;
          var list = that.data.hotlist.concat(newslist);
          // console.log(list);
          that.setData({
            hotlist: list
          })
        } else {
          //  console.log(404);
          that.setData({
            nomore: true
          })
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function () {
        setTimeout(function () {
          wx.hideLoading();
        }, 1000)
      }
    })
  }
})