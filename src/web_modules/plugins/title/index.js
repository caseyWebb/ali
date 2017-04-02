import { isFunction, isPlainObject } from 'lodash'
import * as breadcrumbs from 'partials/breadcrumbs'
import { keywordForRoute } from 'utils/beacon'

export default ({ title: _title, beacon: hasBeacon = true }) => {
  if (_title) {
    let prevTitle
    let docTitle
    let breadcrumbTitle

    return (ctx) => ({
      afterRender() {
        prevTitle = document.title

        const title = isFunction(_title) ? _title(ctx) : _title

        if (isPlainObject(title)) {
          docTitle = title.document
          breadcrumbTitle = title.breadcrumb
        } else {
          docTitle = breadcrumbTitle = title
        }

        let beaconKeyword
        let route = ''
        let _ctx = ctx
        if (hasBeacon) {
          while (_ctx) {
            route = _ctx.route.path + route
            _ctx = _ctx.$parent
          }
          beaconKeyword = keywordForRoute(route)
        }

        if (docTitle) {
          document.title = `InstructorSite | ${docTitle}`
        }
        if (breadcrumbTitle) {
          breadcrumbs.push(breadcrumbTitle, ctx.canonicalPath, beaconKeyword)
        }
      },
      afterDispose() {
        if (docTitle) {
          document.title = prevTitle
        }
        if (breadcrumbTitle) {
          breadcrumbs.pop()
        }
      }
    })
  }
}
