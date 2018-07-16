const app = getApp()
Page({
  data: {
    province: [],//获取到的所有的省
    city: [],//选择的该省的所有市
    area: [],//选择的该市的所有区县
    province_index: 0,//picker-view省项选择的value值
    city_index: 0,//picker-view市项选择的value值
    area_index: 0,//picker-view区县项选择的value值
    provincecity: null,//取到该数据的所有省市区数据
    choose: {},//最后取到的省市区名字
    animationData: {},
    name:"",//姓名
    phone:"",//手机号
    addr:"",//地址
    errmsg:"错误信息",//错误信息
    err:true,//是否输入错误
  },
  //点击事件，点击弹出选择页
  clickfun: function () {
    //这里写了一个动画，让其高度变为满屏
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.height(100 + 'vh').step()
    this.setData({
      animationData: animation.export()
    })

  },
  //取消按钮
  quxiao: function () {
    //这里也是动画，然其高度变为0
    let that=this;
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    that.animation = animation
    animation.height(0 + 'rpx').step()
    that.setData({
      animationData: animation.export()
    });
    //取消不传值，这里就把choose 的值赋值为初值
    let province = that.data.province;
    let city = that.data.city;
    let area = that.data.area;
    let choose = {
      province: province[0],
      city: city[0],
      area: area[0]
    };
    that.setData({
      choose: choose,
      province_index: 0,
      city_index: 0,
      area_index: 0   
    });
    console.log(that.data);
  },
  //确认按钮
  queren: function () {
    //一样是动画，级联选择页消失，效果和取消一样
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.height(0 + 'rpx').step()
    this.setData({
      animationData: animation.export()
    });
    //打印最后选取的结果
    // console.log(this.data.choose);
  },
  //滚动选择的时候触发事件
  bindChange: function (e) {
    //这里是获取picker-view内的picker-view-column 当前选择的是第几项

    const val = e.detail.value
    this.setData({
      province_index: val[0],
      city_index: val[1],
      area_index: val[2]
    })
    this.judge();
    // console.log(val);

    // console.log(this.data.choose);
  },
  //这里是判断省市名称的显示
  judge: function () {
    var that = this,
      provincecity = that.data.provincecity,
      province = [],
      city = [],
      area = [],
      area_index = that.data.area_index,
      city_index = that.data.city_index,
      province_index = that.data.province_index;
    //遍历所有的省，将省的名字存到province这个数组中
    for (let i = 0; i < provincecity.length; i++) {
      province.push(provincecity[i].name)
    }

    if (provincecity[province_index].regions) {//这里判断这个省级里面有没有市（如数据中的香港、澳门等就没有写市）
      if (provincecity[province_index].regions[city_index]) {//这里是判断这个选择的省里面，有没有相应的下标为city_index的市，因为这里的下标是前一次选择后的下标，比如之前选择的一个省有10个市，我刚好滑到了第十个市，现在又重新选择了省，但是这个省最多只有5个市，但是这时候的city_index为9，而这里的市根本没有那么多，所以会报错
        //这里如果有这个市，那么把选中的这个省中的所有的市的名字保存到city这个数组中
        for (let i = 0; i < provincecity[province_index].regions.length; i++) {
          city.push(provincecity[province_index].regions[i].name);
        }
        // console.log('执行了区级判断');

        if (provincecity[province_index].regions[city_index].regions) {//这里是判断选择的这个市在数据里面有没有区县
          if (provincecity[province_index].regions[city_index].regions[area_index]) {//这里是判断选择的这个市里有没有下标为area_index的区县，道理同上面市的选择
            // console.log('这里判断有没有进区里');
            //有的话，把选择的这个市里面的所有的区县名字保存到area这个数组中
            for (let i = 0; i < provincecity[province_index].regions[city_index].regions.length; i++) {
              // console.log('这里是写区得');
              area.push(provincecity[province_index].regions[city_index].regions[i].name);
            }
          } else {
            //这里和选择市的道理一样
            that.setData({
              area_index: 0
            });
            for (let i = 0; i < provincecity[province_index].regions[city_index].regions.length; i++) {
              area.push(provincecity[province_index].regions[city_index].regions[i].name);
            }
          }
        } else {
          //如果这个市里面没有区县，那么把这个市的名字就赋值给area这个数组
          area.push(provincecity[province_index].regions[city_index].name);
        }
      } else {
        //如果选择的省里面没有下标为city_index的市，那么把这个下标的值赋值为0；然后再把选中的该省的所有的市的名字放到city这个数组中
        that.setData({
          city_index: 0
        });
        for (let i = 0; i < provincecity[province_index].regions.length; i++) {
          city.push(provincecity[province_index].regions[i].name);
        }

      }
    } else {
      //如果该省级没有市，那么就把省的名字作为市和区的名字
      city.push(provincecity[province_index].name);
      area.push(provincecity[province_index].name);
    }

    // console.log(province);
    // console.log(city);
    // console.log(area);
    //选择成功后把相应的数组赋值给相应的变量
    that.setData({
      province: province,
      city: city,
      area: area
    });
    //有时候网络慢，会出现区县选择出现空白，这里是如果出现空白那么执行一次回调
    if (province.length == 0 || city.length == 0 || area.length == 0) {
      that.judge();
      // console.log('这里执行了回调');
      // console.log();
    }
    // console.log(province[that.data.province_index]);
    // console.log(city[that.data.city_index]);
    // console.log(area[that.data.area_index]);
    //把选择的省市区都放到choose中
    let choose = {
      province: province[that.data.province_index],
      city: city[that.data.city_index],
      area: area[that.data.area_index]
    };

    that.setData({
      choose: choose
    });

  },
  onLoad: function () {
    var that = this;
    //请求省市区的数据
    wx.request({
      url: app.ajaxUrl.url_base + 'json/list',
      data: {
        type: "addr"
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          provincecity: res.data.data[0].jsonData.regions
        });
        // console.log(that.data);
        that.judge();
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  // 验证事件
  checkfun: function (value, key, myreg, errmsg){
    let that=this;
    // console.log(key);
    if (!myreg.test(value)) {
      that.setData({
        errmsg: errmsg,
        err: false,
        [key]:""
      });
    } else {
      that.setData({
        [key]: value,
        err: true,
      });
    }
    console.log(that.data)
  },
  checkname:function(e){
    let value = e.detail.value;
    let myreg = /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/g;
    let errmsg = '请输入正确的姓名';
    let name = "name";
    this.checkfun(value, name, myreg, errmsg);
  },
  checkphone: function (e) {
    let value = e.detail.value;
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    let errmsg = '请输入正确的手机号';
    let phone = "phone";
    this.checkfun(value, phone, myreg, errmsg);
  },
  checkaddr: function (e) {
    let value = e.detail.value;
    let myreg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/g;
    let errmsg = '请输入正确的地址';
    let addr = "addr";
    this.checkfun(value, addr, myreg, errmsg);
  },
  saveaddrfun: function (e) {
    let that=this;
    let name = that.data.name;
    let phone = that.data.phone;
    let addr = that.data.addr;
    if (name != "" && phone!=null && addr !=""){
      let addrlist={
        name: name,
        phone: phone,
        addr: addr,
        area: that.data.choose.area,
        city: that.data.choose.city,
        province: that.data.choose.province,
      }
      // 13006729371
      console.log(addrlist);
      wx.setStorageSync("addrlist", addrlist);
      wx.navigateTo({
        url: '/pages/settlement/settlement',
      })
    }else{ 
      console.log(222);
    }
  }
})