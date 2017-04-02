# with plugin

Extends the context with the supplied object. Available in view component
constructors and middleware.

e.x.
```javascript
export default {
  component: {
    viewModel(ctx) {
      // ctx.foo === 'foo'
    }
  },

  with: {
    foo: 'foo'
  }
}
```
