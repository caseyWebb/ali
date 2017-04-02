# [Plugins](https://github.com/Profiscience/ko-component-router/blob/master/docs/plugins.md)

Plugins allow us to create declarative views using a javascript object and are what
define the API for view `index.js` files.

Plugins are imported and registered in [app.js](../../app.js).

Plugins are essentially middleware factories and correspond to a property in the
view config object.
