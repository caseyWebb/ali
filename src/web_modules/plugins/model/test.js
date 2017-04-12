import Query from 'ko-querystring'
import plugin from './index'

test('model plugin w/ model class', async () => {
  const ctx = {
    queue: jest.fn(),
    params: { foo: 'foo' },
    query: new Query({ bar: 'bar' }, 'child'),
    $parent: {
      params: { foo: 'notfoo', baz: 'baz' },
      query: new Query({ bar: 'notbar', qux: 'qux' }, 'parent')
    }
  }

  const dispose = jest.fn()

  class Foo {
    constructor(params) {
      this.params = params
    }
    dispose() {
      dispose()
    }
    static async factory(params) { // eslint-disable-line require-await
      return new Foo(params)
    }
  }

  const viewDeclaration = {
    model: Foo
  }

  const lifecycle = plugin(viewDeclaration)(ctx)
  lifecycle.next()

  expect(ctx.queue).toHaveBeenCalled()
  expect(ctx.model).toBeUndefined()

  await ctx.queue.mock.calls[0][0]

  expect(ctx.model).toBeInstanceOf(Foo)
  expect(ctx.model.params()).toEqual({
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
  })

  lifecycle.next()
  lifecycle.next()

  expect(dispose).toHaveBeenCalled()
})

test('model plugin w/ function returning promised model class', async () => {
  const ctx = {
    queue: jest.fn(),
    params: { foo: 'foo' },
    query: new Query({ bar: 'bar' }, 'child'),
    $parent: {
      params: { foo: 'notfoo', baz: 'baz' },
      query: new Query({ bar: 'notbar', qux: 'qux' }, 'parent')
    }
  }

  const dispose = jest.fn()

  class Foo {
    constructor(params) {
      this.params = params
    }
    dispose() {
      dispose()
    }
    static async factory(params) { // eslint-disable-line require-await
      return new Foo(params)
    }
  }

  const viewDeclaration = {
    model: () => Promise.resolve(Foo)
  }

  const lifecycle = plugin(viewDeclaration)(ctx)
  lifecycle.next()

  expect(ctx.queue).toHaveBeenCalled()
  expect(ctx.model).toBeUndefined()

  await ctx.queue.mock.calls[0][0]

  expect(ctx.model).toBeInstanceOf(Foo)
  expect(ctx.model.params()).toEqual({
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
  })

  lifecycle.next()
  lifecycle.next()

  expect(dispose).toHaveBeenCalled()
})

test('model plugin w/ createModel factory', async () => {
  const ctx = {
    queue: jest.fn(),
    params: { foo: 'foo' },
    query: new Query({ bar: 'bar' }, 'child'),
    $parent: {
      params: { foo: 'notfoo', baz: 'baz' },
      query: new Query({ bar: 'notbar', qux: 'qux' }, 'parent')
    }
  }

  const dispose = jest.fn()

  class Foo {
    constructor(params) {
      this.params = params
    }
    dispose() {
      dispose()
    }
  }

  const viewDeclaration = {
    model: {
      createModel: (params) => new Foo(params)
    }
  }

  const lifecycle = plugin(viewDeclaration)(ctx)
  lifecycle.next()

  expect(ctx.queue).toHaveBeenCalled()
  expect(ctx.model).toBeUndefined()

  await ctx.queue.mock.calls[0][0]

  expect(ctx.model).toBeInstanceOf(Foo)
  expect(ctx.model.params()).toEqual({
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
  })

  lifecycle.next()
  lifecycle.next()

  expect(dispose).not.toHaveBeenCalled()
})

test('model plugin w/ multiple models', async () => {
  const ctx = {
    queue: jest.fn(),
    params: { foo: 'foo' },
    query: new Query({ bar: 'bar' }, 'child'),
    $parent: {
      params: { foo: 'notfoo', baz: 'baz' },
      query: new Query({ bar: 'notbar', qux: 'qux' }, 'parent')
    }
  }

  class Foo {
    constructor(params) {
      this.params = params
      this.dispose = jest.fn()
    }
    static async factory(params) { // eslint-disable-line require-await
      return new Foo(params)
    }
  }

  class Bar {
    constructor(params) {
      this.params = params
      this.dispose = jest.fn()
    }
    static async factory(params) { // eslint-disable-line require-await
      return new Bar(params)
    }
  }

  const viewDeclaration = {
    model: {
      foo: Foo,
      bar: { createModel: (params) => Bar.factory(params) }
    }
  }

  const lifecycle = plugin(viewDeclaration)(ctx)
  lifecycle.next()

  expect(ctx.queue).toHaveBeenCalled()
  expect(ctx.model).toBeUndefined()

  await ctx.queue.mock.calls[0][0]

  expect(ctx.models.foo).toBeInstanceOf(Foo)
  expect(ctx.models.bar).toBeInstanceOf(Bar)
  expect(ctx.models.foo.params()).toEqual({
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
  })
  expect(ctx.models.bar.params()).toEqual({
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
  })

  lifecycle.next()
  lifecycle.next()

  expect(ctx.models.foo.dispose).toHaveBeenCalled()
  expect(ctx.models.bar.dispose).not.toHaveBeenCalled()

  ctx.models.bar.dispose()
})

test('model plugin w/ function returning multiple models, some promised', async () => {
  const ctx = {
    queue: jest.fn(),
    params: { foo: 'foo' },
    query: new Query({ bar: 'bar' }, 'child'),
    $parent: {
      params: { foo: 'notfoo', baz: 'baz' },
      query: new Query({ bar: 'notbar', qux: 'qux' }, 'parent')
    }
  }

  class Foo {
    constructor(params) {
      this.params = params
      this.dispose = jest.fn()
    }
    static async factory(params) { // eslint-disable-line require-await
      return new Foo(params)
    }
  }

  class Bar {
    constructor(params) {
      this.params = params
      this.dispose = jest.fn()
    }
    static async factory(params) { // eslint-disable-line require-await
      return new Bar(params)
    }
  }

  const viewDeclaration = {
    model: () => ({
      foo: Promise.resolve(Foo),
      bar: { createModel: (params) => Bar.factory(params) }
    })
  }

  const lifecycle = plugin(viewDeclaration)(ctx)
  lifecycle.next()

  expect(ctx.queue).toHaveBeenCalled()
  expect(ctx.model).toBeUndefined()

  await ctx.queue.mock.calls[0][0]

  expect(ctx.models.foo).toBeInstanceOf(Foo)
  expect(ctx.models.bar).toBeInstanceOf(Bar)
  expect(ctx.models.foo.params()).toEqual({
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
  })
  expect(ctx.models.bar.params()).toEqual({
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
  })

  lifecycle.next()
  lifecycle.next()

  expect(ctx.models.foo.dispose).toHaveBeenCalled()
  expect(ctx.models.bar.dispose).not.toHaveBeenCalled()

  ctx.models.bar.dispose()
})

// test('model plugin w/ queueing disabled', async () => {
// })
