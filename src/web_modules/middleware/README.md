# [Middleware](https://github.com/Profiscience/ko-component-router/blob/next/docs/middleware.md)

This directory contains global middleware for your app.

Each middleware should be a sub-directory of the middleware's name and contain the files
for that middleware. At a minimum, this is an `index.js` that exports the middleware
function. It should be considered a best practice to also include a unit test and README
for your middleware.

Middleware is imported and registered with the router in [app.js](../../app.js).
