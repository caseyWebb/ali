# component plugin

Defines the component config for a view. If property is a promise, it will be resolved.

e.x.
```javascript
export default {
  component: () => ({
    viewModel: import('./viewModel'),
    template: import('./template.html')
  })
}
```
