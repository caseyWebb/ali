import castThenable from './index'

test('utils/cast-thenable', async () => {
  const foo = castThenable('foo')
  const bar = castThenable(Promise.resolve('bar'))

  expect(await foo).toBe('foo')
  expect(await bar).toBe('bar')
})
