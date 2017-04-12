import { isFunction } from 'lodash'

export default ({ title: _title }) => {
  if (_title) {
    let prevTitle

    return function * (ctx) {
      // this plugin runs in the afterRender phase so that it has access to data
      // loaded in the beforeRender without having to disable queueing. the ux is
      // arguably nicer as well, as it changes with the page, not with the loader
      yield
      prevTitle = document.title
      document.title = `Ali | ${isFunction(_title) ? _title(ctx) : _title}`
      yield
      yield
      // because we set the title in the afterRender, it is safe to remove it
      // in the afterRender without overlap issues
      document.title = prevTitle
    }
  }
}
