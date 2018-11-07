## VUE 构建
- Rollup
    - rollup-plugin-node-resolve: 告诉 rollup 去哪里找这些node modules
    - rollup-plugin-common-js: 使以 commonjs 编写的代码可以通过 es6 module 语法引入
    - rollup-plugin-replace: 指定一个全局变量的值，如 process.env.NODE_ENV
    - rooluo-plugin-alias: 别名。避免`../../`重构时的痛苦。