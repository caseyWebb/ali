# api mixin

Initializes a model from an API and adds a scoped `.api` object via [axios]()

### Usage

```javascript
import { modelConstructorFactory } from 'utils/model'
import ajax from 'mixins/ajax'

const User = modelConstructorFactory({
  mixins: [
    // static url
    ajax('/api/users'),

    // dynamic url
    ajax((params) => `/api/users/${params.id}`)
  ]
})

// assuming the dynamic url, this will be initialized with the response from
// /api/users/1
Users.factory({ id: 1 }).then((user) => {
  // axios instance with /api/users/1 baseURL and implied '/'
  user.api.patch()
})
```
