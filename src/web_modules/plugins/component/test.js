import ko from 'knockout'
import plugin from './index'

test('component plugin w/ plain component config', async () => {
  const ctx = { canonicalPath: 'foo', route: {}, queue: jest.fn() }

  const viewDeclaration = {
    component: {
      template: 'FOO'
    }
  }

  const lifecycle = plugin(viewDeclaration)(ctx)

  lifecycle.next()
  expect(ctx.queue).toHaveBeenCalled()
  await ctx.queue.mock.calls[0][0]
  expect(ko.components.isRegistered('foo')).toBeTruthy()

  lifecycle.next()
  expect(ko.components.isRegistered('foo')).toBeFalsy()
})

test('component plugin w/ fn returning component config w/ promised values', async () => {
  const ctx = { canonicalPath: 'foo', route: {}, queue: jest.fn() }

  const viewDeclaration = {
    component: () => ({
      template: Promise.resolve('FOO')
    })
  }

  const lifecycle = plugin(viewDeclaration)(ctx)

  lifecycle.next()
  expect(ctx.queue).toHaveBeenCalled()
  await ctx.queue.mock.calls[0][0]
  expect(ko.components.isRegistered('foo')).toBeTruthy()

  lifecycle.next()
  expect(ko.components.isRegistered('foo')).toBeFalsy()
})
