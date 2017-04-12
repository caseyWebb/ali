import { modelConstructorFactory } from 'utils/model'
import caching from './index'

test('caching mixin / basic usage', async () => {
  let count = 0
  const fetch = jest.fn().mockImplementation(() => Promise.resolve({
    count: count++
  }))

  const Model = modelConstructorFactory({
    mixins: [caching()],
    extend: class {
      static async fetch() {
        return await fetch()
      }
    }
  })

  const foo = await Model.factory()
  expect(fetch).toHaveBeenCalledTimes(1)
  const bar = await Model.factory()
  expect(fetch).toHaveBeenCalledTimes(1)

  expect(foo.data.count()).toBe(0)
  expect(bar.data.count()).toBe(0)

  jest.spyOn(foo, 'reload')
  await Model.invalidate()

  expect(foo.reload).toHaveBeenCalled()
  expect(fetch).toHaveBeenCalledTimes(2)
  expect(foo.data.count()).toBe(1)
  expect(bar.data.count()).toBe(1)

  await Model.invalidate(false)

  expect(foo.reload).toHaveBeenCalled()
  expect(fetch).toHaveBeenCalledTimes(2)
  expect(foo.data.count()).toBe(1)
  expect(bar.data.count()).toBe(1)

  foo.dispose()
  await bar.invalidate()

  expect(foo.reload).toHaveBeenCalledTimes(1)
  expect(fetch).toHaveBeenCalledTimes(3)
  expect(foo.data.count()).toBe(1)
  expect(bar.data.count()).toBe(2)

  bar.dispose()
  await Model.invalidate()

  expect(fetch).toHaveBeenCalledTimes(3)
  expect(foo.data.count()).toBe(1)
  expect(bar.data.count()).toBe(2)
})


test('caching mixin / invalidates on save', async () => {
  const fetch = jest.fn().mockReturnValue(Promise.resolve({}))
  const save = jest.fn()
  const Model = modelConstructorFactory({
    mixins: [caching()],
    extend: class {
      async save(...args) { // eslint-disable-line
        save(...args)
        // noop
      }
      static async fetch() {
        return await fetch()
      }
    }
  })

  const foo = await Model.factory()

  jest.spyOn(foo, 'reload')
  await foo.save('foo', 'bar')
  expect(save).toHaveBeenCalledWith('foo', 'bar')
  expect(foo.reload).toHaveBeenCalled()
})

test('caching mixin / invalidates linked models', async () => {
  const Foo = modelConstructorFactory({
    mixins: [caching()],
    extend: class {
      static async fetch() { // eslint-disable-line
        return {}
      }
    }
  })

  const Bar = modelConstructorFactory({
    mixins: [
      caching({
        link: [Foo]
      })
    ],
    extend: class {
      static async fetch() { // eslint-disable-line
        return {}
      }
    }
  })

  const foo = await Foo.factory()
  const bar = await Bar.factory()

  jest.spyOn(foo, 'reload')
  await bar.invalidate()
  expect(foo.reload).toHaveBeenCalled()
})


test('caching mixin / ttl', async () => {
  jest.useFakeTimers()

  const fetch = jest.fn().mockReturnValue(Promise.resolve({}))
  const Foo = modelConstructorFactory({
    mixins: [caching({
      ttl: 30
    })],
    extend: class {
      static async fetch() { // eslint-disable-line
        return fetch()
      }
    }
  })

  const foo = await Foo.factory()

  expect(fetch).toHaveBeenCalledTimes(1)

  foo.reload()
  expect(fetch).toHaveBeenCalledTimes(1)

  jest.runTimersToTime(60 * 1000)
  
  expect(fetch).toHaveBeenCalledTimes(1)
  foo.reload()
  expect(fetch).toHaveBeenCalledTimes(2)
})

test('caching mixin / ttl w/ auto-reload', async () => {
  jest.useFakeTimers()

  const fetch = jest.fn().mockReturnValue(Promise.resolve({}))
  const Foo = modelConstructorFactory({
    mixins: [caching({
      ttl: 30,
      ttlAutoReload: true
    })],
    extend: class {
      static async fetch() { // eslint-disable-line
        return fetch()
      }
    }
  })

  const foo = await Foo.factory()

  expect(fetch).toHaveBeenCalledTimes(1)

  foo.reload()
  expect(fetch).toHaveBeenCalledTimes(1)

  jest.runTimersToTime(60 * 1000)

  expect(fetch).toHaveBeenCalledTimes(2)
})
