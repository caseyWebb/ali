# Mixins

Mixins contain pre-packaged functionality for models and viewModels.

Mixins can either be included in the `mixin` option when using `createModelConstructor`
from [utils/model](../utils/model), or with [utils/mixin](../utils/mixin).

### createModelConstructor

```javascript
import { createModelConstructor } from 'utils/model'
import fooMixin from 'mixins/foo'

const Model = createModelConstructor({
  api: '/api/foo',
  mixins: [
    fooMixin
  ]
})
```

### mixin utility

```javascript
import fooMixin from 'mixins/foo'

const Model = mixin(class {}, fooMixin)
```
