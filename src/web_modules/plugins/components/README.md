# components plugin

Registers temporary components for a view. Helps prevent naming conflicts and reduces
memory usage.

Accepts:
  - an object with the signature `[componentName]: componentConfig`
  - a function returning an object with the same signature, optionally with promised values

Code-splitting is supported via `import()`; promised values will be resolved prior to component registration.

As a matter of convention, these components should have underscored file names
to prevent confusion with nested routes within a view.

e.x.
```javascript
// sync
import * as foo from './_foo'

export default {
  components: {
    'foo': foo
  }
}

// async (code splitting & lazy asset loading)
export default {
  components: () => ({
    'foo': import('./_foo')
  })
}
```
