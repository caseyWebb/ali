# [Filters](https://mbest.github.io/knockout.punches/#text-filters)

This directory contains filters for your app.

Each filter should be a sub-directory of the filter's name and contain the files
for that filter. At a minimum, this is an `index.js` that exports the filter
function. It should be considered a best practice to also include a unit test and README
for your filter.

Filters in this directory are loaded via [./index.js](./index.js), and imported by [app.js](../../app.js).
