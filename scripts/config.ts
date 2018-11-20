const typescript = require('rollup-plugin-typescript')
const node = require('rollup-plugin-node-resolve')
const cjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const alias = require('rollup-plugin-alias')
const { IBuilds } = require('../types/builds.d.ts')

const version = process.env.VERSION || require('../package.json').version

const banner =
  '/*!\n' +
  ` * Vue.js v${version}\n` +
  ` * (c) 2014-${new Date().getFullYear()} Evan You\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const aliases = require('./alias')
const resolve = (p: string) => {
  const base = p.split('/')[0]
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}

const builds: IBuilds = {
  'web-runtime-cjs': {
    entry: resolve('src/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.js'),
    format: 'cjs',
    banner,
  },
  'web-full-cjs': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.js'),
    format: 'cjs',
    banner,
  },
  'web-runtime-esm': {
    entry: resolve('src/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.esm.js'),
    format: 'es',
    banner,
  },
  'web-full-esm': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.js'),
    format: 'es',
    banner,
  },
  'web-runtime-dev': {
    entry: resolve('src/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.js'),
    format: 'umd',
    env: 'development',
    banner,
  },
  'web-runtime-prod': {
    entry: resolve('src/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.min.js'),
    format: 'umd',
    env: 'production',
    banner,
  },
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    banner,
  },
  'web-full-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.min.js'),
    format: 'umd',
    env: 'production',
    banner,
  },
}

function genConfig(name: string) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    output: {
      file: opts.dest,
      format: opts.format,
      name: opts.moduleName || 'Vue',
      banner: opts.banner
    },
    externals: opts.externals,
    plugins: [
      typescript(),
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || [])
  }

  if (opts.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': opts.env,
      '__VERSION__': version
    }))
  }

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}