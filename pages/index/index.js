//index.js

Page({
  data: {
    banners: [],
    categories: [],
    activeCategoryId: 0,
    goods: []
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + 'tz' + '/banner/list',
      data: {
        key: 'mallName'
      },
      success: function (res) {
        // console.log(res);
        that.setData({
          banners: res.data.data
        })
      }
    }),

      wx.request({
        url: 'https://api.it120.cc/' + 'tz' + '/shop/goods/category/all',
        success: function (res) {
          var categories = [{ id: 0, name: "全部" }];
          for (var i = 0; i < res.data.data.length; i++) {
            categories.push(res.data.data[i]);
          }
          that.setData({
            categories: categories,
          })
          that.getGoodsList(0);
        }
      })

  },
  tabClick: function (e) {
    // console.log(e.currentTarget.id);
    this.setData({
      activeCategoryId: e.currentTarget.id
    })


  },
  getGoodsList: function (categoryId) {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + 'tz' + '/shop/goods/list',
      data: {
        categoryId: categoryId,
        nameLike: ''
      },
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          goods: res.data.data
        })
      }

    })
  }

})
