# styles plugin

Loads (and unloads) styles for a given page. Accepts promises.

Accepts:
  - an array of styles (using style-loader/useable)
  - a function returning an array of styles (using style-loader/useable)

Code-splitting is supported via `import()`-ing styles inside the function

e.x.
```javascript
// sync
import style from './style.scss'
export default {
  styles: [style]
}

// code-splitting
export default {
  styles: () => [
    import('./style.scss')
  ]
}
```

**Note:** Use instead of simply `require`-ing the styles at the head so that they
will be [used/unused](https://github.com/webpack-contrib/style-loader#reference-counted-api)
with the page lifecycle.
