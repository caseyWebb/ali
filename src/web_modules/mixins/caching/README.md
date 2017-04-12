# caching mixin

Enables short term caching for models in browser memory. Memoizes `fetch`.

### Usage

```javascript
import { createModelConstructor } from 'utils/model'
import cachingMixin from 'mixins/caching'

export default createModelConstructor({
  mixins: [
    cachingMixin(opts)
  ]
})
```

### Options

All options are optional

| Option          | Default   | Description                                                                                                           |
| --------------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| ttl             | Infinity  | number of seconds to keep cache                                                                                       |
| ttlAutoReload   | false     | call `reload` when the cach expires                                                                                   |
| linked          | undefined | array of models that should be invalidated when this one is                                                           |
| trackBy         | undefined | schema to use to track caching. when dealing with lists of data, can lower memory usage. see below for more details.  |

##### Linked Models

Use the `linked` option to ensure that your data doesn't stale across related models.

For instance, if saving an instance of the "foo" model will cause the data for a
"bar" model to change, link them as such...

```javascript
import { createModelConstructor } from 'utils/model'
import cachingMixin from 'mixins/caching'
import Bar from '../bar/model'

const Foo = createModelConstructor({
  mixins: [
    cachingMixin({
      linked: [
        Bar
      ]
    })
  ]
})
```

Now invalidating Foo will also invalidate Bar.

**NOTE:** This is a one-way operation, so you'll need to link both ways. However,
because of the way webpack handles circular references (or rather, doesn't), we
have to catch for this [here]().

##### Tracking

By default, the cache is a 1-to-1 store where a hash of the params is the key and
the response from `fetch` given those params is the value. When working with lists of data,
this can cause unnecessary duplication and excess memory usage.

For example, if you have the params `{ sort: 'default' }` and the response...

```json
[
  { "id": 1, "name": "foo" },
  { "id": 2, "name": "bar" },
  { "id": 3, "name": "baz" },
  { "id": 4, "name": "qux" }
]
```

...and then change the params to `{ sort: 'alpha' }` and get the response...

```json
[
  { "id": 2, "name": "bar" },
  { "id": 3, "name": "baz" },
  { "id": 1, "name": "foo" },
  { "id": 4, "name": "qux" }
]
```

...the cache would be...

```json
"{ \"sort\": \"default\" }": [
  { "id": 1, "name": "foo" },
  { "id": 2, "name": "bar" },
  { "id": 3, "name": "baz" },
  { "id": 4, "name": "qux" }
],
"{ \"sort\": \"alpha\" }": [
  { "id": 2, "name": "bar" },
  { "id": 3, "name": "baz" },
  { "id": 1, "name": "foo" },
  { "id": 4, "name": "qux" }
]
```

You can hopefully see, as your datasets grow, the cache can grow quite large.

We can remedy this by telling the mixin how to track items in the cache. In this
case, we'd tell it to track by `id`. Then, references to the actual objects will
be kept, and the cache will only need to contain a list of those `id`s.

```javascript
import { createModelConstructor } from 'utils/model'
import cachingMixin from 'mixins/caching'

const Foo = createModelConstructor({
  mixins: [
    cachingMixin({
      trackBy: 'id'
    })
  ]
})
```

Now, the cache looks like...

```json
"{ \"sort\": \"default\" }": [1, 2, 3, 4],
"{ \"sort\": \"alpha\" }": [2, 3, 1, 4]
```

Much better.

If your response contains metadata along with the list of items, you may specify
the tracking property per property.

Given the following JSON...

```json
{
  "someOtherProperty": "somePropertyValue",
  "foos": [
    { "id": 1, "name": "foo" },
    { "id": 2, "name": "bar" },
    { "id": 3, "name": "baz" },
    { "id": 4, "name": "qux" }
  ]
}
```

We'd accomplish the above with...

```javascript
import { createModelConstructor } from 'utils/model'
import cachingMixin from 'mixins/caching'

const Foo = createModelConstructor({
  mixins: [
    cachingMixin({
      trackBy: {
        foos: 'id'
      }
    })
  ]
})
```
