import { isArray, isPlainObject, map } from 'lodash'
import { castThenable } from 'utils'

export default async (x) => {
  if (isPlainObject(x)) {
    const ret = {}
    await Promise.all(map(x, async (v, k) => (ret[k] = await castThenable(v))))
    return ret
  } else if (isArray(x)) {
    return await Promise.all(map(x, castThenable))
  } else {
    return await castThenable(x)
  }
}
