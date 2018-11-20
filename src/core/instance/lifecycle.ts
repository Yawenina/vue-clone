export function lifecycleMixin(Vue) {
  Vue.prototype._update = function() {}
  Vue.prototype.$forceUpdate = function() {}
  Vue.prototype.$destroy = function() {}
}