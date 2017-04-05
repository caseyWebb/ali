import ko from 'knockout'
import plugin from './index'

test('components plugin w/ plain map', async () => {
  const ctx = { queue: jest.fn() }
  const viewDeclaration = {
    components: {
      foo: { template: 'FOO' },
      bar: { template: 'BAR' }
    }
  }
  const lifecycle = plugin(viewDeclaration)(ctx)

  lifecycle.next()
  expect(ctx.queue).toHaveBeenCalled()
  await ctx.queue.mock.calls[0][0]
  expect(ko.components.isRegistered('foo')).toBeTruthy()
  expect(ko.components.isRegistered('bar')).toBeTruthy()

  lifecycle.next()
  expect(ko.components.isRegistered('foo')).toBeTruthy()
  expect(ko.components.isRegistered('bar')).toBeTruthy()

  lifecycle.next()
  expect(ko.components.isRegistered('foo')).toBeFalsy()
  expect(ko.components.isRegistered('bar')).toBeFalsy()
})

test('components plugin w/ fn returning map w/ promised component configs', async () => {
  const ctx = { queue: jest.fn() }
  const viewDeclaration = {
    components: () => ({
      foo: Promise.resolve({ template: 'FOO' }),
      bar: Promise.resolve({ template: 'BAR' })
    })
  }

  const lifecycle = plugin(viewDeclaration)(ctx)

  lifecycle.next()
  expect(ctx.queue).toHaveBeenCalled()
  await ctx.queue.mock.calls[0][0]
  expect(ko.components.isRegistered('foo')).toBeTruthy()
  expect(ko.components.isRegistered('bar')).toBeTruthy()

  lifecycle.next()
  expect(ko.components.isRegistered('foo')).toBeTruthy()
  expect(ko.components.isRegistered('bar')).toBeTruthy()

  lifecycle.next()
  expect(ko.components.isRegistered('foo')).toBeFalsy()
  expect(ko.components.isRegistered('bar')).toBeFalsy()
})
