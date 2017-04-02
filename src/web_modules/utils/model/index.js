import { isString, isEmpty, isFunction, map, omitBy, remove } from 'lodash'
import ko from 'knockout'
import { fromJS, merge as mergeObs } from 'ko-contrib-utils'
import * as api from 'utils/api'
import hash from 'object-hash'
import mixin from 'utils/mixin'

export function modelConstructorFactory({
  api: url,
  extend: _super = class {},
  mixins = []
}) {
  const cache = new Map()

  const _models = []

  return mixin(class extends _super {
    constructor(data, params) {
      super(data, params)

      this.data = data
      this.params = params
    }

    // accessors for static functions
    get api() {
      return this.constructor.api
    }

    invalidate() {
      return this.constructor.invalidate()
    }

    asObservable() {
      if (!this._asObservable) {
        const params = ko.pureComputed(() => ko.toJS(m.params))
        const proto = Object.getPrototypeOf(this)

        const m = Object.create(proto)
        m.data = fromJS(this.data, true)
        m.params = this.params
        m.loading = ko.observable(false)

        m.reload = () => {
          m.loading(true)
          return m.constructor
            .retrieve(m.params)
            .then((data) => {
              mergeObs(m.data, data, true)
              m.loading(false)
              return m.data
            })
        }

        m.updater = params.subscribe(() => m.reload())

        m.dispose = () => {
          m.updater.dispose()
          remove(_models, m)
        }

        this.dispose = m.dispose

        _models.push(m)

        this._asObservable = m
      }

      return this._asObservable
    }

    save() {
      const p = super.save
        ? super.save(...arguments)
        : this.api.post('Save', this.data)

      p.then(() => this.constructor.invalidate())

      return p
    }

    static get api() {
      if (url[url.length - 1] !== '/') {
        url += '/'
      }

      function getArgs(a, b) {
        if (isString(a)) {
          return [url + a, b]
        } else {
          return [url, a]
        }
      }

      return {
        url,
        get: (a, b) => api.get(...getArgs(a, b)),
        post: (a, b) => api.post(...getArgs(a, b)),
        put: (a, b) => api.put(...getArgs(a, b)),
        _delete: (a, b) => api._delete(...getArgs(a, b))
      }
    }

    static factory(params) {
      return this.retrieve(params).then((m) => Reflect.construct(this, [m, params]))
    }

    static fetch(params) {
      return super.fetch
        ? super.fetch(...arguments)
        : this.api.get(params)
    }

    static retrieve(params) {
      const key = hash.MD5(omitBy(ko.toJS(params), isEmpty))
      if (cache.has(key)) {
        return Promise.resolve(cache.get(key))
      } else {
        const p = this.fetch(params).then((m) => {
          cache.set(key, m)
          return m
        })
        cache.set(key, p)
        return p
      }
    }

    static invalidate(reload = true) {
      if (isFunction(super.invalidate)) {
        super.invalidate()
      }
      cache.clear()
      return Promise.all(map(_models, (m) => reload ? m.reload() : new Promise((r) => r())))
    }
  }, mixins)
}
