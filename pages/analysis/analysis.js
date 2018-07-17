//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    sum:"2",
    point:"70",
    list: [
      {
        flag: true,
        groupName: 'CAPS(点我展开)',
        friends: [
          '异常1',
          '异常2',
          '异常3'
        ]
      }, {
        flag: true,
        groupName: '分类2(点我展开)',
        friends: [
          '异常1',
          '异常2',
          '异常3'
        ]
      }, {
        flag: true,
        groupName: '分类3(点我展开)',
        friends: [
          '异常1',
          '异常2'
        ]
      }
    ]
  },

  onTapGroup: function (e) {
    var list = this.data.list;
    var row = list[e.currentTarget.dataset.index];
    row.flag = !row.flag;
    this.setData({
      list: list
    })
  },

bindFocus: function(){
  wx.navigateTo({
    url: '../analysis-history/analysis-history'
  })
}



})
