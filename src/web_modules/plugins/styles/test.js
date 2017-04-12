import plugin from './index'

test('styles plugin', async () => {
  const use = jest.fn()
  const unuse = jest.fn()
  const ctx = {
    queue: jest.fn()
  }
  const viewDeclaration = {
    styles: () => [
      Promise.resolve({ use, unuse })
    ]
  }

  const lifecycle = plugin(viewDeclaration)(ctx)
  lifecycle.next()

  await ctx.queue.mock.calls[0][0]

  expect(use).toHaveBeenCalled()

  lifecycle.next()
  lifecycle.next()
  lifecycle.next()

  expect(unuse).toHaveBeenCalled()
})
