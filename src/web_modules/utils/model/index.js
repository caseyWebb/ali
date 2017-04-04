import ko from 'knockout'
import { fromJS, merge } from 'ko-contrib-utils'
import mixin from 'utils/mixin'

export function modelConstructorFactory({
  extend: _super = class {},
  mixins = []
}) {
  return mixin(class extends _super {
    constructor(data, params) {
      super(data, params)

      this.loading = ko.observable(false)
      this.data = fromJS(data, true)
      this.params = ko.pureComputed(() => ko.toJS(params)) // ensure observable

      this._updater = this.subscribeToParamChanges()
    }

    async reload() {
      this.loading(true)

      const data = await this.constructor.fetch(this.params)

      merge(this.data, data, true)
      this.loading(false)
      return data
    }

    subscribeToParamChanges() {
      return this.params.subscribe(() => this.reload())
    }

    dispose() {
      this._updater.dispose()
    }

    static async factory(params) {
      const m = await this.fetch(params)
      return Reflect.construct(this, [m, params])
    }

    static async fetch(params) { // eslint-disable-line
      throw new Error('Model.fetch is a stub and requires implementation! Use the ajax mixin or define `static async fetch(params)` in the class provided to `extend`.')
    }
  }, ...mixins)
}
