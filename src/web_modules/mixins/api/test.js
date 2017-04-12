import path from 'path'
import axios from 'axios'
import AxiosMock from 'axios-mock-adapter'
import { modelConstructorFactory } from 'utils/model'
import api from './index'

test('api mixin / static', async () => {
  const apiMock = new AxiosMock(axios)

  apiMock.onGet('/api/users').reply(200, [
    { id: 1, name: 'Casey Webb' }
  ])

  const Users = modelConstructorFactory({
    mixins: [
      api('/api/users')
    ]
  })

  const users = await Users.factory()

  expect(users.data()[0].name()).toBe('Casey Webb')

  apiMock.restore()
})

test('api mixin / dynamic', async () => {
  const apiMock = new AxiosMock(axios)

  apiMock.onGet('/api/users/1').reply(200, { name: 'Casey Webb' })

  const Users = modelConstructorFactory({
    mixins: [
      api(({ id }) => `/api/users/${id}`)
    ]
  })

  const user = await Users.factory({ id: 1 })

  expect(user.data.name()).toBe('Casey Webb')

  apiMock.restore()
})

test('api mixin / instance api property', async () => {
  const apiMock = new AxiosMock(axios)

  apiMock.onGet('/api/users/1').reply(200, { name: 'Casey Webb' })

  // the mock doesn't handle baseURLs the way we're using them
  apiMock.onAny().reply(({ baseURL, url: endpoint }) => {
    if (path.join(baseURL, endpoint) === '/api/users/1/foo') {
      return [200, 'FOO']
    }
  })

  const Users = modelConstructorFactory({
    mixins: [
      api(({ id }) => `/api/users/${id}`)
    ]
  })

  const user = await Users.factory({ id: 1 })

  expect((await user.api('/foo')).data).toBe('FOO')

  apiMock.restore()
})


test('api mixin / static api property', async () => {
  const apiMock = new AxiosMock(axios)

  apiMock.onGet('/api/users/1').reply(200, { name: 'Casey Webb' })

  // the mock doesn't handle baseURLs the way we're using them
  apiMock.onAny().reply(({ baseURL, url: endpoint }) => {
    if (path.join(baseURL, endpoint) === '/api/users/foo') {
      return [200, 'FOO']
    }
  })

  const Users = modelConstructorFactory({
    mixins: [
      api('/api/users')
    ]
  })

  expect((await Users.api('/foo')).data).toBe('FOO')

  apiMock.restore()
})
