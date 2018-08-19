const domain = 'https://www.hi5399.xyz';
// const domain = 'https://result.eolinker.com/zdBe81Pa8b841f6b8fe96ba5e8e67a6fac3804a3da7c8b8?uri=';

/**
 * 获取图表信息
 * @param id
 */
const getDiagram = (id) => fetchByPromise('/diagrams/' + id, {}, 'GET');

/**
 * 获取后台概览信息
 */
const getSystem = () => fetchByPromise('/system',{}, 'GET');

/**
 * 获取公告信息
 */
const getAnnouncements = () => fetchByPromise('/system/announcements', {}, 'GET');

/**
 * 获取应用列表
 */
const getApps = () => fetchByPromise('/apps', {}, 'GET');

/**
 * 获取应用概览信息
 * @param appid
 */
const getApp = (appid) => fetchByPromise('/apps/' + appid, {},  'GET');

/**
 * 获取应用全部指标
 * @param appid
 * @param userid
 */
const getAppQuotas = (appid, userid) => fetchByPromise('/apps/'+ appid +'/quotas?openid=' + userid, {}, 'GET');

/**
 * 获取异常详情
 * @param id
 */
const getException = (id) => fetchByPromise('/exceptions/' + id, {}, 'GET');

/**
 * 获取异常信息列表
 */
const getUnhandledExceptions = () => fetchByPromise('/unhandledexceptions', {}, 'GET');

/**
 * 获取历史异常信息
 * @param page
 */
const getHandledExceptions = (page) => fetchByPromise('/handledexceptions?page=' + page, {}, 'GET');

/**
 * 获取收藏列表
 * @param id
 */
const getUserDiagrams = (id) => fetchByPromise('/users/'+ id +'/diagrams', {}, 'GET');


/**
 * 变更图表的收藏状态
 * @param userid
 * @param diagramid
 * @param operflag
 */
const toggleUserDiagram = (userid, diagramid, operflag) => fetchByPromise('/users/'+ userid +'/diagrams/' + diagramid + '?operflag=' + operflag, {},'PUT');



/**
 * 向后端发送formid
 * @param userId
 * @param formId
 * @returns {Promise<any>}
 */
const patchUserFormId = (userId, formId) => {
  // 虚拟机测试时不发送formid
  if (formId.indexOf('mock') === -1) return new Promise(resolve => { setTimeout(resolve, 500) });
  return fetchByPromise('/users/' + userId + "?formid=" + formId, {}, 'PUT')
};

/**
 * 使用 promise 封装原生 request 请求
 * @param url
 * @param data
 * @param method
 * @returns {Promise<any>}
 */
function fetchByPromise(url, data, method) {

  wx.showNavigationBarLoading();

  return new Promise((resolve, reject) => {
    wx.request({
      url: domain + url,
      data: data || {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: method || 'GET',
      success (res) {
        if (res.statusCode === 200) resolve && resolve(res);
        else reject && reject(res);
      },
      fail (res) {
        reject && reject(res);
      },
      complete (res) {
        wx.hideNavigationBarLoading();
      }
    });
  })
}


/************************************* 使用 promise 封装wx.login 等原生请求 ***********************************************/

/**
 * 获取用户设置
 * @returns {Promise<any>}
 */
function wxSetting () {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: resolve,
      fail: reject
    });
  })
}

/**
 * 获取用户信息
 * @returns {Promise<any>}
 */
function wxUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: resolve,
      fail: reject
    })
  })
}

/**
 * 在用户授权过的情况下通过设置直接获取用户个人信息
 * @returns {Promise<any>}
 */
function getUserInfoBySetting () {
  return new Promise((resolve, reject) => {
    wxSetting()
      .then(res => {
        // 若未授权
        if (!res.authSetting['scope.userInfo']) resolve({userInfo: false});
        // 若已授权
        wxUserInfo()
          .then(resolve)
          .catch(reject);
      })
      .catch(reject)
  })
}

/*
调用接口wx.login() 获取临时登录凭证（code）
*/
function wxLogin () {
  return new Promise ((resolve, reject) => {
    wx.login({
      success: resolve,
      reject: reject
    })
  })
}

/*
  将临时登录凭证发送到后台获取自定义登录态
 */
function getLoginState () {
  return wxLogin().then((res) => {
    return fetchByPromise(
      '/loginstate?code=' + res.code,
      {}
    )
  })
}


module.exports = {
  wxSetting,
  wxUserInfo,
  domain,
  getLoginState,
  getException,
  getDiagram,
  getSystem,
  getApps,
  getApp,
  getAppQuotas,
  getHandledExceptions,
  getUnhandledExceptions,
  getUserDiagrams,
  patchUserFormId,
  toggleUserDiagram,
  getAnnouncements,
  getUserInfoBySetting
};