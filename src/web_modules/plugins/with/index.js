import { extend } from 'lodash'

export default ({ with: _with = {} }) => (ctx) => extend(ctx, _with)
