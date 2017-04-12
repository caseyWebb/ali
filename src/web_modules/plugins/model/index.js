import { isFunction, isPlainObject, isUndefined, each, extend, defaults, map, mapValues } from 'lodash'
import ko from 'knockout'
import resolveAny from 'utils/resolve-any'

export default ({
  model: _models,
  queueModel = true
}) => {
  if (_models) {
    return function * (ctx) {
      // we can safely do this b/c the promise chain will be resolved by the router
      // before continuing to further yields 
      let normalizedModels

      const p = fetch(_models)
        .then((models) => normalizeConfig(models))
        .then((models) => (normalizedModels = models))
        .then((models) => createModels(models, ctx))
        .then((models) => attachToCtx(models, ctx))

      if (queueModel) {
        ctx.queue(p)
        yield
      } else {
        yield p
      }

      yield

      if (ctx.model && ctx.model.dispose && normalizedModels.default._autoDispose !== false) {
        ctx.model.dispose()
      } else if (ctx.models) {
        each(ctx.models, (m, v) => normalizedModels[v]._autoDispose !== false && m.dispose
          ? m.dispose()
          : false)
      }
    }
  }
}

export async function fetch(_Model) {
  return await resolveAny(
    isFunction(_Model) && !isFunction(_Model.factory)
      ? _Model()
      : _Model
  )
}

function normalizeConfig(Model, recursive) {
  if (isPlainObject(Model)) {
    if (Model.createModel) {
      Model._autoDispose = false
      return recursive
        ? Model
        : { default: Model }
    } else {
      return mapValues(Model, (_Model) => normalizeConfig(_Model, true))
    }
  } else {
    return recursive
      ? {
        createModel: (params) => Model.factory(params)
      }
      : {
        default: {
          createModel: (params) => Model.factory(params)
        }
      }
  }
}

export async function createModels(models, ctx) {
  const params = getParams(ctx)
  const ret = {}
  const p = map(models, (m, name) => resolveAny(m.createModel(params)).then((model) => (ret[name] = model)))
  await Promise.all(p)
  return ret
}

export function attachToCtx(models, ctx) {
  if (models.default) {
    ctx.model = models.default
  } else {
    ctx.models = models
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
