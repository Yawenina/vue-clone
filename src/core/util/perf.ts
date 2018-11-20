import { inBrowser } from './env'


export let mark: (name: string) => void
export let measure: (name: string, start: string, end: string) => void

if (process.env.NODE_ENV !== 'production') {
  const perf = inBrowser && window.performance
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = (tag: string) => perf.mark(tag)
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag)
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
      perf.clearMeasures(name) 
    }
  }
}
