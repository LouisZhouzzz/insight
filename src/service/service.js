// const domain = 'https://insight.service.com/';
const domain = 'https://result.eolinker.com/zdBe81Pa8b841f6b8fe96ba5e8e67a6fac3804a3da7c8b8?uri=';
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
 */
const getAppQuotas = (success, fail, appid) => fetch('/apps/'+ appid +'/quotas', {}, success, fail, 'GET', 'loading...');


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
 * @param usrid
 * @param diagramid
 */
const toggleUserDiagram = (success, fail, usrid, diagramid) => fetch('/users/'+ usrid +'diagram?id=' + diagramid, {}, success, fail, 'PATCH', 'loading...');

/**
 * 向后端发送formid
 * @param formid
 * @param success
 * @param fail
 * @param userid
 */
const patchUserFormId = (success, fail, userid, formid) => fetch('/users/' + userid + '?formid=' + formid, success, fail, 'PATCH');

/**
 * 网络请求封装
 * @param url
 * @param data
 * @param success
 * @param fail
 * @param method
 * @param msg 定义loading框里的文本信息，空则不显示加载框
 */
function fetch (url, data, success, fail, method, msg) {
    wx.showNavigationBarLoading();

    if (msg) wx.showLoading({title: msg});

    wx.request({
        url: domain + url,
        data: data || {},
        header: {
        },
        method: method || 'GET',
        success: function (res) {
            if (res.statusCode === 200 ) success && success(res.data);
            else fail && fail();
        },
        fail: function (res) {
            fail && fail();
        },
        complete: function (res) {
            wx.hideNavigationBarLoading();
            if (msg) wx.hideLoading();
        }
    });
}

module.exports = {
    domain,
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