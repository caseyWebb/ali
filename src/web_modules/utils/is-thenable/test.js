import isThenable from './index'

test('isThenable true', () => {
  expect(isThenable(Promise.resolve())).toBeTruthy()
})

test('isThenable false', () => {
  expect(isThenable('foo')).toBeFalsy()
})
