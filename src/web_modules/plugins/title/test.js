import plugin from './index'

test('title plugin w/ static title', () => {
  const ctx = {
    foo: 'foo'
  }
  const viewDeclaration = {
    title: 'foo'
  }

  const lifecycle = plugin(viewDeclaration)(ctx)
  document.title = 'start'
  lifecycle.next()
  lifecycle.next()

  expect(document.title).toBe('Ali | foo')

  lifecycle.next()
  lifecycle.next()

  expect(document.title).toBe('start')
})

test('title plugin w/ dynamic title', () => {
  const ctx = {
    foo: 'foo'
  }
  const viewDeclaration = {
    title: ({ foo }) => foo
  }

  const lifecycle = plugin(viewDeclaration)(ctx)
  document.title = 'start'
  lifecycle.next()
  lifecycle.next()

  expect(document.title).toBe('Ali | foo')

  lifecycle.next()
  lifecycle.next()

  expect(document.title).toBe('start')
})
