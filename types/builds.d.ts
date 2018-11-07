export interface IConfig {
  entry: string,
  dest: string,
  format: 'umd' | 'cjs' | 'es',
  moduleName?: string,
  banner?: string,
  externals?: string
  plugins?: Array<any>,
  env?: 'development' | 'production'
  alias?: {[index: string]: string}
}
  
export interface IBuilds {
  [index: string]: IConfig
}