# [Extenders](knockoutjs.com/documentation/extenders.html)

This directory contains extenders for your app.

Each extender should be a sub-directory of the extender's name and contain the files
for that extender. At a minimum, this is an `index.js` that exports the extender
function. It should be considered a best practice to also include a unit test and README
for your extender.

Extenders in this directory are loaded via [./index.js](./index.js), and imported by [app.js](../../app.js).
