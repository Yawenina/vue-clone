import { warn } from '../util/index'

function set() {}
function delete() {}

export function stateMixin(Vue) {
  // 代理 $data, $props 并禁止修改
  Object.defineProperties(Vue.prototype, {
    '$data': {
      get() { return this._data}
    },
    '$props': {
      get() { return this._props }
    }
  })
  if (process.env.NODE_ENV !== 'production') {
    Object.defineProperties(Vue.prototype, {
      '$data': {
        set() {
          warn(
            'Avoid replacing instance root $data. ' +
            'Use nested data properties instead.'
          )
        }
      },
      '$props': {
        set() { return this._props }
      }
    })
  }

  Vue.prototype.$set = set
  Vue.prototype.$delete = delete

  Vue.prototype.$watch = function() {}
}