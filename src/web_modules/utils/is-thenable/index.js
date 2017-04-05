import { isFunction } from 'lodash'

export default (v) => isFunction(v.then)
