# title plugin

Sets `document.title`.

Accepts:
  - a string
  - a function that receives `ctx` as its first argument and returns a string

e.x.
```javascript
export default {
  title: 'Foo',

  title: (ctx) => ctx.model.data.name
}
```
