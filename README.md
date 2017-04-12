# Ali

[![License][license_badge]][license_link]
[![Build Status][travis_badge]][travis_link]
[![Coverage Status][coveralls_badge]][coveralls_link]
[![Dependency Status][david_dm_badge]][david_dm_link]
[![PeerDependency Status][david_dm_peer_badge]][david_dm_peer_link]
[![DevDependency Status][david_dm_dev_badge]][david_dm_dev_link]
[![Gitter][gitter_badge]][gitter_link]

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

First, read the [docs](https://caseyWebb.github.io/ali), then when you're ready
to start a new app, clone this repo, delete the routes, and start coding.

## Why not X!?!?

#### Investment

When you have half a million lines of code written using something, hopping onto
the next framework isn't always an option. For us, that something was Knockout,
and over the years we've learned how to make pretty darn powerful apps with it
using the patterns seen here.

#### Browser Support

Trust me, we **all** celebrated the day IE8 fell into obsolescence. Still, Knockout
offers the best browser support out there and for some of us, that is important.

[license_badge]: https://img.shields.io/github/license/caseyWebb/ali.svg
[license_link]: http://www.wtfpl.net/
[travis_badge]: https://img.shields.io/travis/caseyWebb/ali/master.svg?maxAge=2592000
[travis_link]: https://travis-ci.org/caseyWebb/ali/
[coveralls_badge]: https://img.shields.io/coveralls/caseyWebb/ali.svg?maxAge=2592000
[coveralls_link]: https://coveralls.io/github/caseyWebb/ali
[david_dm_badge]: https://img.shields.io/david/caseyWebb/ali.svg?maxAge=2592000
[david_dm_link]: https://david-dm.org/caseyWebb/ali
[david_dm_peer_badge]: https://img.shields.io/david/peer/caseyWebb/ali.svg?maxAge=2592000
[david_dm_peer_link]: https://david-dm.org/caseyWebb/ali#info=peerDependencies
[david_dm_dev_badge]: https://img.shields.io/david/dev/caseyWebb/ali.svg?maxAge=2592000
[david_dm_dev_link]: https://david-dm.org/caseyWebb/ali#info=devDependencies
[gitter_badge]: https://img.shields.io/gitter/room/caseyWebb/ali.svg
[gitter_link]: https://gitter.im/caseyWebb/ali


[profiscience]: http://profiscience.com
[knockout]: http://knockoutjs.com
[knockout-punches]: https://mbest.github.io/knockout.punches/
[ko-component-router]: https://github.com/Profiscience/ko-component-router
[ko-contrib-utils]: https://github.com/Profiscience/ko-contrib-utils
[ko-contrib-fns]: https://github.com/Profiscience/ko-contrib-fns
[ko-querystring]: https://github.com/Profiscience/ko-querystring
[lodash]: https://lodash.com
[webpack]: https://webpack.js.org
