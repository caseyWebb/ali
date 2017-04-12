import { modelConstructorFactory } from 'utils/model'
import transform from './index'

test('transform mixin', async () => {
  const Foo = modelConstructorFactory({
    mixins: [
      transform((data) => ({
        oof: data.foo.split('').reverse().join('')
      }))
    ],
    extend: class {
      static async fetch() { // eslint-disable-line
        return { foo: 'foo' }
      }
    }
  })

  const foo = await Foo.factory()
  
  expect(foo.data.oof()).toBe('oof')
})