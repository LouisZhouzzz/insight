Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    on: {
      type: Boolean,
      value: false
    },
    async: {
      type: Boolean,
      value: false
    }
  },
  data: {
    ifLoading: false
  },
  methods: {
    onToggle () {
      this.data.async ? this.asyncToggle() : this.syncToggle();
    },
    asyncToggle () {
      if (this.data.ifLoading) return;
      this.setData({
        ifLoading: true
      });
      // this.triggerEvent('toggleevent', !this.data.on);
      this.setData({
        on: !this.data.on
      });
    },
    syncToggle () {
      // this.triggerEvent('toggleevent', !this.data.on);
      this.setData({
        on: !this.data.on
      });
    }
  }
});