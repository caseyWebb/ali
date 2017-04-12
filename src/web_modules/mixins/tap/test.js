import { modelConstructorFactory } from 'utils/model'
import tap from './index'

test('tap mixin', async () => {
  const Foo = modelConstructorFactory({
    mixins: [
      tap((data) => {
        data.oof = data.foo.split('').reverse().join('')
      })
    ],
    extend: class {
      static async fetch() { // eslint-disable-line
        return { foo: 'foo' }
      }
    }
  })

  const foo = await Foo.factory()

  expect(foo.data.foo()).toBe('foo')
  expect(foo.data.oof()).toBe('oof')
})
