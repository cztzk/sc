// pages/preferential/preferential.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeid: 0,
    title: [
      {
        title: "代金券",
        id: 0,
        content: "代金券"
      },
      {
        title: "抽奖码",
        id: 1,
        content: "抽奖码"
      },
      {
        title: "奖品领取",
        id: 2,
        content: "奖品领取"
      }
    ]
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
  // 点击切换选修卡
  clicktab: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    that.setData({
      activeid: id
    })
  }
})