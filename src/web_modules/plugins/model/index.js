import { each, extend, defaults, mapValues, isFunction, isUndefined, values, memoize, noop } from 'lodash'
import ko from 'knockout'
import { modelConstructorFactory } from 'utils/model'

const createModelConstructor = memoize(modelConstructorFactory)

export default ({ model: modelConfig, queueModel = true }) => {
  if (modelConfig) {
    return (ctx) => ({
      beforeRender() {
        if (modelConfig.api || modelConfig.createModel || isFunction(modelConfig)) {
          const p = getModel(modelConfig, ctx)
            .then((m) => (ctx.model = m.default || m))
            .catch(noop)

          if (queueModel) {
            ctx.queue(p)
          } else {
            return p
          }
        } else {
          ctx.model = {}
          const p = Promise.all(values(mapValues(modelConfig, (c, n) =>
            getModel(c, ctx)
              .then((m) => (ctx.model[n] = m.default || m))
              .catch(noop))))

          if (queueModel) {
            ctx.queue(p)
          } else {
            return p
          }
        }
      },
      beforeDispose() {
        if (ctx.model.dispose) {
          ctx.model.dispose()
        } else {
          each(ctx.model, (m) => m.dispose ? m.dispose() : false)
        }
      }
    })
  }
}

export function fetch(model) {
  return isFunction(model)
    ? model().then(({ default: _default }) => _default)
    : model
}

function getParams(ctx) {
  const query = isUndefined(ctx.query) ? {} : ctx.query.asObservable()

  const params = {}
  while (ctx) {
    defaults(params, ctx.params)
    ctx = ctx.$parent
  }

  return ko.pureComputed(() => extend(params, ko.unwrap(query)))
}

function getModel(modelConfig, ctx) {
  const params = getParams(ctx)

  if (modelConfig.createModel) {
    return modelConfig.createModel(ctx)
  } else if (isFunction(modelConfig)) {
    return fetch(modelConfig).then((model) => model.factory(params))
  } else {
    const Model = createModelConstructor(modelConfig)
    return Model.factory(params)
  }
}
