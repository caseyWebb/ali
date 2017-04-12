import { isFunction, extend } from 'lodash'
import Query from 'ko-querystring'

export default ({ query: queryConfig }) => {
  if (queryConfig) {
    return function * (ctx) {
      ctx.query = getQuery(ctx, queryConfig)
      yield
      yield
      yield
      ctx.query.dispose()
    }
  }
}

function getQuery(ctx, config) {
  const group = ctx.canonicalPath
  const raw = extend({}, Query.shared, Query.fromQS(name))

  if (isFunction(config)) {
    return new Query(config(ctx, raw), group)
  } else if (config.createQuery) {
    return config.createQuery(ctx, raw, group)
  } else {
    return new Query(config, group)
  }
}
