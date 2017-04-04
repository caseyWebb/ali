import ko from 'knockout'
import Router from 'ko-component-router'
import 'knockout-punches'

import 'bindings'
import 'extenders'
import 'filters'
import 'components' // alternatively, import 'components/lazy'
import 'styles'

import {
  loading as loadingMiddleware,
  logging as loggingMiddleware
} from 'middleware'

import {
  component as componentPlugin,
  components as componentsPlugin,
  model as modelPlugin,
  prefetch as prefetchPlugin,
  query as queryPlugin,
  routes as routesPlugin,
  styles as stylesPlugin,
  title as titlePlugin,
  with as withPlugin
} from 'plugins'

import routes from './routes'

const showOverlay = ko.observable(true)

Router.setConfig({
  hashbang: false,
  base: '',
  activePathCSSClass: 'is-active'
})

Router.use(loggingMiddleware)
Router.use(loadingMiddleware(showOverlay))

// execution order matters...
Router.usePlugin(withPlugin)
Router.usePlugin(queryPlugin)
Router.usePlugin(modelPlugin)
Router.usePlugin(titlePlugin)
Router.usePlugin(componentPlugin)
Router.usePlugin(componentsPlugin)
Router.usePlugin(stylesPlugin)
Router.usePlugin(routesPlugin)
Router.usePlugin(prefetchPlugin)

Router.useRoutes(routes)

ko.punches.enableAll()

ko.applyBindings({ showOverlay })
