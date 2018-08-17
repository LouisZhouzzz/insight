const AV = require('../leancloud/av-weapp-min.js');

const timeAgoWithTimeStr = (dateString) => {
  // ios: 2018/06/02 11:11:11
  // android: 2018-06-02 11:11:11 & 2018/06/02 11:11:11
  let date_time_arr = dateString.split(' ');
  let ios_date_arr = date_time_arr[0].split('-');
  let ios_date_str = ios_date_arr[0] + '/' + ios_date_arr[1] + '/' + ios_date_arr[2];
  let ios_datetime_str = ios_date_str + ' ' + date_time_arr[1];

  let newDateString = dateString;
  newDateString = ios_datetime_str;

  let date = new Date(newDateString);

  try {
    let oldTime = date.getTime();
    let currTime = new Date().getTime();
    let diffValue = currTime - oldTime;

    let days = Math.floor(diffValue / (24 * 3600 * 1000));

    if (days === 0) {
      //计算相差小时数
      let leave1 = diffValue % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000));
      if (hours === 0) {
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000));
        if (minutes === 0) {
          //计算相差秒数
          let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
          let seconds = Math.round(leave3 / 1000);
          return seconds + ' 秒前';
        }
        return minutes + ' 分钟前';
      }
      return hours + ' 小时前';
    }
    if (days < 0) return '刚刚';

    if (days < 3) {
      return days + ' 天前';
    } else {
      return dateString
    }
  } catch (error) {
    console.log(error)
  }
};

/**
 * 格式化当前时间并返回
 * @returns {string}
 */
function getTime() {
  //获取当前时间戳
  let n = Date.parse(new Date());
  let date = new Date(n);
  //年
  let Y = date.getFullYear();
  //月
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  //时
  let h = date.getHours();
  //分
  let m = date.getMinutes();
  //秒
  let s = date.getSeconds();
  return Y + '-' + M + '-' + D + ' ' + h + ":" + m + ":" + s;
}

/**
 * 使用当前的小程序的微信用户身份注册或登录到 leanCloud
 * @returns {Promise<any>}
 */
function loginWithWeapp() {
  return new Promise(function (resolve, reject) {
    AV.User.loginWithWeapp()
      .then(user => {
        resolve(user);
      })
      .catch(reject);
  });
}

/**
 * 查询所有一级评论
 * @returns {Promise<any>}
 */
function queryWxComment() {
  return new Promise(function (resolve, reject) {
    let query = new AV.Query('WxComment');
    query.descending('createdAt');
    // 同时查询包含对象Pointer的详细信息
    query.include('targetUser');
    query.include('targetZan');
    query.include('subCommentList');
    query.find()
      .then(res => {
        resolve(res)
      })
      .catch(reject)
  })
}

/**
 * 查询所有二级评论
 * @param index
 * @param p_id
 * @returns {Promise<any>}
 */
function querySubComment(index, p_id) {
  return new Promise(function (resolve, reject) {
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
 * 新建一级评论并保存到后台中
 * @param username
 * @param content
 * @param userId
 * @param time
 * @returns {Promise<any>}
 */
function writeComment(username, content, userId, time) {
  return new Promise((resolve, reject) => {
    let WxComment = AV.Object.extend('WxComment');
    let wxcomment = new WxComment();
    //console.log(that.data.login_user_info);
    wxcomment.set('username', username);
    wxcomment.set('content', content);
    wxcomment.set('time', time);
    wxcomment.set('at', '');
    wxcomment.set('subCommentList', []);
    let targetUser = AV.Object.createWithoutData('_User', userId);
    wxcomment.set('targetUser', targetUser);

    wxcomment.save()
      .then(res => {
        resolve(res);
      })
      .catch(reject)
  })
}

/**
 * 创建子评论
 * @param pId 父评论 id
 * @param username
 * @param content
 * @param userId
 * @param time
 * @returns {Promise<any>}
 */
function writeSubComment(pId, username, content, userId, time) {
  return new Promise((resolve, reject) => {
    let WxSubComment = AV.Object.extend('WxSubComment');
    let wxsubcomment = new WxSubComment();

    wxsubcomment.set('p_id', pId);
    wxsubcomment.set('username', username);
    wxsubcomment.set('content', content);
    wxsubcomment.set('time', time);
    wxsubcomment.set('at', '');
    let targetUser = AV.Object.createWithoutData('_User', userId);
    wxsubcomment.set('targetUser', targetUser);

    wxsubcomment.save()
      .then(resolve)
      .catch(reject)
  })
}


function writeZan(wxcomment) {
  return new Promise((resolve, reject) => {
    let Zan = AV.Object.extend('Zan');
    let zan = new Zan();
    zan.set('zan', 0);
    zan.set('commentObjId', wxcomment.id);
    zan.set('userList', []);
    zan.save()
      .then(zan => {
        let targetZan = AV.Object.createWithoutData('Zan', zan.id);
        wxcomment.set('targetZan', targetZan);
        wxcomment.save()
          .then(resolve)
          .catch(reject);
      })
      .catch(reject)
  })
}

function writeSubZan(wxsubcomment) {
  return new Promise((resolve, reject) => {
    let Zan = AV.Object.extend('SubZan');
    let zan = new Zan();
    zan.set('zan', 0);
    zan.set('commentObjId', wxsubcomment.id);
    zan.set('userList', []);
    zan.save()
      .then(zan => {
        let targetZan = AV.Object.createWithoutData('SubZan', zan.id);
        wxsubcomment.set('targetZan', targetZan);
        wxsubcomment.save()
          .then(resolve)
          .catch(reject)
      })
      .catch(reject)
  })
}

/**
 * 更新评论的点赞信息
 * @param type 为 cancel 时取消赞，否则加上
 * @param className Zan / SubZan
 * @param userId
 * @param zanId
 * @returns {Promise<any>}
 */
function updateZan(type, className, userId, zanId) {
  return new Promise((resolve, reject) => {
    let op_str;
    if (type === 'cancel')
      op_str = "update " + className + " set zan=op('Decrement', {'amount': 1}),userList=op('Remove', {'objects':[\"" + userId + "\"]}) where objectId='" + zanId + "'";
    else
      op_str = "update " + className + " set zan=op('Increment', {'amount': 1}),userList=op('AddUnique', {'objects':[\"" + userId + "\"]}) where objectId='" + zanId + "'";

    AV.Query.doCloudQuery(op_str)
      .then(data => { // data 中的 results 是本次查询返回的结果，AV.Object 实例列表
        resolve(data);
      })
      .catch(reject);
  });
}

function queryZan(className, commentId, search) {

  return new Promise((resolve, reject) => {
    let query = new AV.Query(className);
    query
      .equalTo('commentObjId', commentId)
      .containsAll('userList', search)
      .find()
      .then(resolve)
      .catch(reject);
  });
}

module.exports = {
  writeSubComment,
  timeAgoWithTimeStr,
  getTime,
  loginWithWeapp,
  queryWxComment,
  querySubComment,
  writeComment,
  writeZan,
  writeSubZan,
  updateZan,
  queryZan
};