# query plugin

Creates a [query](https://github.com/profiscience/ko-querystring) instance using
the supplied object as the defaults and attaches it to `ctx`.

Accepts:
  - a [ko-querystring](https://github.com/profiscience/ko-querystring) config
  - function that receives `ctx` as its first argument and returns a ko-querystring config
  - an object with a `createQuery` factory that return a query instance

e.x.
```javascript
export default {
  query: {
    searchText: '',
    audiences: []
  },

  query: (ctx) => {
    courseType: getCourseType(ctx)
  },

  query: {
    createQuery(ctx) => ctx.$parent.query
  }
}

function getCourseType(ctx) {
  // ...
}
```


## createQuery function

You may optionally pass an object with the function `createQuery` that
will receive 3 arguments, `ctx`, `raw`, and `group` that you may return a
new query instance from. This can be used, for example, to inherit a query from
the parent. Because of this potential — and primary — usage, queries returned
by this function will not be disposed automatically.
