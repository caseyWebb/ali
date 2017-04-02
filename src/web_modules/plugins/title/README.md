# title plugin

Sets `document.title`.

Accepts:
  - a string
  - a function that receives `ctx` as its first argument and returns a string

**NOTE:** This middleware runs during the `afterRender` lifecycle so that models
may be queued and still available to this plugin.

e.x.
```javascript
export default {
  title: 'Foo',

  title: (ctx) => ctx.model.data.name
}
```
