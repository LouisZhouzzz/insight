Page({
  data: {
    status: 'loading'
  },
  onLoad(options) {
  },
  onReady() {
    this.wxCommentComponent = this.selectComponent('#wx-comment');
    this.loadComments();
  },
  loadComments() {
    this.setData({
      status: 'loading'
    });
    this.wxCommentComponent && this.wxCommentComponent.loadComments()
      .then(res => {
        this.setData({
          status: 'normal'
        });
      })
      .catch(err => {
        this.setData({
          status: 'error'
        })
      })
  }
});