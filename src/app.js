import ko from 'knockout'
import Router from 'ko-component-router'
import 'knockout-punches'

import 'bindings'
import 'extenders'
import 'filters'
import 'components' // alternatively, import 'components/lazy'
import 'styles'

import { loading as loadingMiddleware, logging } from 'middleware'
import { component } from 'plugins'
import routes from './routes'

const showOverlay = ko.observable(true)

Router.setConfig({
  hashbang: false,
  base: '',
  activePathCSSClass: 'is-active'
})

Router.use(logging)
Router.use(loadingMiddleware(showOverlay))

Router.usePlugin(component)

Router.useRoutes(routes)

ko.punches.enableAll()

ko.applyBindings({ showOverlay })
