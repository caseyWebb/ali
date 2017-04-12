import isThenable from './index'

test('utils/is-thenable', () => {
  expect(isThenable(Promise.resolve())).toBeTruthy()
  expect(isThenable('foo')).toBeFalsy()
})
