// pages/binding/binding.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: true,//是否为登录页面
    mername: "用户注册",
    bindmsg: "绑定手机获取更多优惠",
    phone: "13500000000",//表单相关数据
    password: "",//表单相关数据
    nick: "",//表单相关数据
    msg: "",//表单相关数据
    check: false,//是否通过验证,
    err:false,
    errmsg:"错误信息"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: that.data.mername//页面标题为路由参数
    })
    let token = wx.getStorageSync('server_token');//返回的token值
    if (token !=""){
      wx.showToast({
        title: '已登录,返回首页',
        duration: 2000,
        success:function(){
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/index/index',
            })
          },2000)
        }
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
  //验证通过时的按钮的状态
  Verification: function () {
    let that = this;
    let login = that.data.login;
    let phone = that.data.phone;
    let password = that.data.password;
    let nick = that.data.nick;
    let msg = that.data.msg;
    if (login) {
      // console.log("注册页面"); 
      if (phone!=""  && password!=""  && nick!=""  && msg!="" ) {
        that.setData({
          check: true
        })
        // console.log(that.data);
      }
    } else {
      // console.log("登录页面");
      if (phone != "" && password != "" ) {
        that.setData({
          check: true
        })
        // console.log(that.data);
      }
    }
  },
  // 获取验证码
  getmsg: function () {
    wx.showModal({
      title: '验证码',
      content: '功能开发中，请随机输入四位数字',
    })
  },
  // 表单验证事件
  phonefun: function (e) {
    let that = this;
    let phone = e.detail.value;
    // console.log(phone);1
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phone)) {
      that.setData({
        errmsg: '请输入正确的手机号',
        err: true,
        phone: "13500000000",//表单相关数据
      });
    } else {
      that.setData({
        phone: phone,
        err: false,
      });
      that.Verification();
    }
  },
  passfun: function (e) {
    let that = this;
    let password = e.detail.value;
    // console.log(password);
    let myreg = /^(\w){6,20}$/;
    if (!myreg.test(password)) {
      that.setData({
        errmsg: '请输入6-20个字母、数字、下划线',
        err:true,
        password: "",//表单相关数据
      });
    } else {
      that.setData({
        password: password,
        err: false,
      });
      that.Verification();
    }
  },
  nickfun: function (e) {
    let that = this;
    let nick = e.detail.value;
    // console.log(nick);
    if (!nick) { // "",null,undefined,NaN
      // console.log("为空");
      that.setData({
        errmsg: '昵称不能为空',
        err: true,
        nick: "",//表单相关数据
      });
    } else {
      that.setData({
        nick: nick,
        err: false,
      });
      that.Verification();
    }
  },
  msgfun: function (e) {
    let that = this;
    let msg = e.detail.value;
    // console.log(msg);
    let myreg = /^[0-9]{4}$/;
    if (!myreg.test(msg)) {
      that.setData({
        errmsg: '请输入正确的验证码',
        err: true,
        msg: "",//表单相关数据
      });       
    } else {
      that.setData({
        msg: msg,
        err: false,
      });
      that.Verification();
    }
  },
  // 切换登录注册按钮事件
  tologin: function () {
    let that = this;
    that.setData({
      login: false,
      check: false,
      phone: "13500000000",
      password: "",
      nick: "",
      msg: "",
      err: false,
      mername:"用户登录"      
    })
    // console.log(that.data);
  },
  toregistered: function () {
    let that = this;
    that.setData({
      login: true,
      check: false,
      phone: "13500000000",
      password: "",
      nick: "",
      msg: "",
      err: false,
      mername: "用户注册"            
    })
    // console.log(that.data);

  },
  // 登录事件
  login: function () {
    let that = this;
    let check = that.data.check;
    if (check) {
      let pass = that.data.password;
      console.log(pass);
      wx.request({
        url: app.ajaxUrl.url_base + '/user/m/login',
        data: {
          mobile: 13500000000,
          pwd: pass,
          deviceId: 1,
          deviceName: 2
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data.data);
          var nowTime = new Date();
          wx.setStorageSync('server_token', res.data.data.token);
          wx.setStorageSync('server_token_expire', nowTime);
          // 手机绑定状态设置
          wx.setStorageSync('bind_id', res.data.data.uid);
          wx.switchTab({
            url: '/pages/user/user',
          })
          // console.log("已登录")
        }
      })
    }
  },
  // 注册事件
  registered: function () {
    let that = this;
    let check = that.data.check;
    if (check) {
      let pass = that.data.password;
      let msg = that.data.msg;
      let nick = that.data.nick;
      wx.request({
        url: app.ajaxUrl.url_base + '/user/m/register',
        data: {
          mobile: 13500000000,
          pwd: pass,
          code: msg,
          nick: nick
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          let code = res.data.code;
          // console.log(res.data.code);
          // console.log(res);
          if (code == 0) {
            wx.showModal({
              title: '提示',
              content: '注册成功',
            })
            that.setData({
              login: false,
              phone: "",
              password: "",
              nick: "",
              msg: "",
              chech:false
            })
          }

        }
      })
    }
  },
 
})