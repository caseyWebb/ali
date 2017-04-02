import { reduce } from 'lodash'

export default (clazz, mixins) => reduce(mixins, (c, m) => m(c), clazz)
