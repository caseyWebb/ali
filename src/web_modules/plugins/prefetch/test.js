import plugin from './index'

test('prefetch plugin', () => {
  const ctx = {}
  const viewDeclaration = {
    routes: {
      '/foo': {
        component: jest.fn().mockReturnValue({
          template: Promise.resolve({ default: 'FOO' })
        }),
        components: jest.fn().mockReturnValue({
          'foo-subcomponent': Promise.resolve({ template: 'FOO' })
        }),
        model: jest.fn().mockReturnValue(Promise.resolve()),
        styles: jest.fn().mockReturnValue([Promise.resolve()])
      },
      '/bar': {
        routes: {
          '/': {
            component: jest.fn().mockReturnValue({
              template: Promise.resolve({ default: 'BAR' })
            }),
            components: jest.fn().mockReturnValue({
              'bar-subcomponent': Promise.resolve({ template: 'BAR' })
            }),
            model: jest.fn().mockReturnValue(Promise.resolve()),
            styles: jest.fn().mockReturnValue([Promise.resolve()])
          },
          '/baz': {
            component: jest.fn(),
            components: jest.fn(),
            model: jest.fn(),
            styles: jest.fn()
          }
        }
      }
    }
  }

  const lifecycle = plugin(viewDeclaration)(ctx)
  // beforeRender
  lifecycle.next()
  // afterRender
  lifecycle.next()

  expect(viewDeclaration.routes['/foo'].component).toHaveBeenCalled()
  expect(viewDeclaration.routes['/foo'].components).toHaveBeenCalled()
  expect(viewDeclaration.routes['/foo'].model).toHaveBeenCalled()
  expect(viewDeclaration.routes['/foo'].styles).toHaveBeenCalled()

  expect(viewDeclaration.routes['/bar'].routes['/'].component).toHaveBeenCalled()
  expect(viewDeclaration.routes['/bar'].routes['/'].components).toHaveBeenCalled()
  expect(viewDeclaration.routes['/bar'].routes['/'].model).toHaveBeenCalled()
  expect(viewDeclaration.routes['/bar'].routes['/'].styles).toHaveBeenCalled()

  expect(viewDeclaration.routes['/bar'].routes['/baz'].component).not.toHaveBeenCalled()
  expect(viewDeclaration.routes['/bar'].routes['/baz'].components).not.toHaveBeenCalled()
  expect(viewDeclaration.routes['/bar'].routes['/baz'].model).not.toHaveBeenCalled()
  expect(viewDeclaration.routes['/bar'].routes['/baz'].styles).not.toHaveBeenCalled()
})
