## TypeScript 相关
1. path alias 配置： 
```
  "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
  "paths": {
    "vue": ["src/platforms/web/entry-runtime-with-compiler"],
    "compiler": ["src/compiler"],
    "core/*": ["src/core/*"],
    "web": ["src/platforms/web"],
    "weex": ["src/platforms/weex"],
    "sfc": ["src/sfc"],
  },  
```
## JS 相关
1. 判断是否通过`new`调用该构造函数：
- `this instanceof Vue`
- 使用`class`声明，未使用`new`则语言会自动报错

2. 一个类有很多原型方法，写在一个声明中有上千行，如何解决？
把原型方法分类，并将构造函数传入。
  ```js
    function Vue (options) {
      if (process.env.NODE_ENV !== 'production' &&
        !(this instanceof Vue)
      ) {
        warn('Vue is a constructor and should be called with the `new` keyword')
      }
      this._init(options)
    }

    // Mixin
    initMixin(Vue)
    stateMixin(Vue)
    eventsMixin(Vue)
    lifecycleMixin(Vue)
    renderMixin(Vue)

    export default Vue
  ```

3. 代理关键数据并禁止修改
```
const dataDef = {}
  dataDef.get = function () { return this._data }
  const propsDef = {}
  propsDef.get = function () { return this._props }
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      )
    }
    propsDef.set = function () {
      warn(`$props is readonly.`, this)
    }
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)
```

## 看源码相关
1. 从上到下，找到最底层；再一层层从下到上找回去