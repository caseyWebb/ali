# model plugin

Creates and loads a [model](../../utils/model/) and attaches it to `ctx.model`.

Accepts:
  - a model config object
  - a model class
  - a createModel factory that receives `ctx` as its first argument and returns a model instance

If using a config object or class, the constructor will be passed `ko.pureComputed(() => extend({}, params, ko.toJS(ctx.query)))`,
where `params` are the accumulated `ctx.params` for this as well as any parent routers
(`extend({}, ..., ctx.$parents[2].params, ctx.$parents[1].params, ctx.$parents[0].params, ctx.params)`).

Code-splitting is supported via `import()`-ing one of the accepted configs
from a separate file.

e.x.
```javascript
export default {
  // config object, this will be passed to `createModelConstructor`
  model: { api: 'InstructorSomething' },

  // model class, async w/ code splitting RECOMMENDED
  model: () => import('./model')
  // model.js
  // import { createModelConstructor } from 'utils/model'
  // export default createModelConstructor({ api: 'InstructorSomething' })o

  // factory function, used in special cases. Should return model instance.
  model: {
    createModel: (ctx) => new Model(ctx)
  }
}
```

You may also load multiple models by nesting the configs...

i.e.

```javascript
export default {
  model: () => ({
    foo: import('./foo'),
    bar: import('./bar')
  })
}
```

The model instances will be available as `ctx.model.foo` and `ctx.model.bar`.
