# tap mixin

Allows you to tap into the data to modify properties or perform a conditional
action. Like [transform](../transform), but the return value is not used.

### Usage

```javascript
import { modelConstructorFactory } from 'utils/model'
import tap from 'mixins/tap'

function doSomething() { ... }

const Users = modelConstructorFactory({
  mixins: [
    tap((data) => {
      if (data.foo) {
        doSomething()
      }
    })
  ]
})
```
