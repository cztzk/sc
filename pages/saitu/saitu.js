// pages/saitu/saitu.js
// 在需要使用的js文件中，导入js  
var util = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 未有接口模拟数据
    ispraise: false,//判断是否点赞
    saitu: [
      {
        img: "../../images/sasitu.jpg",
        date: "2018-01-02",
        praise: 21,
        comment: [
          {
            cont: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
            name: "k",
            date: "2018/05/11 15:14:08"
          },
          {
            cont: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
            name: "k",
            date: "2018/05/11 15:14:08"
          },
          {
            cont: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
            name: "k",
            date: "2018/05/11 15:14:08"
          },
          {
            cont: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
            name: "k",
            date: "2018/05/11 15:14:08"
          },
        ],
        ispraise: false,
        iscomment:false
      },
      {
        img: "../../images/sasitu.jpg",
        date: "2018-01-02",
        praise: 11,
        comment: [
          {
            cont: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
            name: "k",
            date: "22018/05/11 15:14:08"
          },
          {
            cont: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
            name: "k",
            date: "2018/05/11 15:14:08"
          },
          {
            cont: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
            name: "k",
            date: "2018/05/11 15:14:08"
          },
        ],
        ispraise: false,
        iscomment: false
      }
    ],
    msg: [],//留言信息
    ispraise: [],//判断是否点赞
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: res => {
        // console.log(res);
        this.setData({
          userInfo: res.userInfo,
        })
      },
      fail: res => {
        console.log(res);
      }
    })
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
  //提交留言
  msgfun: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let cont = "msg[" + id + "]";
    let msg = e.detail.value;
    that.setData({
      [cont]: msg
    })
    // console.log(that.data.msg);
  },
  submit: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    if (that.data.msg[id]) {
      let name = that.data.userInfo.nickName;
      let nowTime = util.formatTime(new Date());//现在时间，
      // util.js将日期格式化
      let msg = {
        cont: that.data.msg[id],
        name: name,
        date: nowTime
      };
      console.log(msg);
      if (msg) {
        let cont = that.data.saitu[id].comment;
        let msgs = "saitu[" + id + "].comment";
        let conts = cont.concat(msg)
        that.setData({
          [msgs]: conts,
        })
        console.log(that.data.saitu[id]);
      }
    }
  },
  
  // 显示评论
  commentfun: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let iscomment =!that.data.saitu[id].iscomment;
    console.log(iscomment);
    let comment = "saitu[" + id + "].iscomment";
    that.setData({
      [comment]: iscomment
    })
    console.log(that.data.saitu[id])
  },
  // 点赞功能
  praisefun: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let ispraise = that.data.saitu[id].ispraise;
    let praise = that.data.saitu[id].praise;
    if (ispraise) {
      --praise;
    } else {
      ++praise;
    }
    let cont = "saitu[" + id + "].praise";
    let isispraises = "saitu[" + id + "].ispraise";
    that.setData({
      [cont]: praise,
      [isispraises]: !ispraise
    })
  }
})