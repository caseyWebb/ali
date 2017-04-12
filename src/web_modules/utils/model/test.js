import ko from 'knockout'
import { modelConstructorFactory } from './index'
import 'ko-contrib-fns/subscribeOnce'

test('utils/model', async () => {
  const dispose = jest.fn()
  const store = {
    FOO: 'foo',
    BAR: 'bar'
  }

  const Model = modelConstructorFactory({
    mixins: [
      (_super) => class extends _super {
        get superbaz() {
          return 'super' + super.baz
        }
      }
    ],
    extend: class {
      get baz() {
        return 'baz'
      }

      dispose() {
        dispose()
      }

      static async fetch(params) { // eslint-disable-line
        return { v: store[params.x] }
      }
    }
  })

  const x = ko.observable('FOO')
  const m = await Model.factory({ x })

  expect(m.data.v()).toBe('foo')
  expect(m.params().x).toBe('FOO')

  await new Promise((resolve) => {
    x('BAR')
    m.data.v.subscribeOnce(resolve)
  })

  expect(m.data.v()).toBe('bar')
  expect(m.params().x).toBe('BAR')

  expect(m.baz).toBe('baz')
  expect(m.superbaz).toBe('superbaz')

  const reload = jest.spyOn(m, 'reload')
  m.dispose()
  x('BAZ')
  expect(dispose).toHaveBeenCalled()
  expect(reload).not.toHaveBeenCalled()
})
