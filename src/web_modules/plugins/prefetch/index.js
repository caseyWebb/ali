import { isEmpty, each, values } from 'lodash'

import { fetch as fetchComponent } from '../component'
import { fetch as fetchComponents } from '../components'
import { fetch as fetchStyles } from '../styles'

export default (view) =>
  () => ({
    afterRender() {
      prefetch(view)

      if (view.routes) {
        each(view.routes, (r) => prefetch(r))
      }
    }
  })

function prefetch({
  component = {},
  components = {},
  styles = [],
  prefetch: _views = [],
  routes = {}
}) {
  fetchComponent(component)
  fetchComponents(components)
  fetchStyles(styles)

  each(_views, prefetch)

  const subRoutes = values(routes)
  if (!isEmpty(subRoutes)) {
    prefetch(subRoutes[0])
  }
}
