# Ali

**This is still in active development!** Things aren't quite done, and there are several loose ends. With that being said, you get can probably get the idea by poking around.

An opinionated meta-framework for building model SPAS with [KnockoutJS][knockout]

## What is it?

A loose collection of packages, some minimal boilerplate, and a set of best-practices
used at [Profisciencē][profiscience] to build enterprise SPAS with a
strong focus on user and developer experience

Ali is declarative and highly-modular, making it easy to test and scalable to hundreds
of pages.

## What's it made of?

Magic! Actually, no. No magic at all. Everything is plain Javascript and Knockout.

The core "framework" is built with:
  - [KnockoutJS][knockout]
  - [ko-component-router][ko-component-router]
  - [Webpack][webpack]

And it includes the following useful libraries:
  - [knockout-punches][knockout-punches]
  - [ko-contrib-utils][ko-contrib-utils]
  - [ko-contrib-fns][ko-contrib-fns]
  - [ko-querystring][ko-querystring]
  - [lodash][lodash]

## What do I get?

  - Code-Splitting with Incremental Loading
  - Painless Async (AJAX) and Loading Animations/Transitions
  - Optimized Production builds with Long-Term Caching
  - ES2015/2017
  - SCSS
  - Smiles :blush:

## How do I use it?

First, read the [docs and guides](https://caseyWebb.github.io/ali), then when you're ready to start a new app, clone
this repo, delete the routes, and start coding.

## Why not X!?!?

#### Investment

When you have half a million lines of code written using something, hopping onto
the next framework isn't always an option. For us, that something was Knockout,
and over the years we've learned how to make pretty darn powerful apps with it
using the patterns seen here.

#### Browser Support

Trust me, we **all** celebrated the day IE8 fell into obsolescence. Still, Knockout
offers the best browser support out there and for some of us, that is important.


[profiscience]: http://profiscience.com
[knockout]: http://knockoutjs.com
[knockout-punches]: https://mbest.github.io/knockout.punches/
[ko-component-router]: https://github.com/Profiscience/ko-component-router
[ko-contrib-utils]: https://github.com/Profiscience/ko-contrib-utils
[ko-contrib-fns]: https://github.com/Profiscience/ko-contrib-fns
[ko-querystring]: https://github.com/Profiscience/ko-querystring
[lodash]: https://lodash.com
[webpack]: https://webpack.js.org
