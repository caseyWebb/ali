# [Bindings](http://knockoutjs.com/documentation/custom-bindings.html)

This directory contains all of the custom bindings for your app.

Each binding should be a sub-directory of the binding's name and contain the files
for the binding. At a minimum, this is an `index.js` exporting the binding,
however it should be considered a best practice to also include a unit test and
README for your binding.

Bindings in this directory are loaded via [./index.js](./index.js), and
imported by [app.js](../../app.js).
