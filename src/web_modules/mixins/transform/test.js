import { modelConstructorFactory } from 'utils/model'
import transform from './index'

test('transform mixin', async () => {
  const Foo = modelConstructorFactory({
    mixins: [
      transform((data) => ({
        v: data.v.split('').reverse().join('')
      }))
    ],
    extend: class {
      static async fetch() { // eslint-disable-line
        return { v: 'foo' }
      }
    }
  })

  const foo = await Foo.factory()

  expect(foo.data.v()).toBe('oof')
})
