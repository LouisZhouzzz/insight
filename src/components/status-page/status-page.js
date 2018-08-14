Component({
  properties: {
    status: {
      type: String,
      value: 'normal'
    }
  },
  methods: {
    renew () {
      this.triggerEvent('renewevent', null);
    }
  }
});