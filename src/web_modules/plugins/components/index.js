import ko from 'knockout'
import { isFunction, clone, each } from 'lodash'
import resolveAny from 'utils/resolve-any'

export default function plugin({ components: getComponents }) {
  if (getComponents) {
    return function * (ctx) {
      let _components

      ctx.queue(fetch(getComponents).then((components) => {
        _components = components
        return each(components, (c, n) => {
          if (!ko.components.isRegistered(n)) {
            ko.components.register(n, clone(c))
          }
        })
      }))

      yield

      // afterRender

      yield

      each(_components, (v, k) => {
        ko.components.unregister(k)
      })
    }
  }
}

export async function fetch(components) {
  return await resolveAny(isFunction(components) ? components() : components)
}

// export async function fetch(components = {}) {
//   const ret = {}
//
//   await Promise.all(
//     reduce(
//       isFunction(components)
//         ? components()
//         : components,
//       (accum, componentConfig, componentName) => {
//         if (isFunction(componentConfig.then)) {
//           accum.push(castThenable(componentConfig).then((_v) => (ret[componentName] = _v)))
//         }
//         return accum
//       },
//       []
//     )
//   )
//
//   return ret
// }
