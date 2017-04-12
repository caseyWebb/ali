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
