import { isFunction, extend } from 'lodash'
import Query from 'ko-querystring'

export default ({ query: queryConfig }) => (ctx) => {
  const group = ctx.canonicalPath

  if (queryConfig) {
    return {
      beforeRender() {
        ctx.query = getQuery(ctx, group, queryConfig)
      },
      afterDispose() {
        if (!queryConfig.createQuery) {
          ctx.query.dispose()
        }
      }
    }
  }
}

function getQuery(ctx, group, config) {
  const raw = extend({}, Query.shared, Query.fromQS(name))

  if (isFunction(config)) {
    return new Query(config(ctx, raw), group)
  } else if (config.createQuery) {
    return config.createQuery(ctx, raw, group)
  } else {
    return new Query(config, group)
  }
}
