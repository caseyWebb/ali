import { isEmpty, each, values } from 'lodash'

import { fetch as fetchComponent } from '../component'
import { fetch as fetchComponents } from '../components'
import { fetch as fetchModel } from '../model'
import { fetch as fetchStyles } from '../styles'

export default ({ routes }) => {
  if (routes) {
    return () => ({
      afterRender() {
        if (routes) {
          each(routes, (r) => prefetch(r))
        }
      }
    })
  }
}

function prefetch({
  component = {},
  components = {},
  model = {},
  styles = [],
  routes = {}
}) {
  fetchComponent(component)
  fetchComponents(components)
  fetchModel(model)
  fetchStyles(styles)

  const subRoutes = values(routes)
  if (!isEmpty(subRoutes)) {
    prefetch(subRoutes[0])
  }
}
