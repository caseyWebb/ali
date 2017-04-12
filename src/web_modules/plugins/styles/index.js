import { isFunction, invokeMap, map } from 'lodash'
import castThenable from 'utils/cast-thenable'

export default ({ styles: _styles }) => {
  if (_styles) {
    return function * (ctx) {
      let styles

      const p = fetch(_styles).then((s) => {
        styles = s
        invokeMap(styles, 'use')
      })

      ctx.queue(p)

      yield
      yield
      yield

      invokeMap(styles, 'unuse')
    }
  }
}

export function fetch(styles) {
  return Promise.all(map(isFunction(styles) ? styles() : styles, castThenable))
}
