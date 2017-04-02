import { isFunction, invokeMap, map } from 'lodash'
import castThenable from 'utils/cast-thenable'

export default function plugin({ styles: _styles }) {
  if (_styles) {
    let styles
    return (ctx) => ({
      beforeRender() {
        ctx.queue(fetch(isFunction(_styles) ? _styles() : _styles).then((s) => {
          styles = s
          invokeMap(styles, 'use')
        }))
      },
      afterDispose() {
        invokeMap(styles, 'unuse')
      }
    })
  }
}

export function fetch(styles) {
  return Promise.all(map(styles, castThenable))
}
