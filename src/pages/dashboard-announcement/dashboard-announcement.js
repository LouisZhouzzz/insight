const service = require('../../service/test');

Page({
  data: {
    content: [
      {
        date: "2018.08.01",
        details: ['修复 小程序使用分包后，云测试提示代码包上限有误的问题',
          "修复 素材管理文件列表内容重叠的问题",
          "修复 素材管理文件列表内容重叠的问题",
          "修复 素材管理文件列表内容重叠的问题"]


      }, {
        date: "2018.07.20",
        details: ['修复 1.0 带来的编译不生效的问题',
          "修复 界面调试样式覆盖规则计算错误的问题",
          "修复 分包根目录名字后缀相同时报错的问题"]

      }
    ]
  },
  onLoad() {
    let p = new Promise ((resolve, reject) => {
      let timeOut = Math.random() * 2;
      setTimeout(() => {
        if (timeOut < 1) resolve('200');
        else reject('404')
      }, 1000)
    });

    p.then((res) => {
      console.log('success:' + res)
    });

    p.catch((res) => {
      console.log('fail:' +  res)
    })
  }
});