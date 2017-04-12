# Testing

Writing tests and using TDD is the *best* way to ensure your code remains maintainable
and bug-free.

Ali has [Jest](https://facebook.github.io/jest/) set up OOTB for unit-testing, and it is as simple as running...

```
$ yarn test
```

This will execute all of the tests. To run a single test (or tests in a subdirectory),
pass it to the previous command...

```
$ yarn test src/web_modules/utils/is-thenable
```

You may also pass CLI arguments to jest as such...

```
$ yarn test -- --watch --notify
```

Finally, there is a command exposed for debugging the tests using [node-inspector](https://github.com/node-inspector/node-inspector).
First, start node-inspector in another terminal, then run...

```
$ yarn debug
```

:tada:

For more, see the [Jest documentation](https://facebook.github.io/jest/docs/getting-started.html)
