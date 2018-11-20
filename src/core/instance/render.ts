function installRenderHelpers(Vue) {
  
}

export function renderMixin(Vue) {
  installRenderHelpers(Vue.prototype)
  Vue.prototype.$nextTick = function() {}
  Vue.prototype._render = function() {}
}