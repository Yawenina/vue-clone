import { mark, measure } from '../util/perf'
import config from '../config'
import { formatComponentName } from '../util/debug'

let uid = 0

export function initMixin(Vue) {
  Vue.prototype_init = function() {
    const vm: Component = this
    vm._uid = uid++

    // performance start
    let startTag: string
    let endTag: string
    if (
      process.env.NODE_ENV !== 'production' &&
      config.performance &&
      mark
    ) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }
    // ...
    // performance end
    if (
      process.env.NODE_ENV !== 'production' &&
      config.performance &&
      mark
    ) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }
  }
}