// pages/like/like.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    morelike:true,
    page:1,//当前页码
    pageSize:8,//商品分页
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
    this.getlike();
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
    let token = wx.getStorageSync("server_token");
    if (token != "") {
      if (that.data.morelike==true){
        that.getmorelick();
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请绑定手机号',
        success: function () {
          wx.navigateTo({
            url: '/pages/binding/binding',
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 获得关注的商品信息
  getlike:function(){
    let that=this;
    let token = wx.getStorageSync("server_token");
    if (token != "") {
      wx.request({
        url: app.ajaxUrl.url_base + '/shop/goods/fav/list',
        data:{
          token:token,
          page: that.data.page,
          pageSize: that.data.pageSize,       
        },
        header:{
          "content-type":"application/json"
        },
        success:function(res){
          // console.log(res.data.data);
          let hotlist = res.data.data;
          that.setData({
            hotlist: hotlist,
          })
          let leng = res.data.data.length;//没有更多数据
          let pageSize = that.data.pageSize;
          if (leng < pageSize) {
            that.setData({
              morelike: false
            })
          }
        },
        fail:function(res){
          console.log(res);
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请绑定手机号',
        success: function () {
          wx.navigateTo({
            url: '/pages/binding/binding',
          })
        }
      })
    }
  },
  // 加载更多商品信息
  getmorelick:function(){
    let that=this;
    let token = wx.getStorageSync("server_token");
    let page=++that.data.page;
    console.log(page);
    wx.request({
      url: app.ajaxUrl.url_base + '/shop/goods/fav/list',
      data: {
        token: token,
        page: page,
        pageSize: that.data.pageSize
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res.data.data);
        let hotlist = that.data.hotlist;
        hotlist=hotlist.concat(res.data.data);
        that.setData({
          hotlist: hotlist,
          page:page
        })
        let leng= res.data.data.length;//没有更多数据
        let pageSize = that.data.pageSize;
        if (leng < pageSize){
          that.setData({
            morelike:false
          })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})