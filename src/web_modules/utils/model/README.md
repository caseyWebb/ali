[Home](../../../) / Utils / model

# utils/model

This file serves as the counterpart to utils/collection, and is intended to be
used for API endpoints that return a single model instance (rather than, well, a collection).

It provides defaults that work OOTB in many cases, but allows for easy overwriting
via inheritance and composition.

This file contains one export: a factory function that returns a new `Model` class
that may then be instantiated.


## exports.modelConstructorFactory(modelConfig) => class Model

Creates a new model class based on `modelConfig`.

### Configuration

| Option            | Description                                                                         |
| ----------------- | ----------------------------------------------------------------------------------- |
| api               | controller name that model should use                                               |
| extend (optional) | class that the new model constructor should extend, used to supply custom functions |

### Usage

```javascript
// import model class factory
import { modelConstructorFactory } from 'utils/model'

// create new model class
const Course = modelConstructorFactory({ api: 'InstructorCourse' })
```


## Model class

**NOTE:** This is the new class returned by `modelConstructorFactory`.

### API

#### new Model(m, params) => model

Instantiates a new `Model` instance

| Argument | Description                                                                         |
| -------- | ----------------------------------------------------------------------------------- |
| m        | JS object containing model data, usually API response                               |
| params   | observable params object (containing params & query)                                |

---

#### Static Members

##### Model.api[method]\([endpoint = '', params = {}])

Convenience accessor for ajax calls to this model's controller.
Equivalent to `import 'utils/api'[method](modelConfig.api + endpoint, params)`.

##### Model.factory([params]) => Promise.resolve(model)

Instantiates new instance. Params may be plain js or observable. Used instead of
constructor so that it may be promised, as well as to enable caching.

##### Model.fetch([params]) => Promise.resolve(m)

Function that returns model data. By default, `Model.api.get(params)`.

##### Model.invalidate()

Clears any cached values for the Model class

##### Model.retrieve(params) => Promise.resolve(m)

Attempts to get model data from cache, else calls `Model.fetch(params)` (whose response is then cached)

---

#### Instance Members

##### model.data

Model data (usually api response)

##### model.params

`params` that were passed into the constructor/factory

##### model.api[method]\([endpoint = '', params = {}])

Accessor for `Model.api`

##### model.asObservable() => model

Creates a clone of the current model with `model.data` cast to observables, and
wires up subscription to react to upstream changes to the `params` used to construct
the model.

##### model.save() => Promise.resolve()

Saves the model instance. By default, posts the model to a `save` endpoint on the
model's controller.

##### model.dispose()

Disposes a model instance

---

#### Extendable Members

While technically you may overwrite any function, `fetch`, `save`, and `invalidate`
should be the only ones you ever need to, if any.

For example, suppose the api to save the model doesn't simply expect the model to be
posted back to a `Save` endpoint, but rather wants some deltas on an `Update` endpoint.

You could do this with...

```javascript
import { modelConstructorFactory } from 'utils/model'
const Something = modelConstructorFactory({
  api: 'InstructorSomething',
  extend: class {
    static calculateDeltas(data) {
      return // do some calculations...
    },
    save() {
      const deltas = Something.calculateDeltas(this.data)

      // NOTE: we are returning a promise. This is important.
      return this.api.post('Update', deltas)
    }
  }
})
```

Because the class we pass to `extend` is actually used as the base class, there
is no need to worry about using `super` to ensure everything plays nicely. `fetch`
and `save` will automatically work with caching.


## Best Practices

- Always use `Model.factory` to instantiate new instances
- Use `Model.retrieve` rather than `Model.fetch` to utilize caching

## Kitchen-Sink Example

```javascript
import ko from 'knockout'
import { modelConstructorFactory } from 'utils/model'

const foos = ['foo', 'bar', 'baz', 'qux']

const Foo = modelConstructorFactory({
  api: 'InstructorFoos',
  extend: class {
    static getFoo(i) {
      return foos[i]
    }

    randomize() {
      this.data.value = Foo.getFoo(Math.floor(Math.random() * 4))
    }

    fetch(params) {
      return Promise.resolve({ value: Foo.getFoo(params().index) })
    }

    save() {
      foos[this.params().index] = this.data.value
      return Promise.resolve()
    }
  }
})

const query = ko.observable({ index: 0 })

Foo.factory(query).then((_foo) => {
  const foo = _foo.asObservable()

  query({ index: 1 })
  // _foo.data.value === 'foo'
  // foo.data.value() === 'bar'

  foo.randomize()
  // foo.data.value() === <some random foo>

  foo.data.value('not bar')
  foo.save()
  // foos = ['foo', 'not bar', 'baz', 'qux']
})
```
