import { isFunction } from 'lodash'
import axios from 'axios'

export default (url) => (_super) => class extends _super {
  get api() {
    return axios.create({ baseURL: isFunction(url) ? url(this.params()) : url })
  }

  static get api() {
    if (isFunction(url)) {
      throw new Error('static api property does not work with dynamic url')
    } else {
      return axios.create({ baseURL: url })
    }
  }

  static async fetch(params = {}) {
    return (await axios.get(isFunction(url) ? url(params) : url, { params })).data
  }
}
