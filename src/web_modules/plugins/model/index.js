import { each, extend, defaults, mapValues, isFunction, isUndefined, values, memoize, noop } from 'lodash'
import ko from 'knockout'
import { modelConstructorFactory } from 'utils/model'

const createModelConstructor = memoize(modelConstructorFactory)

export default ({ model: modelConfig }) => {
  if (modelConfig) {
    return (ctx) => ({
      beforeRender() {
        if (modelConfig.api || modelConfig.createModel || isFunction(modelConfig)) {
          ctx.queue(getModel(modelConfig, ctx)
            .then((m) => (ctx.model = m.default || m))
            .catch(noop))
        } else {
          ctx.model = {}
          ctx.queue(Promise.all(values(mapValues(modelConfig, (c, n) =>
            getModel(c, ctx)
              .then((m) => (ctx.model[n] = m.default || m))
              .catch(noop)))))
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
    return modelConfig().then(({ default: model }) => model.factory(params))
  } else {
    const Model = createModelConstructor(modelConfig)
    return Model.factory(params)
  }
}
