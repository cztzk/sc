// pages/addsaitu/addsaitu.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseimg: [],//选择的图片
    addnum: 0,//已选择的图片张数
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
  chooseimg: function () {
    let that = this;
    let chooseimg = that.data.chooseimg;
    let addnum = that.data.addnum;
    wx.chooseImage({
      count: 9 - addnum, // 默认9,减去已选择的张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
        // console.log(tempFilePaths);
        chooseimg = chooseimg.concat(tempFilePaths);
        // console.log(chooseimg);
        let leng = tempFilePaths.length + addnum;
        that.setData({
          chooseimg: chooseimg,
          addnum: leng
        })
      }
    })
  },
  // 删除图片
  detele: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let chooseimg = that.data.chooseimg;
    chooseimg.splice(id, 1);
    that.setData({
      chooseimg: chooseimg
    })
  },
  // 提交嗮图
  addsaitu: function () {
    let that=this;
    if (that.data.addnum!=0){
      var chooseimg = this.data.chooseimg;
      // that.uploadimg({
      //   url: 'https://........',
      //   //这里是你图片上传的接口,未有接口，
      //   path: chooseimg
      //   //这里是选取的图片的地址数组
      // });
      wx.showModal({
        title: '提示',
        content: '提交成功，未有接口',
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请选择图片',
      })
    }
   
  },
  //多张图片上传
  uploadimg: function (data) {
    var that = this,
    i = data.i ? data.i : 0,//当前上传的哪张图片
    success = data.success ? data.success : 0,//上传成功的个数
    fail = data.fail ? data.fail : 0;//上传失败的个数
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',//这里根据自己的实际情况改
      formData: null,//这里是上传图片时一起上传的数据
      success: (resp) => {
        success++;//图片上传成功，图片上传成功的变量+1
        console.log(resp)
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    });
  }
})