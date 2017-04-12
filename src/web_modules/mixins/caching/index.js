import { isEmpty, invokeMap, map, omitBy, remove } from 'lodash'
import ko from 'knockout'
import hash from 'object-hash'

const SECOND = 1000

export default ({
  link = [],
  ttl = false,
  ttlAutoReload = false
} = {}) => (_super = class {}) => {
  const cache = new Map()
  const instances = []

  return class extends _super {
    constructor(...args) {
      super(...args)
      instances.push(this)
    }

    async invalidate() {
      await this.constructor.invalidate()
    }

    async save(...args) {
      const ret = await super.save(...args)
      await this.invalidate()
      return ret
    }

    dispose(...args) {
      super.dispose(...args)
      remove(instances, this)
    }

    static async fetch(params, ...args) {
      const key = hash.MD5(omitBy(ko.toJS(params), isEmpty))
      if (cache.has(key)) {
        return cache.get(key)
      } else {
        const p = super.fetch(params, ...args)
        cache.set(key, p)
        const m = await p
        cache.set(key, m)
        if (ttl) {
          setTimeout(() => {
            cache.delete(key)
            if (ttlAutoReload) {
              invokeMap(instances, 'reload')
            }
          }, SECOND * ttl)
        }
        return m
      }
    }

    static async invalidate(reload = true) {
      cache.clear()

      await Promise.all([
        ...map(instances, (m) => reload ? m.reload() : new Promise((r) => r())),
        ...map(link, (m) => m.invalidate(reload))
      ])
    }
  }
}
