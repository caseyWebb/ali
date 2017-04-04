import { isFunction, defaults, map } from 'lodash'
import ko from 'knockout'
import castThenable from 'utils/cast-thenable'

export default function plugin({ component }) {
  if (component) {
    return function * (ctx) {
      const componentName = ctx.canonicalPath
      ctx.route.component = componentName

      ctx.queue(fetch(component)
        .then((componentConfig) => {
          defaults(componentConfig, { synchronous: true })
          ko.components.register(componentName, componentConfig)
        }))

      yield

      ko.components.unregister(componentName)
    }
  }
}

export async function fetch(component) {
  const componentConfig = {}
  const promises = map(
      isFunction(component)
      ? component()
      : component,
    (_v, k) => castThenable(_v).then((v) => (componentConfig[k] = v.default || v)))

  await Promise.all(promises)

  return componentConfig
}
