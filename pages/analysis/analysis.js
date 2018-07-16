// pages/analysis/analysis.js
const util = require('../../utils/util.js')

Page({
  data: {
    list: [
      {
        flag: true,
        groupName: 'CAPS(点击我展开)',
        friends: [
          '异常1',
          '异常2',
          '异常3'
        ]
      }, {
        flag: true,
        groupName: '分类2(点击我展开)',
        friends: [
          '异常1',
          '异常2',
          '异常3'
        ]
      }, {
        flag: true,
        groupName: '分类3(点击我展开)',
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
  }

})
