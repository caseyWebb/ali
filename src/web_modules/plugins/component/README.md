# component plugin

Defines the component for a view.

Accepts:
  - a component config
  - a function that returns a component config, optionally with promised values

Code-splitting is supported via `import()`; promised values will be resolved prior to component registration.

e.x.
```javascript
// sync
import viewModel from './viewModel'
import template from './template.html'

export default {
  component: { viewModel, template }
}

// async (code splitting & lazy loaded assets, RECOMMENDED)
export default {
  component: () => ({
    viewModel: import('./viewModel'),
    template: import('./template.html')
  })
}
```
