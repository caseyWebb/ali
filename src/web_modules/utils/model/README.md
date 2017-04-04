# model util

Provides a factory for creating easily composable/extensible model classes

Exports `{ modelConstructorFactory }`

## modelConstructorFactory(config) => class Model

Creates a new model class based on `config`

### Configuration

| Option            | Description                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| mixins (optional) | array of mixins to include (used to include common functionality)                     |
| extend (optional) | class that the new model constructor should extend (used to supply custom functions)  |

### Usage

```javascript
import ajax from 'axios'
import { modelConstructorFactory } from 'utils/model'
import ajaxMixin from 'mixins/ajax'
import cachingMixin from 'mixins/caching'

const User = modelConstructorFactory({
  mixins: [
    ajaxMixin({ url: '/api/user' }),
    cachingMixin()
  ],
  extend: class {
    async save() {
      ajax.post(`/api/user/${this.data.id()}`, this.data)
    }
  }
})
```


## Model Class

**NOTE:** This is the new class returned by `modelConstructorFactory`

### API

#### new Model(m, params) => model

Instantiates a new `Model` instance

| Argument | Description                                                                         |
| -------- | ----------------------------------------------------------------------------------- |
| m        | JS object containing model data, usually API response                               |
| params   | observable params object (containing params & query)                                |

---

#### Instance Members

##### model.data
Model data (usually api response)

##### model.params
`params` that were passed into the constructor/factory

##### model.reload() => Promise
Reloads a model — calls fetch and merges new data onto `this.data`

##### model.dispose()
Disposes a model

#### Static Members

##### Model.factory([params]) => Promise<model>
Instantiates new model. Params may be plain js or observable. Used instead of
constructor so async isn't harder than it has to be.

##### Model.fetch([params]) => Promise<data>
Return JS data for model

**STUB:** This function is an interface so-to-speak and must be implemented. The
easiest way to do this for most models is via the [ajax mixin](../../mixins/ajax).
Otherwise, a static async fetch function must be defined on the class passed to `extend`.

---

## Kitchen-Sink Example

```javascript
import ko from 'knockout'
import { modelConstructorFactory } from 'utils/model'
import ajaxMixin from 'mixins/ajax'

const foos = ['foo', 'bar', 'baz', 'qux']

const Foo = modelConstructorFactory({
  mixins: [
    ajaxMixin({ url: '/api/foos' })
  ],
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
