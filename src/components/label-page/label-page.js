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
    attached () {
        computed(this, {
            navs: function () {
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
        radioChange (e) {
            this.setData({
                checkedIndex: parseInt(e.detail.value)
            });
        }
    }
});