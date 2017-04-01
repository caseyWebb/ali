import { isFunction } from 'lodash-es'

export default (v) => v && isFunction(v.then) ? v : Promise.resolve(v)
