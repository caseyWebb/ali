import { isFunction } from 'lodash'

export default (v) => v && isFunction(v.then) ? v : Promise.resolve(v)
