// const domain = 'https://www.hi5399.xyz';
const domain = 'https://result.eolinker.com/zdBe81Pa8b841f6b8fe96ba5e8e67a6fac3804a3da7c8b8?uri=';


/**
 * 发送临时登录凭证以换取自定义登录态
 * @param success
 * @param fail
 * @param code
 */
const login = (success, fail, code) => fetch('/loginstate?code=' + code, {}, success, fail);

/**
 * 获取图表信息
 * @param success
 * @param fail
 * @param id
 */
const getDiagram = (success, fail, id) => fetch('/diagrams/' + id, {}, success, fail);

/**
 * 获取后台概览信息
 * @param success
 * @param fail
 */
const getSystem = (success, fail) => fetch('/system', {}, success, fail);

/**
 * 获取应用列表
 * @param success
 * @param fail
 */
const getApps = (success, fail) => fetch('/apps', {}, success, fail, 'GET', 'loading...');

/**
 * 获取应用概览信息
 * @param success
 * @param fail
 * @param appid
 */
const getApp = (success, fail, appid) => fetch('/apps/' + appid, {}, success, fail, 'GET', 'loading...');

/**
 * 获取应用全部指标
 * @param success
 * @param fail
 * @param appid
 * @param userid
 */
const getAppQuotas = (success, fail, appid, userid) => fetch('/apps/'+ appid +'/quotas?openid=' + userid, {}, success, fail, 'GET', 'loading...');

/**
 * 获取应用详情
 * @param success
 * @param fail
 * @param id
 */
const getException = (success, fail, id) => fetch('/exception/' + id, {}, success, fail);

// const getException = (success, fail, id) => fetch('/exception/ID', {}, success, fail);

/**
 * 获取异常信息列表
 * @param success
 * @param fail
 * @param page 指定页码
 * @param size 指定单页信息项数
 */
const getUnhandledExceptions = (success, fail, page, size) => fetch('/unhandledexceptions?page=' + page + '&size=' + size, {}, success, fail, 'GET', 'loading...');

/**
 * 获取历史异常信息
 * @param success
 * @param fail
 * @param page
 * @param size
 */
const getHandledExceptions = (success, fail, page, size) => fetch('/handledexceptions?page=' + page + '&size=' + size, {}, success, fail, 'GET', 'loading...');


/**
 * 获取收藏列表
 * @param success
 * @param fail
 * @param id
 */
const getUserDiagrams = (success, fail, id) => fetch('/users/'+ id +'/diagrams', {}, success, fail);


/**
 * 变更图表的收藏状态
 * @param success
 * @param fail
 * @param userid
 * @param diagramid
 * @param operflag
 */
const toggleUserDiagram = (success, fail, userid, diagramid, operflag) =>
  fetch('/users/'+ userid +'/diagrams/' + diagramid + '?operflag=' + operflag, {}, success, fail, 'PUT');

/**
 * 向后端发送formid
 * @param formid
 * @param success
 * @param fail
 * @param userid
 */
const patchUserFormId = (success, fail, userid, formid) => {
  if (formid === 'the formId is a mock one') return;
  wx.request({
    url: domain + '/users/' + userid + "?formid=" + formid,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: 'PUT',
    success: function (res) {
      if (res.statusCode === 200) success && success(res.data);
      else fail && fail();
    },
    fail: function (res) {
      fail && fail();
    }
  });
};

/**
 * 网络请求封装
 * @param url
 * @param data
 * @param success
 * @param fail
 * @param method
 * @param msg 定义loading框里的文本信息，空则不显示加载框
 */
function fetch(url, data, success, fail, method, msg) {
  wx.showNavigationBarLoading();

  // if (msg) wx.showLoading({title: msg});

  wx.request({
    url: domain + url,
    data: data || {},
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: method || 'GET',
    success: function (res) {
      if (res.statusCode === 200) success && success(res.data);
      else fail && fail();
    },
    fail: function (res) {
      fail && fail();
    },
    complete: function (res) {
      wx.hideNavigationBarLoading();
      // if (msg) wx.hideLoading();
    }
  });
}

module.exports = {
  domain,
  getException,
  login,
  getDiagram,
  getSystem,
  getApps,
  getApp,
  getAppQuotas,
  getHandledExceptions,
  getUnhandledExceptions,
  getUserDiagrams,
  patchUserFormId,
  toggleUserDiagram
};