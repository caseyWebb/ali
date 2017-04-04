import { isFunction } from 'lodash'

export default ({ title: _title }) => {
  if (_title) {
    let prevTitle

    return (ctx) => ({
      afterRender() {
        prevTitle = document.title
        document.title = `Ali | ${isFunction(_title) ? _title(ctx) : _title}`
      },
      afterDispose() {
        document.title = prevTitle
      }
    })
  }
}
