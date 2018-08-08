Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onConfirmBtnClick () {
      setTimeout(() => {
        this.triggerEvent('event', true);
      }, 200);
    },
    onCancelBtnClick () {
      setTimeout(() => {
        this.triggerEvent('event', false);
      }, 200);
    }
  }
});