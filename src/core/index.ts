import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'

initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get() {}
})
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get() {}
})

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: ''
})


Vue.version = '__VERSION__'

export default Vue