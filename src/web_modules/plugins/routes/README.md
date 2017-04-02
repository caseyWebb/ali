# routes plugin

Defines child routes for a view.

**NOTE**: Code-splitting is *NOT* supported or necessary for this plugin.
The app entry should contain a manifest for the entire app, and the imported
child views are responsible for ensuring that their components, models, etc
are imported correctly for code-splitting.

e.x.
```javascript
export default {
  routes: {
    '/': homeView,
    '/foo': fooView
  }
}
```
