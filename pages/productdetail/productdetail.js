// pages/productdetail/productdetail.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    chooseinfo: "请选择:颜色/尺寸",
    detailbtn1: {
      title: '全部产品',
      url: 'allproduct'
    },
    detailbtn2: {
      title: '回到首页',
      url: 'index'
    },
    footercartbtn: '加入购物车',
    maskchooseinfo: '请选择：',
    propertiessum: {},
    propertiesdata: {},
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    maxusStatus: 'normal',
    detailmaskboxactive: false,
    join: false,
    propertyChildIds: [],//创建订单时的尺寸
    numberFav:0,//是否喜欢
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获得产品id发送请求
    let that = this;
    // console.log(options.id);
    that.setData({
      id: options.id
    })
    that.getDetail();
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
  // 获得产品详情
  getDetail: function () {
    let that = this;
    let id = that.data.id;
    // console.log(id);
    wx.request({
      url: app.ajaxUrl.url_base + 'shop/goods/detail',
      data: {
        id: id
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        // console.log(res.data.data);
        let leng = res.data.data.properties.length;
        let numberFav = res.data.data.basicInfo.numberFav;
        let propertiesdata = [];
        for (let i = 0; i < leng; i++) {
          propertiesdata[i] = res.data.data.properties[i].name;
        }
        // console.log(propertiesdata);
        that.setData({
          info: res.data.data,
          properties: res.data.data.properties,
          length: leng,
          propertiesdata: propertiesdata,
          numberFav: numberFav
        })
        // console.log(that.data.numberFav);
        // console.log(res.data.data.properties);
        // wxparse插件
        let content = res.data.data.content;
        // console.log(content);
        WxParse.wxParse('detail', 'html', content, that, 5);
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  maskclick: function () {
    this.setData({
      detailmaskboxactive: true
    })
  },
  closefun: function () {
    this.setData({
      detailmaskboxactive: false
    })
  },
  tocart: function () {
    let that = this;
    let join = this.data.join;
    if (join) {
      // 添加购物车事件
      let token = wx.getStorageSync('server_token');
      if (token) {
        let cartlist = wx.getStorageSync('cartlist');;
        let propertyChildIds = that.data.propertyChildIds;
        let length = that.data.length * 2;
        let propertyChildIdsstr = propertyChildIds.join(",");
        //减少服务器压力，改为本地缓存
        let propertyChildIdlist = {
          goodsId: that.data.id,
          number: that.data.num,
          propertyChildIds: propertyChildIdsstr,
          logisticsType: 0,
          shopname: that.data.info.basicInfo.name,
          shopimg: that.data.info.basicInfo.pic,
          price: that.data.info.basicInfo.minPrice,
          propertiesdata: that.data.propertiesdata,
          Selected: true
        };
        // console.log(cartlist);
        let index = cartlist.length;
        // 判断是否重复加入购物车
        for (let i = 0; i < index; i++) {
          if (cartlist[i].goodsId == propertyChildIdlist.goodsId) {
            // console.log("同一个产品");
            if (cartlist[i].propertyChildIds == propertyChildIdlist.propertyChildIds) {
              // console.log("同一个规格");
              wx.showModal({
                title: '提示',
                content: '已加入购物车,去购物车页面查看',
                success: function (res) {
                  wx.switchTab({
                    url: '/pages/cart/cart',
                  })
                },
                fail: function (res) {
                  console.log(res);
                }
              })
              return false;
            }
          }
        }
        cartlist[index] = propertyChildIdlist;
        wx.setStorageSync("cartlist", cartlist)
        console.log(cartlist);
        // console.log(goodsJsonStr);
        // console.log(that.data);
        wx.switchTab({
          url: '../cart/cart'
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '请绑定手机号',
          success: function (res) {
            wx.navigateTo({
              url: '/pages/binding/binding',
            })
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }

    } else {
      this.setData({
        detailmaskboxactive: true
      })
    }
  },
  toindex: function () {
    wx.switchTab({
      url: '../index/index'
    });
  },
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    let max = this.data.info.basicInfo.stores;
    let maxusStatus;
    let minusStatus;
    if (num + 1 >= max) {
      // 不得大于库存数
      maxusStatus = "disabled";
      num = max;
    } else {
      // 不作过多考虑自增1  
      num++;
      // 只有大于一件的时候，才能normal状态，否则disable状态  
      maxusStatus = num < 1 ? 'disabled' : 'normal';
      minusStatus = num < 1 ? 'disabled' : 'normal';
    }
    // console.log(maxusStatus);
    // 将数值与状态写回  
    this.setData({
      num: num,
      maxusStatus: maxusStatus,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 不得大于库存数
    let max = this.data.info.basicInfo.stores;
    let minusStatus = "normal";
    let maxusStatus;
    // console.log(max)
    if (num > max) {
      // 不得大于库存数
      num = 1;
      // console.log(num);
      maxusStatus = "normal";
      minusStatus = "disabled";
    } else {
      if (num <= 1) {
        num = 1;
        maxusStatus = "normal";
        minusStatus = "disabled";
      } else {
        maxusStatus = "normal";
        minusStatus = "normal";
      }
    }
    // console.log(minusStatus);
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus,
      maxusStatus: maxusStatus
    });
  },
  confirmfun: function () {
    let leng = this.data.properties.length;
    let len = this.data.propertiessum.length;
    // console.log(this.data.properties);
    // console.log(this.data.propertiessum);
    let detailmaskboxactive;
    let join;
    if (leng == len) {
      join = true;
      detailmaskboxactive = false;
    } else {
      join = false;
      detailmaskboxactive = true;
      wx.showModal({
        title: '提示',
        content: '请选择对应产品',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }
        }
      })
    }
    this.setData({
      join: join,
      detailmaskboxactive: detailmaskboxactive
    })
  },
  // 产品选择
  propertiesfun: function (e) {
    let that = this;
    // 修改propertiessum的值改变产品参数的状态
    let row = e.currentTarget.dataset.row;
    let col = e.currentTarget.dataset.col;
    let cont = e.currentTarget.dataset.cont;
    // console.log(row);
    // console.log(col);
    // console.log(cont);
    let propertiessum = 'propertiessum[' + row + ']';
    let propertiesdata = 'propertiesdata[' + row + ']';
    that.setData({
      [propertiessum]: col,
      [propertiesdata]: cont,
    })
    let leng = that.data.properties.length;
    let len = that.data.propertiessum.length;
    // console.log(leng);
    // console.log(len);
    let maskchooseinfo;
    let join;
    if (leng == len) {
      maskchooseinfo = "已选择："
    } else {
      maskchooseinfo = "请选择："
    }
    // 追加尺寸规格
    let propertyid = e.currentTarget.dataset.propertyid;
    let propertyids = e.currentTarget.dataset.propertyids;
    let propertyChildIds = that.data.propertyChildIds;
    // console.log(propertyid);
    // console.log(propertyChildIds.indexOf(propertyid));
    if (propertyChildIds.indexOf(propertyid) == -1) {
      propertyChildIds.push(propertyid);
      propertyChildIds.push(propertyids);
    } else {
      let index = propertyChildIds.indexOf(propertyid);
      propertyChildIds[++index] = propertyids;
    }
    // console.log(propertyChildIds);
    that.setData({
      maskchooseinfo: maskchooseinfo,
      propertyChildIds: propertyChildIds
    })
    // console.log(that.data.propertyChildIds);
  },
  //添加到喜欢列表
  lickfun:function(){
    let that=this;
    let token = wx.getStorageSync('server_token');
    if (token!=""){
      let goodid=that.data.id;
      let numberFav = that.data.numberFav;
      if (numberFav==0){
        wx.request({
          url: app.ajaxUrl.url_base + 'shop/goods/fav/add',
          data:{
            token: token,
            goodsId: goodid
          },
          header:{
            "content-type":"appliaction/json"
          },
          success:function(res){
            // console.log(res);
            that.setData({
              numberFav:1
            })
          },
          fail:function(res){
            console.log(res)
          }
        })
      }else{
        wx.request({
          url: app.ajaxUrl.url_base + 'shop/goods/fav/delete',
          data: {
            token: token,
            goodsId: goodid
          },
          header: {
            "content-type": "appliaction/json"
          },
          success: function (res) {
            // console.log(res);
            that.setData({
              numberFav: 0
            })
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    }else{
      wx.showModal({
        title: '提示',
        content: '请绑定手机号',
        success:function(){
          wx.navigateTo({
            url: '/pages/binding/binding',
          })
        }
      })
    }
  }

})