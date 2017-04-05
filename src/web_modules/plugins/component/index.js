import { isFunction, defaults } from 'lodash'
import ko from 'knockout'
import resolveAny from 'utils/resolve-any'

export default function plugin({ component }) {
  if (component) {
    return function * (ctx) {
      ctx.route.component = ctx.canonicalPath

      ctx.queue(fetch(component)
        .then((componentConfig) => {
          defaults(componentConfig, { synchronous: true })
          ko.components.register(ctx.route.component, componentConfig)
        }))

      yield

      ko.components.unregister(ctx.route.component)
    }
  }
}

export async function fetch(component) {
  return await resolveAny(isFunction(component) ? component() : component)
}
