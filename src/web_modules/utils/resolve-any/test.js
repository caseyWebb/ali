import resolveValues from './index'

test('resolveAny object', async () => {
  const input = {
    foo: Promise.resolve('foo'),
    bar: Promise.resolve('bar'),
    baz: 'baz'
  }

  const output = await resolveValues(input)

  expect(output).toEqual({
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
  })
})

test('resolveAny array', async () => {
  const input = [
    Promise.resolve('foo'),
    Promise.resolve('bar'),
    'baz'
  ]
  const output = await resolveValues(input)

  expect(output).toEqual([
    'foo',
    'bar',
    'baz'
  ])
})


test('resolveAny primitive', async () => {
  const input = 'foo'
  const output = await resolveValues(input)

  expect(output).toBe('foo')
})


test('resolveAny promise', async () => {
  const input = Promise.resolve('foo')
  const output = await resolveValues(input)

  expect(output).toBe('foo')
})
