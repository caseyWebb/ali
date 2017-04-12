import Query from 'ko-querystring'
import plugin from './index'

test('query plugin / constructor config', () => {
  const ctx = { canonicalPath: '/foo' }
  const viewDeclaration = {
    query: {
      foo: 'foo'
    }
  }

  const lifecycle = plugin(viewDeclaration)(ctx)
  // beforeRender
  lifecycle.next()
  expect(ctx.query.foo()).toBe('foo')

  // afterRender
  lifecycle.next()
  // beforeDispose
  lifecycle.next()

  jest.spyOn(ctx.query, 'dispose')
  // afterDispose
  lifecycle.next()
  expect(ctx.query.dispose).toHaveBeenCalled()
})

test('query plugin / createQuery', () => {
  const ctx = { canonicalPath: '/foo' }
  const viewDeclaration = {
    query: {
      createQuery: (ctx) => new Query({
        foo: 'foo'
      })
    }
  }

  const lifecycle = plugin(viewDeclaration)(ctx)
  // beforeRender
  lifecycle.next()
  expect(ctx.query.foo()).toBe('foo')

  // afterRender
  lifecycle.next()
  // beforeDispose
  lifecycle.next()

  jest.spyOn(ctx.query, 'dispose')
  // afterDispose
  lifecycle.next()
  expect(ctx.query.dispose).toHaveBeenCalled()
})
