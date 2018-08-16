// const AV = require('../../libs/leancloud/av-weapp-min.js');
const Utils = require('../../utils/util');
const showToast = Utils.showToast;
const timeAgoWithTimeStr = Utils.timeAgoWithTimeStr;
let globalData = getApp().globalData;

const SUB_COMMENT_NICKNAME_LEN = 10;

// AV.init({
//   appId: 'sAJe8mPXIO3AxQswbPOwi6kb-gzGzoHsz',
//   appKey: 'Lq58KthhQMzBo8KY1rlpHRdv',
// });

// AV.init({
//   appId: 'hSOy8m8HxrsVncxmPxzelTGD-gzGzoHsz',
//   appKey: 'gnu2rpHvgDF80MylwaRy96cr'
// });

Page({
  data: {
    // articleID: 'message_board',
    // is_admin: false,
    // login_user_info: null,
    // leancloud_user_id: null
  },
  onLoad(options) {

    // this.loadMessageBoard();
    // loginWithWeapp()
    //   .then(res => {
    //     debugger;
    //     this.setData({
    //       leancloud_user_id: res.data.id,
    //       login_user_info: res.data.toJSON()
    //     });
    //     updateUserInfoInLeanCloud()
    //       .then(res => {
    //         this.data.login_user_info = res.data.toJSON();
    //       })
    //       .catch(console.error);
    //     this.queryWxComments(this.data.articleID, this.data.leancloud_user_id)
    //   })
    //   .catch(console.error)

  },

  loadMessageBoard() { // 加载当前消息面板的总览信息

    // 文章阅读量和文章点赞统计和显示
    let count_query = new AV.Query('Count');
    count_query.equalTo('article_id', this.data.articleID);
    count_query.find()
      .then((results) => {
        // 阅读量统计对象一文章对应一对象
        if (results.length === 1) {
          let count_todo = AV.Object.createWithoutData('Count', results[0].id);
          count_todo.save().then((count_todo) => {
            count_todo.increment('views', 1);
            count_todo.fetchWhenSave(true);
            return count_todo.save();
          }).then((count_todo) => {
            // show
            //console.log(count_todo);
            //console.log(count_todo.attributes.views);
            this.setData({
              article_views: count_todo.attributes.views
            });
          }, function (error) {
            // 异常处理
            showToast({
              title: error
            }, 2000);
          });
        }
        // 找不到 id 对应的文章
        else if (results.length === 0) {
          // 初始化文章统计对象
          createCount(this.data.articleID, '', '');
        }
        else {
          showToast({
            title: '文章ID有重复，请检查！',
            icon: 'none'
          }, 1000);
        }
      })
      .catch(error => {
        // leanCloud 错误码一览： https://leancloud.cn/docs/error_code.html#hash1444
        if (error.code === 101) { // 查询的 Class 不存在，或者要关联的 Pointer 对象不存在。
          createCount(this.data.articleID, '', '');
          return;
        }
        showToast({
          title: error.code + error.message,
          icon: 'none'
        }, 1000);
      });
  },

  queryWxComments(articleId, userId) {
    let commentData = []; // 评论数据
    let query = new AV.Query('WxComment');
    query.equalTo('article_id', articleId);
    // descending:降序/ascending:升序
    query.descending('createdAt');
    // 同时查询包含对象Pointer的详细信息
    query.include('targetUser');
    query.include('targetZan');
    query.include('subCommentList');
    query.find()
      .then((results) => {
        // this.data.all_comment_num = results.length;
        // 处理初次加载的评论
        for (let i = 0; i < results.length; i++) {
          let item = {};
          item['p_index'] = i;
          item['p_id'] = results[i].id;
          item['id'] = results[i].id;
          item['userId'] = results[i].attributes.targetUser.id;
          item['zanId'] = results[i].attributes.targetZan.id;
          // 赞list
          let zanUserList = results[i].attributes.targetZan.attributes.userList;
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
          if (item['nickName'].length > SUB_COMMENT_NICKNAME_LEN) {
            item['showNickName'] = item['nickName'].substr(0, SUB_COMMENT_NICKNAME_LEN) + "...";
          }
          else {
            item['showNickName'] = item['nickName'];
          }
          item['pre_' + item['id']] = item['nickName'];
          item['avatarUrl'] = results[i].attributes.targetUser.attributes.avatarUrl;
          item['content'] = results[i].attributes.content;
          item['time'] = timeAgoWithTimeStr(results[i].attributes.time);
          item['at'] = results[i].attributes.at;

          item['subCommentList'] = [];

          if (results[i].attributes.subCommentList.length > 0) { // 判断子评论是否为空
            // that.data.all_comment_num = that.data.all_comment_num + results[i].attributes.subCommentList.length;
            promiseFuncArr.push(promiseGetSubComment(i, results[i].id));
          }
          commentData.push(item)
        } // end for results

        // 加载子评论
        let p = Promise.resolve();
        let promiseFuncArr = [];
        for (let x = 0; x <= promiseFuncArr.length; x++) {
          (function (x, ctx) {
            p = p.then((data) => {
              // 第一次data为空promise，undefined
              // 开始处理子评论
              if (x > 0) {
                let p_index = data[0];
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
                    if (subzanUserList[m] === userId) {
                      sub_item['zanCurrent'] = true;
                      break;
                    } else {
                      sub_item['zanCurrent'] = false;
                    }
                  }
                  sub_item['zanNum'] = sub_comments[k].attributes.targetZan.attributes.zan;
                  sub_item['articleID'] = sub_comments[k].attributes.article_id;
                  sub_item['nickName'] = sub_comments[k].attributes.targetUser.attributes.nickName;
                  if (sub_item['nickName'].length > SUB_COMMENT_NICKNAME_LEN) {
                    sub_item['showNickName'] = sub_item['nickName'].substr(0, SUB_COMMENT_NICKNAME_LEN) + "...";
                  }
                  else {
                    sub_item['showNickName'] = sub_item['nickName'];
                  }
                  sub_item['pre_' + sub_item['id']] = sub_item['nickName'];
                  sub_item['avatarUrl'] = sub_comments[k].attributes.targetUser.attributes.avatarUrl;
                  sub_item['content'] = sub_comments[k].attributes.content;
                  sub_item['time'] = timeAgoWithTimeStr(sub_comments[k].attributes.time);
                  sub_item['at'] = sub_comments[k].attributes.at;
                  commentData[p_index].subCommentList.push(sub_item)
                } // end for subcoments
              } // end if
              if (x === promiseFuncArr.length) {
                //console.log('finished')
                // console.log(that.data.all_comment_num);
                // 显示所有评论
                ctx.setData({
                  leancloud_comment_data: commentData,
                  // comment_num: that.data.leancloud_comment_data.length
                });
                return null;
              }
              // 当x为length时，return promiseFuncArr[x]()后，循环退出，
              // 没有then方法获取promiseFuncArr[x]()的回调
              // 因此多循环一次
              return promiseFuncArr[x];
            });
          })(x, this)
        }
      })
      .catch(console.error);
  },

  _isAdmin() { // 判断当前用户是否为管理员
    const user = AV.User.current();

    let query = new AV.Query('Admin');
    query.equalTo('adminId', user.id);
    query.find()
      .then(results => {
        if (results.length >= 1) {
          this.data.is_admin = true;
          wx.showToast({
            title: '欢迎Admin!',
            icon: 'success',
            duration: 1000
          })
        }
      })
      .catch(error => {
        if (error.code === 101) {
          wx.showToast({
            title: 'Admin Class不存在,请手动添加',
            icon: 'none',
            duration: 2000
          })
        }
      })
  },
});

/**
 * 使用当前的小程序的微信用户身份注册或登录到 leanCloud
 * @returns {Promise<any>}
 */
function loginWithWeapp() {
  return new Promise((resolve, reject) => {
    AV.User.loginWithWeapp()
      .then(user => {
        resolve(user);
        // this.data.leancloud_user_id = user.id;
        // this.data.login_user_info = user.toJSON();
        // this.queryWxComments()
      })
      .catch(reject);
  });
}

/**
 * 更新 leanCloud 上的用户信息
 * @returns {Promise<any>}
 */
function updateUserInfoInLeanCloud() {
  return new Promise((resolve, reject) => {
    // 获得当前登录用户
    const user = AV.User.current();
    // 调用小程序 API，得到用户信息
    user.set(globalData.userInfo).save()
      .then(user => {
        // 成功，此时可在控制台中看到更新后的用户信息
        resolve(user);
      })
      .catch(reject);
  })
}

/**
 * 指定评论 id， 返回其子评论
 * @param index
 * @param p_id
 * @returns {Promise<any>}
 */
function promiseGetSubComment(index, p_id) {
  return new Promise((resolve, reject) => {
    let sub_query = new AV.Query('WxSubComment');
    sub_query.ascending('createdAt');
    sub_query.include('targetUser');
    sub_query.include('targetZan');
    sub_query.equalTo('p_id', p_id);
    sub_query.find().then(function (sub_comments) {
      resolve([index, p_id, sub_comments]);
    })
  });
}

/**
 * 初始化文章统计对象
 * @param id
 * @param title
 * @param url
 */
function createCount(id, title, url) {
  let ArticleCount = AV.Object.extend('Count');
  let articlecount = new ArticleCount();
  articlecount.set('article_id', id);
  articlecount.set('views', 1);
  articlecount.set('zan', 0);
  articlecount.save();
  // 初始化文章评论计数
  let ArticleCommentCount = AV.Object.extend('WxCommentCount');
  let articlecommentcount = new ArticleCommentCount();
  articlecommentcount.set('article_id', id);
  articlecommentcount.set('article_title', title);
  articlecommentcount.set('article_url', url);
  articlecommentcount.set('count', 0);
  articlecommentcount.save();
}