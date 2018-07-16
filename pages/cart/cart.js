// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noproduct: true,
    max: 20,//模拟最大库存数为20
    footerSelected: false,
    totalnum: 0.00,
    selectnum: 0,//已选中的商品
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
    let cartlist = wx.getStorageSync('cartlist');
    that.setData({
      cartlist: cartlist
    });
    let leng = cartlist.length;
    let selectnum = 0;
    if (leng != 0) {
      for (let i = 0; i < leng; i++) {
        if (cartlist[i].Selected == true) {
          ++selectnum;
        }
      }
      that.setData({
        noproduct: false,
        selectnum: selectnum
      });
    } else {
      that.setData({
        noproduct: true
      });
    }
    that.totalnum();
    that.onloadallselect();
    // console.log(that.data.cartlist);
    // console.log(that.data.noproduct);

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
  // 修改产品状态
  selectfun: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    // console.log(index);
    let Selected = "cartlist[" + index + "].Selected";
    let isSelected = !that.data.cartlist[index].Selected;
    // console.log(Selected);
    // console.log(isSelected);
    let selectnum = that.data.selectnum;
    selectnum = isSelected ? ++selectnum : --selectnum;
    // console.log(selectnum);
    selectnum = selectnum <= 0 ? 0 : selectnum;
    // console.log(selectnum);
    that.setData({
      [Selected]: isSelected,
      selectnum: selectnum
    });
    that.totalnum();
    //修改本地缓存
    let cartlist = that.data.cartlist;
    let leng = that.data.cartlist.length;
    for (let i = 0; i < leng; i++) {
      if (cartlist[i].Selected == false) {
        that.setData({
          footerSelected: false
        });
        return false
      }
      that.setData({
        footerSelected: true
      });
    }
    wx.setStorageSync('cartlist', cartlist);
  },
  // 数量减少
  bindMinus: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let number = "cartlist[" + index + "].number";
    let num = that.data.cartlist[index].number;
    if (num != 1) {
      --num;
      // console.log(num);
      that.setData({
        [number]: num
      })
      //修改本地缓存
      let cartlist = that.data.cartlist;
      wx.setStorageSync('cartlist', cartlist);
      that.totalnum();
    }
  },
  // 数量增加
  bindPlus: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let number = "cartlist[" + index + "].number";
    let num = that.data.cartlist[index].number;
    let max = that.data.max;
    if (num < max) {
      ++num;
      // console.log(num);
      that.setData({
        [number]: num
      })
      //修改本地缓存
      let cartlist = that.data.cartlist;
      wx.setStorageSync('cartlist', cartlist);
      that.totalnum();
    }
  },
  // 删除事件
  detelefun: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let cartlist = that.data.cartlist;
    let isselect = cartlist[index].Selected;
    let selectnum = that.data.selectnum;
    if (isselect == true) {
      --selectnum;
    }
    console.log(selectnum)
    cartlist.splice(index, 1)
    let leng = that.data.cartlist.length;
    // console.log(leng);
    if (leng == 0) {
      that.setData({
        noproduct: true
      });
    }

    //修改本地缓存
    that.setData({
      cartlist: cartlist,
      selectnum: selectnum
    });
    that.totalnum();
    wx.setStorageSync('cartlist', cartlist);
  },
  // 判断第一次加载时是否全选
  onloadallselect: function () {
    let that = this;
    let cartlist = that.data.cartlist;
    let leng = that.data.cartlist.length;
    let footerSelected = that.data.footerSelected;
    for(let i=0;i<leng;i++){
      if (cartlist[i].Selected == false){
        that.setData({
          footerSelected:false
        })
        break;
      }
      that.setData({
        footerSelected: true
      })
    }
  },
  // 全选和取消全选
  allselectfun: function () {
    let that = this;
    let cartlist = that.data.cartlist;
    let leng = that.data.cartlist.length;
    let footerSelected = that.data.footerSelected;
    --selectnum;
    for (let i = 0; i < leng; i++) {
      cartlist[i].Selected = !footerSelected;
    }
    let selectnum = that.data.selectnum;
    selectnum = footerSelected ? 0 : leng;
    // console.log(selectnum);
    that.setData({
      cartlist: cartlist,
      footerSelected: !footerSelected,
      selectnum: selectnum,
    });
    that.totalnum();
    wx.setStorageSync('cartlist', cartlist);
    console.log(that.data.cartlist);
  },
  // 计算总价
  totalnum: function () {
    let that = this;
    let cartlist = that.data.cartlist;
    let leng = that.data.cartlist.length;
    let totalnum = 0;
    for (let i = 0; i < leng; i++) {
      if (cartlist[i].Selected == true) {
        totalnum += cartlist[i].number * cartlist[i].price;
      }
    }
    that.setData({
      totalnum: totalnum
    })
  },
  toorder: function () {
    let that = this;
    let selectnum = that.data.selectnum;
    if (selectnum == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择至少一项产品',
      })
    } else {
      let cartlist = that.data.cartlist;
      wx.setStorageSync('cartlist', cartlist);
      wx.navigateTo({
        url: '/pages/settlement/settlement',
      })
    }
  },
})