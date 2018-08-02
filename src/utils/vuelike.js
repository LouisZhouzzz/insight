'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = {
  watch: watch,
  computed: computed

  /**
   * watch实现
   */
};function watch(ctx, obj) {
  Object.keys(obj).forEach(function (key) {
    defineReactive(ctx.data, key, ctx.data[key], function (value) {
      obj[key].call(ctx, value);
    });
  });
}

/**
 * computed实现
 */
function computed(ctx, obj) {
  let keys = Object.keys(obj); // 计算属性键名集合
  let dataKeys = Object.keys(ctx.data); // ctx绑定数据属性集合
  // 因为无法预知计算属性会依赖哪些属性，所以只好逐一监听 data 属性，
  dataKeys.forEach(function (dataKey) {
    defineReactive(ctx.data, dataKey, ctx.data[dataKey]);
  });
  let firstComputedObj = keys.reduce(function (prev, next) {
    // 计算每个计算属性的初始值
    ctx.data.$target = function () {
      // 
      ctx.setData(_defineProperty({}, next, obj[next].call(ctx)));
    };
    prev[next] = obj[next].call(ctx); // 调用计算属性方法，记录返回值。
    // 计算属性方法会触发依赖属性的 get 方法，ctx.data.$target 的值（计算属性方法）会被取到
    ctx.data.$target = null; // push 完及时赋空，以免建立错的依赖关系
    return prev;
  }, {});
  ctx.setData(firstComputedObj);
}

/**
 * 数据监听方法
 */
function defineReactive(data, key, val, fn) {
  let subs = data['$' + key] || [];
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get: function get() {
      if (data.$target) {
        subs.push(data.$target);
        data['$' + key] = subs;
      }
      return val;
    },
    set: function set(newVal) {
      if (newVal === val) return;
      typeof fn === 'function' && fn(newVal);
      if (subs.length) {
        // 更新相关的计算属性
        // 用 setTimeout 因为此时 this.data 还没更新
        setTimeout(function () {
          subs.forEach(function (sub) {
            return sub();
          });
        }, 0);
      }
      val = newVal;
    }
  });
}