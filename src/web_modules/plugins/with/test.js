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

test('with plugin does not break views without it', () => {
  const ctx = {}
  const viewDeclaration = {}

  plugin(viewDeclaration)(ctx)

  expect.anything()
})
