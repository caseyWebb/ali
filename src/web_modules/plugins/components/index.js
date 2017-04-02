import ko from 'knockout'
import { clone, isFunction, each, reduce } from 'lodash'
import castThenable from 'utils/cast-thenable'

export default function plugin({ components: getComponents }) {
  if (getComponents) {
    return (ctx) => {
      let components
      return {
        beforeRender() {
          components = isFunction(getComponents) ? getComponents() : getComponents
          ctx.queue(fetch(components).then((components) => each(components, (c, n) => {
            if (!ko.components.isRegistered(n)) {
              ko.components.register(n, clone(c))
            }
          })))
        },
        beforeDispose() {
          each(components, (v, k) => {
            ko.components.unregister(k)
          })
        }
      }
    }
  }
}

export function fetch(components = {}) {
  const ret = {}
  return Promise.all(reduce(components, (accum, componentConfig, componentName) => {
    if (isFunction(componentConfig.then)) {
      accum.push(castThenable(componentConfig).then((_v) => (ret[componentName] = _v)))
    }
    return accum
  }, []))
    .then(() => ret)
}
