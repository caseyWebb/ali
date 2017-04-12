import plugin from './index'

test('with plugin', () => {
  const ctx = {}
  const viewDeclaration = {
    with: {
      foo: 'foo'
    }
  }

  plugin(viewDeclaration)(ctx)

  expect(ctx.foo).toBe('foo')
})
