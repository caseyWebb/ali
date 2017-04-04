import ko from 'knockout'
import plugin from './index'

test('component plugin with component config', async () => {
  const ctx = { canonicalPath: 'foo', route: {}, queue: jest.fn() }

  const lifecycle = plugin({ component: { template: 'FOO' } })(ctx)

  lifecycle.next()
  expect(ctx.queue).toHaveBeenCalled()
  await ctx.queue.mock.calls[0][0]
  expect(ko.components.isRegistered('foo')).toBeTruthy()

  lifecycle.next()
  expect(ko.components.isRegistered('foo')).toBeFalsy()
})
