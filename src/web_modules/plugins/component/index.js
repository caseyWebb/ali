import { isFunction, defaults, map } from 'lodash-es'
import ko from 'knockout'
import castThenable from 'utils/cast-thenable'

export default function plugin({ component }) {
  if (component) {
    let componentName
    return (ctx) => ({
      beforeRender() {
        componentName = ctx.canonicalPath
        ctx.route.component = componentName

        ctx.queue(fetch(isFunction(component) ? component() : component)
          .then((componentConfig) => {
            defaults(componentConfig, { synchronous: true })
            ko.components.register(componentName, componentConfig)
          }))
      },
      afterRender() {
        ko.components.unregister(componentName)
      }
    })
  }
}

export function fetch(component) {
  const componentConfig = {}
  const promises = map(component, (_v, k) => castThenable(_v).then((v) => (componentConfig[k] = v.default || v)))
  return Promise.all(promises).then(() => componentConfig)
}
