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
     console.log('页面显示了');
     var that = this;
     wx.getStorage({
       key: 'meslist',
       success: function (res) {
         console.log(res.data)
         that.setData({
           meslist: res.data
         })
       }
     })

   }
})
