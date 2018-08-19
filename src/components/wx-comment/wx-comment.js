let Common = require('../../libs/scripts/common.js');

Component({
  properties: {
    textMaxLength: {
      type: Number,
      value: 300
    },
    articleTitle: {
      type: String,
      value: ''
    },
    articleURL: {
      type: String,
      value: ''
    },
    articleID: {
      type: String,
      value: ''
    },
    contentLen: {
      // 留言内容至少为多长限制
      type: Number,
      value: 5
    }
  },
  data: {
    textarea_focus: false,
    is_sub_comment: false,
    sub_comment_p_comment_id: '',
    sub_comment_p_index: -1,
    article_id: "",
    comment_count_id: "",
    // 暂存留言数据
    comment_data: "",
    comment_num: 0,
    all_comment_num: 0,
    show_aur_button: false,
    user_info: [],
    leancloud_user_id: '',
    login_user_info: [],
    leancloud_comment_data: [],
    leancloud_comment_zan_data: [],
    is_admin: false,
    comment_nickname_len: 12,
    subcomment_nickname_len: 10
  },
  methods: {
    // 提交事件
    bindFormSubmit(e) {
      // 判断内容是否满足要求
      if (e.detail.value.comment_text.length < this.data.contentLen) {
        wx.showToast({
          title: '请输入至少' + this.data.contentLen + '个字符',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      //console.log(that.data.articleID);
      this.data.comment_data = e.detail.value.comment_text;

      // 双重判断是否是子留言
      if (this.data.is_sub_comment) {
        // 再通过文本内容是否含有@字符判断
        if (this.data.comment_data.charAt(0) === '@') {
          // Done
        }
        else {
          this.data.is_sub_comment = false
        }
      }

      if (this.data.is_sub_comment) {
        // 子留言
        this._writeSubCommentInLeanCloud();
        this.data.is_sub_comment = false;
      }
      else {
        this._writeCommentInLeanCloud();
      }
    },

    commentTextTap(e) {
      console.log(e);
      // 子留言
      let parent_comment_id = e.currentTarget.dataset.p_comment_id;
      let user_id = e.currentTarget.dataset.user_id;
      let comment_id = e.currentTarget.dataset.comment_id;
      let nickname = e.currentTarget.dataset.nickname;
      let p_index = e.currentTarget.dataset.p_index;

      this.setData({
        comment_textarea_value: '@' + nickname + ' ',
        textarea_focus: true,
      });

      this.data.is_sub_comment = true;
      this.data.sub_comment_p_comment_id = parent_comment_id;
      this.data.sub_comment_p_index = p_index;
    },

    commentLongTap(e) {
      wx.showModal({
        title: '提示',
        content: '确定删除该留言吗？',
        success: (res) => {
          if (res.cancel) return;
          if (this.data.leancloud_user_id !== e.currentTarget.dataset.user_id || this.data.is_admin) {
            wx.showToast({
              title: '无权删除其他用户的留言。',
              icon: 'none',
              duration: 2000
            });
            return;
          }
          let p_index = e.currentTarget.dataset.p_index;
          if (this.data.leancloud_comment_data[p_index].subCommentList.length > 0) {
            // 父留言下有子留言
            wx.showModal({
              title: '提示',
              content: '留言存在评论，无法删除！',
              showCancel: false,
              success: res => {
                if (res.confirm) {
                  console.log('用户点击确定')
                  // nothing to do
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            });
            return;
          }

          Common.deleteComment(e.currentTarget.dataset.comment_id, e.currentTarget.dataset.zan_id)
            .then((res) => {
              // 同步本地显示
              let index;
              for (let i = 0; i < this.data.leancloud_comment_data.length; i++) {
                if ((this.data.leancloud_comment_data[i].id).indexOf(e.currentTarget.dataset.comment_id) > -1) {
                  index = i;
                  this.data.leancloud_comment_data.splice(index, 1);
                  break;
                }
              }

              this.setData({
                leancloud_comment_data: this.data.leancloud_comment_data,
                comment_num: this.data.leancloud_comment_data.length
              });
              // 更新留言计数
              this.data.all_comment_num = this.data.all_comment_num - 1;
              wx.showToast({
                title: '留言删除成功！',
                icon: 'success',
                duration: 2000
              });
            })
            .catch(console.error);
        }
      })
    },
    subCommentLongTap(e) {
      let commentId = e.currentTarget.dataset.comment_id;
      let zanId = e.currentTarget.dataset.zan_id;
      let pId = e.currentTarget.dataset.p_comment_id;
      let pIndex = e.currentTarget.dataset.p_index;
      let userId = e.currentTarget.dataset.user_id;
      let commentList = this.data.leancloud_comment_data;
      wx.showModal({
        title: '提示',
        content: '确定删除该条留言吗？',
        success: (res) => {
          if (res.cancel) return;
          if (this.data.leancloud_user_id !== userId || this.data.is_admin) {
            wx.showToast({
              title: '无权删除其他用户的留言。',
              icon: 'none',
              duration: 2000
            });
            return;
          }

          Common.deleteSubComments(commentId, zanId, pId)
            .then(res => {
              for (let i = 0; i < commentList[pIndex].subCommentList.length; i++) {
                if ((commentList[pIndex].subCommentList[i].id).indexOf(commentId) > -1) {
                  commentList[pIndex].subCommentList.splice(i, 1);
                  break;
                }
              }
              this.setData({
                leancloud_comment_data: commentList,
                all_comment_num: this.data.all_comment_num - 1
              });

              wx.showToast({
                title: '留言删除成功！',
                icon: 'success',
                duration: 2000
              })
            })
            .catch(console.error);
        }
      })
    },
    zanCommentClick(e) {
      // user_id为留言发布者的用户id，非当前用户id
      let user_id = e.currentTarget.dataset.user_id;
      let comment_id = e.currentTarget.dataset.comment_id;
      let zan_id = e.currentTarget.dataset.zan_id;
      let p_index = e.currentTarget.dataset.p_index;
      let class_name = e.currentTarget.dataset.is_sub_comment === "true" ? "SubZan" : "Zan";

      this._writeZanInLeanCloud(user_id, comment_id, zan_id, class_name, e.currentTarget.dataset.is_sub_comment, p_index);
    },

    _updateZanShow(mode, comment_id, is_sub_comment, p_index) {
      if (is_sub_comment === "true") {
        for (let i = 0; i < this.data.leancloud_comment_data[p_index].subCommentList.length; i++) {
          if (this.data.leancloud_comment_data[p_index].subCommentList[i].id === comment_id) {
            if (mode === 'cancel') {
              this.data.leancloud_comment_data[p_index].subCommentList[i].zanNum = this.data.leancloud_comment_data[p_index].subCommentList[i].zanNum - 1;
              this.data.leancloud_comment_data[p_index].subCommentList[i].zanCurrent = false;
            }
            else if (mode === 'submit') {
              this.data.leancloud_comment_data[p_index].subCommentList[i].zanNum = this.data.leancloud_comment_data[p_index].subCommentList[i].zanNum + 1;
              this.data.leancloud_comment_data[p_index].subCommentList[i].zanCurrent = true;
            }

            break;
          }
        }
      }
      else {
        if (mode === 'cancel') {
          this.data.leancloud_comment_data[p_index].zanNum = this.data.leancloud_comment_data[p_index].zanNum - 1;
          this.data.leancloud_comment_data[p_index].zanCurrent = false;
        }
        else if (mode === 'submit') {
          this.data.leancloud_comment_data[p_index].zanNum = this.data.leancloud_comment_data[p_index].zanNum + 1;
          this.data.leancloud_comment_data[p_index].zanCurrent = true;
        }
      }
      this.setData({
        leancloud_comment_data: this.data.leancloud_comment_data
      })
    },

    _writeZanInLeanCloud(user_id, comment_id, zan_id, class_name, is_sub_comment, p_index) {
      // 查询当前用户是否已点赞
      Common.queryZan(class_name, comment_id, [this.data.leancloud_user_id])
        .then(results => {
          console.log(this.data.leancloud_user_id);

          let type = results.length >= 1 ? 'cancel' : 'submit';

          Common.updateZan(type, class_name, this.data.leancloud_user_id, zan_id)
            .then(res => {
              this._updateZanShow(type, comment_id, is_sub_comment, p_index);
            })
            .catch(console.error);
        })
        .catch(console.error);
    },

    _writeSubCommentInLeanCloud() {
      let current_time = Common.getTime();
      Common.writeSubComment(this.data.sub_comment_p_comment_id, this.data.login_user_info.username, this.data.comment_data, current_time)
        .then(wxsubcomment => {
          Common.writeSubZan(wxsubcomment)
            .then(res => {
              // data 中的 results 是本次查询返回的结果，AV.Object 实例列表
              // 同步更新子留言和相关初赞显示
              let current_comment = {};
              current_comment['p_index'] = this.data.sub_comment_p_index;
              current_comment['p_id'] = this.data.sub_comment_p_comment_id;
              current_comment['id'] = wxsubcomment.id;
              current_comment['userId'] = this.data.leancloud_user_id;
              current_comment['articleID'] = this.data.articleID;
              current_comment['nickName'] = this.data.login_user_info.nickName;
              current_comment['pre_' + current_comment['id']] = current_comment['nickName'];
              current_comment['avatarUrl'] = this.data.login_user_info.avatarUrl;
              current_comment['time'] = Common.timeAgoWithTimeStr(current_time);
              current_comment['content'] = this.data.comment_data;
              current_comment['at'] = '';
              current_comment['zanNum'] = 0;
              current_comment['zanId'] = wxsubcomment.attributes.targetZan.id;

              this.data.leancloud_comment_data[this.data.sub_comment_p_index].subCommentList.push(current_comment);
              // 子留言不增加commnet_num
              this.setData({
                leancloud_comment_data: this.data.leancloud_comment_data,
                comment_data: '',
                comment_textarea_value: ''
              });

              this.data.all_comment_num = this.data.all_comment_num + 1;
              wx.showToast({
                title: '留言发布成功。 ',
                duration: 1000
              })
            })
            .catch(error => {
              // 异常处理
              console.log('赞初始化失败！');
              console.log(error)
            })
        })
        .catch(error => {
          // 异常处理
          console.log('子留言初始化失败');
          console.log(error)
        });
    },
    // 写 comment 到云端
    _writeCommentInLeanCloud() {
      const currentTime = Common.getTime();

      Common.writeComment(this.data.login_user_info.username, this.data.comment_data, currentTime)
        .then(wxcomment => {
          // new Zan
          Common.writeZan(wxcomment)
            .then(wxcomment => {
              let current_comment = {};
              current_comment['p_id'] = wxcomment.id;
              current_comment['id'] = wxcomment.id;
              current_comment['userId'] = this.data.leancloud_user_id;
              current_comment['nickName'] = this.data.login_user_info.nickName;
              current_comment['pre_' + current_comment['id']] = current_comment['nickName'];
              current_comment['avatarUrl'] = this.data.login_user_info.avatarUrl;
              current_comment['time'] = Common.timeAgoWithTimeStr(currentTime);
              current_comment['content'] = this.data.comment_data;
              current_comment['at'] = '';
              current_comment['zanNum'] = 0;
              current_comment['zanId'] = wxcomment.attributes.targetZan.id;
              current_comment['subCommentList'] = [];
              this.data.leancloud_comment_data.unshift(current_comment);
              this.setData({
                leancloud_comment_data: this.data.leancloud_comment_data,
                comment_num: this.data.comment_num + 1,
                comment_data: '',
                comment_textarea_value: ''
              });
              // 更新留言计数
              this.data.all_comment_num = this.data.all_comment_num + 1;
              wx.showToast({
                title: '留言成功。 ',
                duration: 1000
              })
            })
            .catch(error => {
              wx.showToast({
                title: '留言失败: ' + error,
                icon: 'none',
                duration: 2000
              })
            });
        })
        .catch(error => {
          // 异常处理
          wx.showToast({
            title: '留言失败！' + error,
            icon: 'none',
            duration: 2000
          })
        })
    },

    // 加载留言的所有信息，包括子留言
    loadComments() {
      // 完成阅读量统计查询，Then...
      // 加载留言列表和留言点赞信息
      return new Promise((resolve, reject) => {
        Common.loginWithWeapp()
          .then(res => {
            this.data.leancloud_user_id = res.id;
            this.data.login_user_info = res.toJSON();
            Common.queryWxComment()
              .then(results => {
                //console.log(results);
                this.data.all_comment_num = results.length;
                // 处理初次加载的留言
                let promiseFuncArr = [];
                for (let i = 0; i < results.length; i++) {
                  let item = {};
                  item['p_id'] = results[i].id;
                  item['id'] = results[i].id;
                  item['userId'] = results[i].attributes.targetUser.id;
                  item['zanId'] = results[i].attributes.targetZan && results[i].attributes.targetZan.id;
                  // 赞list
                  let zanUserList = results[i].attributes.targetZan ? results[i].attributes.targetZan.attributes.userList : [];
                  item['zanCurrent'] = false;
                  for (let j = 0; j < zanUserList.length; j++) {
                    if (zanUserList[j] === this.data.leancloud_user_id) {
                      item['zanCurrent'] = true;
                      break;
                    } else {
                      item['zanCurrent'] = false;
                    }
                  }
                  item['zanNum'] = results[i].attributes.targetZan.attributes.zan;
                  item['articleID'] = results[i].attributes.article_id;
                  item['nickName'] = results[i].attributes.targetUser.attributes.nickName;
                  item['pre_' + item['id']] = item['nickName'];
                  item['avatarUrl'] = results[i].attributes.targetUser.attributes.avatarUrl;
                  item['content'] = results[i].attributes.content;
                  item['time'] = Common.timeAgoWithTimeStr(results[i].attributes.time);
                  item['at'] = results[i].attributes.at;

                  item['subCommentList'] = [];
                  if (results[i].attributes.subCommentList.length > 0) {
                    this.data.all_comment_num = this.data.all_comment_num + results[i].attributes.subCommentList.length;
                    this.data.leancloud_comment_data.push(item);
                    promiseFuncArr.push(Common.querySubComment(results[i].id, i));
                  } else {
                    this.data.leancloud_comment_data.push(item);
                  }
                } // end for results

                // 加载子留言
                let p = Promise.resolve();
                // 当x为length时，return promiseFuncArr[x]()后，循环退出，
                // 没有then方法获取promiseFuncArr[x]()的回调,因此多循环一次
                for (let x = 0; x <= promiseFuncArr.length; x++) {
                  (function (x, ctx) {
                    p = p.then(function (data) {
                      // 第一次data为空promise，undefined
                      // 开始处理子留言
                      if (x > 0) {
                        let p_index = data.pIndex;
                        let p_id = data.pId;
                        let sub_comments = data.subComments;
                        for (let k = 0; k < sub_comments.length; k++) {
                          let sub_item = {};
                          sub_item['p_index'] = p_index;
                          sub_item['p_id'] = p_id;
                          sub_item['id'] = sub_comments[k].id;
                          sub_item['userId'] = sub_comments[k].attributes.targetUser.id;
                          sub_item['zanId'] = sub_comments[k].attributes.targetZan.id;
                          // 子留言赞list
                          let subzanUserList = sub_comments[k].attributes.targetZan.attributes.userList;
                          sub_item['zanCurrent'] = false;
                          for (let m = 0; m < subzanUserList.length; m++) {
                            if (subzanUserList[m] === ctx.data.leancloud_user_id) {
                              sub_item['zanCurrent'] = true;
                              break;
                            } else {
                              sub_item['zanCurrent'] = false;
                            }
                          }
                          sub_item['zanNum'] = sub_comments[k].attributes.targetZan.attributes.zan;
                          sub_item['nickName'] = sub_comments[k].attributes.targetUser.attributes.nickName;
                          sub_item['pre_' + sub_item['id']] = sub_item['nickName'];
                          sub_item['avatarUrl'] = sub_comments[k].attributes.targetUser.attributes.avatarUrl;
                          sub_item['content'] = sub_comments[k].attributes.content;
                          sub_item['time'] = Common.timeAgoWithTimeStr(sub_comments[k].attributes.time);
                          sub_item['at'] = sub_comments[k].attributes.at;
                          ctx.data.leancloud_comment_data[p_index].subCommentList.push(sub_item)
                        } // end for subcoments
                      } // end if
                      if (x === promiseFuncArr.length) {
                        // 显示所有留言
                        ctx.setData({
                          leancloud_comment_data: ctx.data.leancloud_comment_data,
                          comment_num: ctx.data.leancloud_comment_data.length
                        });
                        console.table(ctx.data.leancloud_comment_data);
                        return null;
                      }
                      return promiseFuncArr[x];
                    });
                  })(x, this)
                }
                resolve(res);
              })
              .catch(reject);
          })
          .catch(reject);
      });

    },
    loadComments2 () {
      Common.loginWithWeapp()
        .then(res => {
          this.data.leancloud_user_id = res.id;
          this.data.login_user_info = res.toJSON();
          Common.queryWxComment()
            .then(results => {
              //console.log(results);
              this.data.all_comment_num = results.length;
              // 处理初次加载的留言
              let promiseFuncArr = [];
              for (let i = 0; i < results.length; i++) {
                let item = {};
                item['p_id'] = results[i].id;
                item['id'] = results[i].id;
                item['userId'] = results[i].attributes.targetUser.id;
                item['zanId'] = results[i].attributes.targetZan && results[i].attributes.targetZan.id;
                // 赞list
                let zanUserList = results[i].attributes.targetZan ? results[i].attributes.targetZan.attributes.userList : [];
                item['zanCurrent'] = false;
                for (let j = 0; j < zanUserList.length; j++) {
                  if (zanUserList[j] === this.data.leancloud_user_id) {
                    item['zanCurrent'] = true;
                    break;
                  } else {
                    item['zanCurrent'] = false;
                  }
                }
                item['zanNum'] = results[i].attributes.targetZan.attributes.zan;
                item['articleID'] = results[i].attributes.article_id;
                item['nickName'] = results[i].attributes.targetUser.attributes.nickName;
                item['pre_' + item['id']] = item['nickName'];
                item['avatarUrl'] = results[i].attributes.targetUser.attributes.avatarUrl;
                item['content'] = results[i].attributes.content;
                item['time'] = Common.timeAgoWithTimeStr(results[i].attributes.time);
                item['at'] = results[i].attributes.at;

                item['subCommentList'] = [];
                if (results[i].attributes.subCommentList.length > 0) {
                  this.data.all_comment_num = this.data.all_comment_num + results[i].attributes.subCommentList.length;
                  this.data.leancloud_comment_data.push(item);
                  promiseFuncArr.push(Common.querySubComment(results[i].id, i));
                } else {
                  this.data.leancloud_comment_data.push(item);
                }
              } // end for results

              // 加载子留言
              let p = Promise.resolve();
              // 当x为length时，return promiseFuncArr[x]()后，循环退出，
              // 没有then方法获取promiseFuncArr[x]()的回调,因此多循环一次
              for (let x = 0; x <= promiseFuncArr.length; x++) {
                (function (x, ctx) {
                  p = p.then(function (data) {
                    // 第一次data为空promise，undefined
                    // 开始处理子留言
                    if (x > 0) {
                      let p_index = data.pIndex;
                      let p_id = data.pId;
                      let sub_comments = data.subComments;
                      for (let k = 0; k < sub_comments.length; k++) {
                        let sub_item = {};
                        sub_item['p_index'] = p_index;
                        sub_item['p_id'] = p_id;
                        sub_item['id'] = sub_comments[k].id;
                        sub_item['userId'] = sub_comments[k].attributes.targetUser.id;
                        sub_item['zanId'] = sub_comments[k].attributes.targetZan.id;
                        // 子留言赞list
                        let subzanUserList = sub_comments[k].attributes.targetZan.attributes.userList;
                        sub_item['zanCurrent'] = false;
                        for (let m = 0; m < subzanUserList.length; m++) {
                          if (subzanUserList[m] === ctx.data.leancloud_user_id) {
                            sub_item['zanCurrent'] = true;
                            break;
                          } else {
                            sub_item['zanCurrent'] = false;
                          }
                        }
                        sub_item['zanNum'] = sub_comments[k].attributes.targetZan.attributes.zan;
                        sub_item['nickName'] = sub_comments[k].attributes.targetUser.attributes.nickName;
                        sub_item['pre_' + sub_item['id']] = sub_item['nickName'];
                        sub_item['avatarUrl'] = sub_comments[k].attributes.targetUser.attributes.avatarUrl;
                        sub_item['content'] = sub_comments[k].attributes.content;
                        sub_item['time'] = Common.timeAgoWithTimeStr(sub_comments[k].attributes.time);
                        sub_item['at'] = sub_comments[k].attributes.at;
                        ctx.data.leancloud_comment_data[p_index].subCommentList.push(sub_item)
                      } // end for subcoments
                    } // end if
                    if (x === promiseFuncArr.length) {
                      // 显示所有留言
                      ctx.setData({
                        leancloud_comment_data: ctx.data.leancloud_comment_data,
                        comment_num: ctx.data.leancloud_comment_data.length
                      });
                      console.table(ctx.data.leancloud_comment_data);
                      return null;
                    }
                    return promiseFuncArr[x];
                  });
                })(x, this)
              }
              wx.hideLoading();
            })
            .catch(console.error);
        })
        .catch(console.error);
    }
  },

  created() {
    // this.loadComments();
  }
});