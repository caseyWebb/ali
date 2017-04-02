import { startsWith } from 'lodash'
import $ from 'jquery'
import ko from 'knockout'
import { stringify as stringifyQuery } from 'qs'

export default function(app) {
  return {
    get: createAjaxMethodFunction('GET', app),
    post: createAjaxMethodFunction('POST', app),
    put: createAjaxMethodFunction('PUT', app),
    delete: createAjaxMethodFunction('DELETE', app)
  }
}

export function ensureApiUrl(url, app) {
  if (app) {
    return window.UniversitySiteRoot + '/' + app + '/API/' + url
  }

  if (startsWith(url.toLowerCase(), 'instructor')) {
    return window.UniversitySiteRoot + '/Instructor/API/' + url
  } else if (startsWith(url.toLowerCase(), 'learner')) {
    return window.UniversitySiteRoot + '/Learner/API/' + url
  } else if (startsWith(url.toLowerCase(), '/insite')) {
    return window.UniversitySiteRoot + url
  } else {
    // eslint-disable-next-line
    console.error(`
      Could not intuit app API from controller/endpoint.

      Defaulting to InSite (b/c controller names are ambiguous).

      Specify the app by using api(app)

      e.g.
      api('learner').post('login')
    `)
    return window.UniversitySiteRoot + '/InSite/API/' + url
  }
}

export const get = createAjaxMethodFunction('GET')
export const post = createAjaxMethodFunction('POST')
export const put = createAjaxMethodFunction('PUT')
export const _delete = createAjaxMethodFunction('DELETE')

export function download(url, params) {
  window.location = ensureApiUrl(url) + stringifyQuery(ko.toJS(params))
}

function createAjaxMethodFunction(type, app) {
  return function ajax(_url, _data) {
    let url = ensureApiUrl(_url, app)

    let data
    if (type === 'DELETE') {
      url += '?' + stringifyQuery(_data)
    } else if (type === 'POST' || type === 'PUT') {
      data = ko.toJSON(_data)
    } else {
      data = ko.toJS(_data)
    }

    return new Promise((resolve, reject) => {
      $.ajax({ url, data, type, contentType: 'application/json' })
        .fail((e) => reject(e))
        .success((res) => resolve(res))
    })
  }
}
