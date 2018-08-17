const AV = require('../../libs/leancloud/av-weapp-min.js');
let Common = require('../../libs/scripts/common.js');
// LeanCloud 应用的 ID 和 Key

// AV.init({
//   appId: 'hSOy8m8HxrsVncxmPxzelTGD-gzGzoHsz',
//   appKey: 'gnu2rpHvgDF80MylwaRy96cr'
// });

AV.init({
  appId: 'sAJe8mPXIO3AxQswbPOwi6kb-gzGzoHsz',
  appKey: 'Lq58KthhQMzBo8KY1rlpHRdv',
});

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
      // 评论内容至少为多长限制
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
    // 暂存评论数据
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
      if (e.detail.value.comment_text.length <= this.data.contentLen) {
        wx.showToast({
          title: '评论内容长度不够！',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      //console.log(that.data.articleID);
      this.data.comment_data = e.detail.value.comment_text;

      // 双重判断是否是子评论
      if (this.data.is_sub_comment) {
        // 再通过文本内容是否含有@字符判断
        if (this.data.comment_data.charAt(0) === '@') {
          // Done
        }
        else {
          this.data.is_sub_comment = false
        }
      }

      // 获取用户信息
      wx.getSetting({
        success: (res) => {
          if (!res.authSetting['scope.userInfo']) {
            console.log("没有授权获取用户信息");
            wx.showToast({
              title: '没有授权获取用户信息',
              icon: 'none',
              duration: 2000
            });
            this.setData({
              show_aur_button: true
            });
          } else {
            this.setData({
              comment_textarea_value: ''
            });

            wx.getUserInfo({
              success: (res) => {
                this.setData({
                  user_info: res.userInfo
                });
                // LeanCloud 用户一键登录
                AV.User.loginWithWeapp()
                  .then(user => {
                    this.data.login_user_info = user.toJSON();
                    // 更新LeanCloud用户信息
                    this._updateUserInfoInLeanCloud();
                    // 写入评论
                    // 写入并更新显示评论
                    if (this.data.is_sub_comment) {
                      // 子评论
                      this._writeSubCommentInLeanCloud();
                      this.data.is_sub_comment = false;
                    }
                    else {
                      this._writeCommentInLeanCloud();
                    }
                  })
                  .catch(console.error);
              }
            })
          }
        },
        fail: () => {
          console.log("获取用户的当前设置失败");
        }
      })

    },
    commentTextTap(e) {
      console.log(e);
      // 子评论
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

      /* // 使页面滚动到底部
       wx.pageScrollTo({
         scrollTop: 10000
       })*/

      wx.pageScrollTo({     //改为滚动到顶部
        scrollTop: 0
      })
    },
    _writeCommentCountInLeanCloud() {
      // 更新评论计数
      let that = this;
      let commentcount_query = new AV.Query('WxCommentCount');
      commentcount_query.find().then(function (results) {
        //console.log(results.length)
        if (results.length === 1) {
          let todo = AV.Object.createWithoutData('WxCommentCount', results[0].id);
          todo.set('count', that.data.all_comment_num);
          todo.set('article_url', that.data.articleURL);
          todo.save().then(function (todo) {
            that.data.comment_count_id = todo.id;
          })
        }
        else if (results.length > 1) {
          console.log("WxCommentCount有重复ID");
        }
        else {
          console.log("还未创建WxCommentCount对象");
          // TODO
          // BUG: 会出现discovery_discovery_xxxid
          // 初始化文章评论计数
          let ArticleCommentCount = AV.Object.extend('WxCommentCount');
          let articlecommentcount = new ArticleCommentCount();
          articlecommentcount.set('article_id', that.data.articleID);
          articlecommentcount.set('article_title', that.data.articleTitle);
          articlecommentcount.set('article_url', that.data.articleURL);
          articlecommentcount.set('count', 0);
          articlecommentcount.save();
        }
      }, function (error) {
        console.log(error)
      });
    },

    _updateZanShow(mode, comment_id, is_sub_comment, p_index) {
      // TODO 降序处理
      p_index = this.data.leancloud_comment_data.length - 1 - p_index;
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

          let type = results.length >= 1 ? 'cancel' : 'submit';

          Common.updateZan(type, class_name, user_id, zan_id)
            .then(res => {
              this._updateZanShow(type, comment_id, is_sub_comment, p_index);
            })
            .catch(console.error);
        })
        .catch(console.error);
    },

    commentLongTap (e) {
      var that = this;
      wx.showModal({
        title: '提示',
        content: '确定删除该评论吗？',
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
            // 长按删除评论
            AV.User.loginWithWeapp().then(user => {
              if (user.id == e.currentTarget.dataset.user_id || that.data.is_admin) {
                // 如果该评论下有子评论
                // 1.可以删除父评论和所有子评论？2.还是只能所以子评论删除完毕后才可以删除？
                // Done 1
                var p_index = e.currentTarget.dataset.p_index;
                if (that.data.leancloud_comment_data[p_index].subCommentList.length > 0) {
                  // 父评论下有子评论
                  wx.showModal({
                    title: '提示',
                    content: '父评论下有子评论，无法删除！',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        // nothing to do
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                  return;
                }

                //console.log('当前登陆用户与待删除评论用户id相同');
                var todo = new AV.Object.createWithoutData('WxComment', e.currentTarget.dataset.comment_id);
                todo.destroy().then(function (success) {
                  // 删除成功
                  // 删除评论对应的点赞对象
                  //console.log(e.currentTarget.dataset.zan_id)
                  var zantodo = new AV.Object.createWithoutData('Zan', e.currentTarget.dataset.zan_id);
                  zantodo.destroy().then(function (success) {
                    // 删除评论对应赞成功
                    wx.showToast({
                      title: '删除评论成功！',
                      icon: 'success',
                      duration: 2000
                    })
                    // 同步本地显示
                    var index;
                    //console.log(that.data.leancloud_comment_data.length);
                    for (var i = 0; i < that.data.leancloud_comment_data.length; i++) {
                      if ((that.data.leancloud_comment_data[i].id).indexOf(e.currentTarget.dataset.comment_id) > -1) {
                        index = i;
                        that.data.leancloud_comment_data.splice(index, 1);
                        break;
                      }
                    }
                    // 更新p_id for all comments
                    for (var i = 0; i < that.data.leancloud_comment_data.length; i++) {
                      // update
                      if (i >= index) {
                        that.data.leancloud_comment_data[i].p_index = that.data.leancloud_comment_data[i].p_index - 1;
                        for (var j = 0; j < that.data.leancloud_comment_data[i].subCommentList.length; j++) {
                          that.data.leancloud_comment_data[i].subCommentList[j].p_index = that.data.leancloud_comment_data[i].subCommentList[j].p_index - 1;
                        }
                      }
                    }

                    that.setData({
                      leancloud_comment_data: that.data.leancloud_comment_data,
                      comment_num: that.data.leancloud_comment_data.length
                    })
                    // 更新评论计数
                    that.data.all_comment_num = that.data.all_comment_num - 1;
                    that._writeCommentCountInLeanCloud();
                  }), function (error) {
                    // 删除评论对应赞失败
                    wx.showToast({
                      title: '删除评论赞失败！',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                }, function (error) {
                  // 删除失败
                  wx.showToast({
                    title: '删除评论失败！',
                    icon: 'none',
                    duration: 2000
                  })
                });
              }
              else {
                wx.showToast({
                  title: '无权删除其他用户评论！',
                  icon: 'none',
                  duration: 2000
                })
              }
            }).catch(console.error);
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    },
    subCommentLongTap (e) {
      var that = this;
      wx.showModal({
        title: '提示',
        content: '确定删除该评论吗？',
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
            // 长按删除评论
            AV.User.loginWithWeapp().then(user => {
              if (user.id == e.currentTarget.dataset.user_id || that.data.is_admin) {
                //console.log('当前登陆用户与待删除评论用户id相同');
                var todo = new AV.Object.createWithoutData('WxSubComment', e.currentTarget.dataset.comment_id);
                todo.destroy().then(function (success) {
                  // 删除成功
                  // 删除评论对应的点赞对象
                  //console.log(e.currentTarget.dataset.zan_id)
                  var zantodo = new AV.Object.createWithoutData('SubZan', e.currentTarget.dataset.zan_id);
                  zantodo.destroy().then(function (success) {
                    // 删除评论对应赞成功
                    // 删除父评论WxComment中subCommentList信息
                    var op_str = "update WxComment set subCommentList=op('Remove', {'objects':[pointer('WxSubComment','" + e.currentTarget.dataset.comment_id + "')]}) where objectId='" + e.currentTarget.dataset.p_comment_id + "'";
                    AV.Query.doCloudQuery(op_str).then(function (data) {
                      // 同步本地显示
                      var index;
                      //console.log(that.data.leancloud_comment_data.length);
                      for (var i = 0; i < that.data.leancloud_comment_data[e.currentTarget.dataset.p_index].subCommentList.length; i++) {
                        if ((that.data.leancloud_comment_data[e.currentTarget.dataset.p_index].subCommentList[i].id).indexOf(e.currentTarget.dataset.comment_id) > -1) {
                          index = i;
                          that.data.leancloud_comment_data[e.currentTarget.dataset.p_index].subCommentList.splice(index, 1);
                          break;
                        }
                      }
                      that.setData({
                        leancloud_comment_data: that.data.leancloud_comment_data
                      })
                      // 更新评论计数
                      that.data.all_comment_num = that.data.all_comment_num - 1;
                      that._writeCommentCountInLeanCloud();

                      wx.showToast({
                        title: '删除子评论成功！',
                        icon: 'success',
                        duration: 2000
                      })
                    }, function (error) {
                      // 异常处理
                      console.error(error);
                    });

                  }), function (error) {
                    // 删除评论对应赞失败
                    wx.showToast({
                      title: '删除评论赞失败！',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                }, function (error) {
                  // 删除失败
                  wx.showToast({
                    title: '删除评论失败！',
                    icon: 'none',
                    duration: 2000
                  })
                });
              }
              else {
                wx.showToast({
                  title: '无权删除其他用户评论！',
                  icon: 'none',
                  duration: 2000
                })
              }
            }).catch(console.error);
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    },
    zanCommentClick(e) {
      // user_id为评论发布者的用户id，非当前用户id
      let user_id = e.currentTarget.dataset.user_id;
      let comment_id = e.currentTarget.dataset.comment_id;
      let zan_id = e.currentTarget.dataset.zan_id;
      let p_index = e.currentTarget.dataset.p_index;
      let class_name = e.currentTarget.dataset.is_sub_comment === "true" ? "SubZan" : "Zan";

      this._writeZanInLeanCloud(user_id, comment_id, zan_id, class_name, e.currentTarget.dataset.is_sub_comment, p_index);
    },

    onGetUserInfo(e) {
      if (!e.detail.userInfo) return;
      //console.log(e.detail.userInfo);
      wx.showToast({
        title: '授权成功！',
        icon: 'success',
        duration: 2000
      });
      this.setData({
        user_info: e.detail.userInfo,
        show_aur_button: false
      });
      Common.loginWithWeapp()
        .then(user => {
          this.data.login_user_info = user.toJSON();
          // 更新LeanCloud用户信息
          this._updateUserInfoInLeanCloud();
        })
        .catch(console.error);
    },
    _updateUserInfoInLeanCloud() {
      // 获得当前登录用户
      const user = AV.User.current();
      // 调用小程序 API，得到用户信息
      wx.getUserInfo({
        success: ({userInfo}) => {
          // 更新当前用户的信息
          user.set(userInfo).save().then(user => {
            // 成功，此时可在控制台中看到更新后的用户信息
            this.data.login_user_info = user.toJSON();
          }).catch(console.error);
        },
        fail: function () {
          console.log("获取用户信息失败");
        }
      });
    },
    _writeSubCommentInLeanCloud() {
      let current_time = Common.getTime();
      const user = AV.User.current();
      Common.writeSubComment(this.data.sub_comment_p_comment_id, this.data.login_user_info.username, this.data.comment_data, user.id, current_time)
        .then(wxsubcomment => {
          Common.writeSubZan(wxsubcomment)
            .then(wxsubcomment => {
              // 子评论和赞处理完毕
              // 将子评论加入到父评论索引数组中
              // WxComment添加子评论objectId
              let op_str = "update WxComment set subCommentList=op('AddUnique', {'objects':[pointer('WxSubComment','" + wxsubcomment.id + "')]}) where objectId='" + this.data.sub_comment_p_comment_id + "'";
              AV.Query.doCloudQuery(op_str)
                .then(data => {
                  console.log('子评论和赞及父评论处理完毕');
                  // data 中的 results 是本次查询返回的结果，AV.Object 实例列表
                  // 同步更新子评论和相关初赞显示
                  let current_comment = {};
                  current_comment['p_index'] = this.data.sub_comment_p_index;
                  current_comment['p_id'] = this.data.sub_comment_p_comment_id;
                  current_comment['id'] = wxsubcomment.id;
                  current_comment['userId'] = user.id;
                  current_comment['articleID'] = this.data.articleID;
                  current_comment['nickName'] = this.data.login_user_info.nickName;
                  current_comment['pre_' + current_comment['id']] = current_comment['nickName'];
                  current_comment['avatarUrl'] = this.data.login_user_info.avatarUrl;
                  current_comment['time'] = Common.timeAgoWithTimeStr(current_time);
                  current_comment['content'] = this.data.comment_data;
                  current_comment['at'] = '';
                  current_comment['zanNum'] = 0;
                  current_comment['zanId'] = wxsubcomment.attributes.targetZan.id;
                  
                  // TODO
                  let p_index = this.data.leancloud_comment_data.length - 1 - parseInt(this.data.sub_comment_p_index);
                  this.data.leancloud_comment_data[p_index].subCommentList.push(current_comment);
                  // 子评论不增加commnet_num
                  this.setData({
                    leancloud_comment_data: this.data.leancloud_comment_data,
                    comment_data: '',
                    comment_textarea_value: ''
                  });

                  this.data.all_comment_num = this.data.all_comment_num + 1;
                  // 更新评论计数
                  this._writeCommentCountInLeanCloud();
                  console.log("评论和赞显示处理完毕");
                })
                .catch(error => {
                  // 异常处理
                  console.error(error);
                });
            })
            .catch(error => {
              // 异常处理
              console.log('赞初始化失败！');
              console.log(error)
            })
        })
        .catch(error => {
          // 异常处理
          console.log('子评论初始化失败');
          console.log(error)
        });
    },
    // 写 comment 到云端
    _writeCommentInLeanCloud() {
      const user = AV.User.current();
      const currentTime = Common.getTime();

      Common.writeComment(this.data.login_user_info.username, this.data.comment_data, user.id, currentTime)
        .then(wxcomment => {
          // new Zan
          Common.writeZan(wxcomment)
            .then(wxcomment => {
              let current_comment = {};
              current_comment['p_index'] = this.data.leancloud_comment_data.length;
              current_comment['p_id'] = wxcomment.id;
              current_comment['id'] = wxcomment.id;
              current_comment['userId'] = user.id;
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
              // 更新评论计数
              this.data.all_comment_num = this.data.all_comment_num + 1;
            })
            .catch(error => {
              wx.showToast({
                title: '评论处理失败: ' + error,
                icon: 'none',
                duration: 2000
              })
            });
        })
        .catch(error => {
          // 异常处理
          wx.showToast({
            title: '评论失败！' + error,
            icon: 'none',
            duration: 2000
          })
        })
    },

    // 加载评论的所有信息，包括子评论
    loadComments() {
      // 完成阅读量统计查询，Then...
      // 加载评论列表和评论点赞信息
      Common.loginWithWeapp()
        .then(res => {
          this.data.leancloud_user_id = res.id;
          this.data.login_user_info = res.toJSON();

          Common.queryWxComment()
            .then(results => {
              //console.log(results);
              this.data.all_comment_num = results.length;
              // 处理初次加载的评论
              let promiseFuncArr = [];
              for (let i = 0; i < results.length; i++) {
                let item = {};
                // TODO
                item['p_index'] = results.length - i - 1;
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
                if (item['nickName'].length > this.data.comment_nickname_len) {
                  item['showNickName'] = item['nickName'].substr(0, this.data.comment_nickname_len) + "...";
                }
                else {
                  item['showNickName'] = item['nickName'];
                }
                item['pre_' + item['id']] = item['nickName'];
                item['avatarUrl'] = results[i].attributes.targetUser.attributes.avatarUrl;
                item['content'] = results[i].attributes.content;
                item['time'] = Common.timeAgoWithTimeStr(results[i].attributes.time);
                item['at'] = results[i].attributes.at;

                item['subCommentList'] = [];
                if (results[i].attributes.subCommentList.length > 0) {
                  this.data.all_comment_num = this.data.all_comment_num + results[i].attributes.subCommentList.length;
                  this.data.leancloud_comment_data.push(item);
                  promiseFuncArr.push(Common.querySubComment(i, results[i].id));
                } else {
                  this.data.leancloud_comment_data.push(item);
                }
              } // end for results

              // 加载子评论
              let p = Promise.resolve();
              // 当x为length时，return promiseFuncArr[x]()后，循环退出，
              // 没有then方法获取promiseFuncArr[x]()的回调,因此多循环一次
              for (let x = 0; x <= promiseFuncArr.length; x++) {
                (function (x, ctx) {
                  p = p.then(function (data) {
                    // 第一次data为空promise，undefined
                    // 开始处理子评论
                    if (x > 0) {
                      // TODO
                      let p_index = results.length - 1 - data[0];
                      let p_id = data[1];
                      let sub_comments = data[2];
                      for (let k = 0; k < sub_comments.length; k++) {
                        let sub_item = {};
                        sub_item['p_index'] = p_index;
                        sub_item['p_id'] = p_id;
                        sub_item['id'] = sub_comments[k].id;
                        sub_item['userId'] = sub_comments[k].attributes.targetUser.id;
                        sub_item['zanId'] = sub_comments[k].attributes.targetZan.id;
                        // 子评论赞list
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
                        // TODO
                        ctx.data.leancloud_comment_data[data[0]].subCommentList.push(sub_item)
                      } // end for subcoments
                    } // end if
                    if (x === promiseFuncArr.length) {
                      // 显示所有评论
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
    this.loadComments();
  },
  ready() {
    //console.log('ready...');
  }

});