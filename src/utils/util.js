'use strict';

const formatTime = function formatTime(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

let formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

/**
 * 整合 wx.showToast 与 wx.hideToast
 * @param config
 * @param duration
 */
function showToast (config, duration) {
  wx.showToast(config);
  setTimeout(function () {
    wx.hideToast();
  }, duration || 1000);
}

/**
 * 根据日期字符串返回间隔时间
 * @param dateString
 * @returns {*}
 */
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

    var days = Math.floor(diffValue / (24 * 3600 * 1000));

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

module.exports = {
};

module.exports = {
  formatTime: formatTime,
  showToast: showToast,
  timeAgoWithTimeStr: timeAgoWithTimeStr,
  getTime: getTime
};