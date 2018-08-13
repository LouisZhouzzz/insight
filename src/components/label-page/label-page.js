const computed = require('../../utils/vuelike').computed;
Component({
  externalClasses: ['nav-class'],
  properties: {
    labels: {
      type: Array
    }
  },
  data: {
    checkedIndex: 0
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  attached() {
    computed(this, {
      navs: function () {
        // 根据 this.data.labels 以及 this.data.checkedIndex 生成按钮组所需的对象数组
        // 计算属性的特性使得 this.data.checkIndex 改变时对象数组也能跟着改变，无须进行额外的响应操作
        let a = this.data.labels.map(function (e) {
          return {
            name: e,
            checked: false
          }
        });
        a[this.data.checkedIndex].checked = true;
        return a;
      }
    })
  },
  methods: {
    radioChange(e) {
      this.setData({
        checkedIndex: parseInt(e.detail.value)
      });
    }
  }
});