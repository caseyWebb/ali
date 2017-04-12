import plugin from './index'

test('query plugin', () => {
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
