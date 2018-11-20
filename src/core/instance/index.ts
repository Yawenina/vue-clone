import { initMixin } from './init'
import { stateMixin } from './state'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from "./render"

class Vue {
  constructor(options) {
    this._init(options)
  }
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue