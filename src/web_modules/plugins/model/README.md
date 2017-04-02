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

**NOTE:** By default, this plugin queues the model initialization so that other middleware
may continue running while async operations complete (i.e. an ajax api call). This
means that `ctx.model` *IS NOT* available in subsequent beforeRender middleware.
If you need to disable this behavior — e.g. if a nested view requirer the parent data
as part of its api call — you may specify `queueModel: false` in the view
declaration. It is preferable however to see if you can refactor your api so that
the child calls only require the route params, for example, `ctx.$parent.params.id`
is always available, whereas you'd have to disable queueing to get `ctx.$parent.model.data.id`.

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
