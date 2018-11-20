import { warn } from '../util'
import { ASSET_TYPES } from 'shared/constants'

export function initGlobal(Vue) {
  const configDef = {}
  configDef.get = () => configDef
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(`Do not replace the Vue.config object, set individual fields instead.`)
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  Vue.util = {

  }

  Vue.set = function() {}
  Vue.delete = function() {}
  Vue.nextTick = function() {}

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach((type: string) => {
    Vue.options[`${type}s`] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  extend(Vue.options.components, builtInComponents)

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegister(Vue)
}