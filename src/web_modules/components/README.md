# [Components](http://knockoutjs.com/documentation/component-overview.html)

This directory contains shared components for your app.

Each component should be a sub-directory of the component's name and contain the files
for that component. At a minimum, this is a `template.html` with the component's
template, and an `index.js` that exports the component config. It should be considered
a best practice to also include a unit test and README for your binding.

Components in this directory are loaded via [./index.js](./index.js), and imported by [app.js](../../app.js).

Optionally, you may wish to use code-splitting/lazy-loading for your shared components.
To do so, change the import to `import 'components/lazy'` in app.js. It should
be noted however that this does not give an optimal UX, as components are loaded
implicitly as Knockout comes across them in the rendering. This means that components
may not be rendered synchronously with the view, rather popping in as they load.
