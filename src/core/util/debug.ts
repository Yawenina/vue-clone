let warn: (msg: string) => void
let formatComponentName: (component: any, includeFile: false) => void


warn  = function() {}
formatComponentName = function() {}

if (process.env.NODE_ENV !== 'production') {
  warn = (msg: string) => {
    console.error(`[Vue warn]: ${msg}`)
  }
}

export { warn, formatComponentName }
