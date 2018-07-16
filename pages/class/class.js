// pages/class/class.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    wx.request({
      url: app.ajaxUrl.url_base + 'shop/goods/category/all',
      data: {

      },
      header: {
        "content-type": "application.json",
      },
      success(res) {
        // 将数据进行分类
        // console.log(res.data.data);
        let data = res.data.data//返回数据
        let leng = data.length;//数据长度
        let first = [];//一级分类
        let second = [];//二级分类
        // console.log(leng);
        // 将一级分类追加到一维数组
        for (let i = 0; i < leng; i++) {
          if (data[i].level == 1) {
            first.push(data[i]);
          }
        }
        let len = first.length;//一维数组长度
        let j;
        let num=[];//判断二维数组的具体下标
        // console.log(len);
        for (j = 0; j < len; j++) {
          second[j] = new Array;
          num[j]=0;
        }
        // console.log(second);
        // console.log(num);
        let sum;
        let index;
        for (let s = 0; s < leng; s++) {
          if (data[s].level != 1) {
            index = data[s].key;
            // console.log(index);
            sum = num[--index];
            // console.log(sum)
            second[index][sum] = data[s];
            num[index]++;
          }
        };
        // console.log(first);
         console.log(second);
        that.setData({
          first: first,
          second: second
        });
        // console.log(that.data);
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
  toclassfun:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/productlist/productlist?classid='+id,
    })
  }
})