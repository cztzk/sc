// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargetitle: "请选择您的充值金额",
    money: 0,
    disabled: true,
    rechargelist: [
      {
        info: '充值100元',
        song: "送100元",
        money: 100
      },
      {
        info: '充值200元',
        song: "送200元",
        money: 200
      },
      {
        info: '充值300元',
        song: "送300元",
        money: 300
      },
      {
        info: '充值400元',
        song: "送400元",
        money: 400
      },
      {
        info: '充值500元',
        song: "送500元",
        money: 500
      },
      {
        info: '充值600元',
        song: "送600元",
        money: 500
      },
      {
        info: '充值700元',
        song: "送700元",
        money: 700
      },
      {
        info: '充值800元',
        song: "送800元",
        money: 800
      }
    ],
    radio: [
      {
        value: '我已经阅读活动规则，知晓充值金额不可提现、退款',
        name: 'true'
      }
    ],
    chooseindex: null,
    buttonclick: false,
    explain: {
      title: "活动规则：",
      info: [
        {
          cont: "充值成功后，您的充值金额及赠送金额将会实时进入您的账户。"
        },
        {
          cont: "在活动期间，不限充值次数，可累计充值，多充多送。"
        },
        {
          cont: "充值金额仅可通过您的个人账户购买商品，不可提现、退款及转赠。"
        },
        {
          cont: "使用充值金额购物的订单，按普通商品退货规则办理退换货，退换货订单产生的退款将返回账户余额。"
        },
        {
          cont: "余额有效日期：永久有效。"
        },
        {
          cont: "分销商不参与充值赠送活动。"
        }
      ]
    }
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
  // 选择金额
  choosefun: function (e) {
    let money = e.currentTarget.dataset.money;
    let chooseindex = e.currentTarget.dataset.index;
    // console.log(money);
    if (money != 0) {
      this.setData({
        money: money,
        disabled: false,
        chooseindex: chooseindex
      })
    }
  },
  // 同意规则
  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      buttonclick: e.detail.value
    })
  },
  // 支付
  payfun: function () {
    let buttonclick = this.data.buttonclick;
    // console.log(buttonclick);
    if (buttonclick) {
      wx.showModal({
        title: '提示',
        content: '功能完善中，稍候',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请选择充值金额及同意活动规则',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})