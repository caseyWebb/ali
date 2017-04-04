import ko from 'knockout'
import { clone, isFunction, each, map } from 'lodash'
import castThenable from 'utils/cast-thenable'

export default function plugin({ components: getComponents }) {
  if (getComponents) {
    return (ctx) => {
      let _components
      return {
        beforeRender() {
          ctx.queue(fetch(getComponents).then((components) => {
            _components = components
            return each(components, (c, n) => {
              if (!ko.components.isRegistered(n)) {
                ko.components.register(n, clone(c))
              }
            })
          }))
        },
        beforeDispose() {
          each(_components, (v, k) => {
            ko.components.unregister(k)
          })
        }
      }
    }
  }
}

export async function fetch(components) {
  const config = {}
  const promises = map(
      isFunction(components)
      ? components()
      : components,
    (_v, k) => castThenable(_v).then((v) => (config[k] = v.default || v)))

  await Promise.all(promises)

  return config
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
