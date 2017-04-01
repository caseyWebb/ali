import home from './home'
import preface from './preface'
import tooling from './tooling'
import development from './development'
import production from './production'
import app from './app/index.js'
import routes from './routes/index.js'
import bindings from './bindings'
import filters from './filters'
import extenders from './extenders'
import components from './components'
import middleware from './middleware'
import plugins from './plugins'
import styles from './styles'
import utils from './utils'
import views from './views'

export default {
  '/':                  home,
  '/preface':           preface,
  '/tooling':           tooling,
  '/development':       development,
  '/production':        production,
  '/app':               app,
  '/routes':            routes,
  '/bindings':          bindings,
  '/extenders':         extenders,
  '/filters':           filters,
  '/components':        components,
  '/middleware':        middleware,
  '/plugins':           plugins,
  '/styles':            styles,
  '/utils':             utils,
  '/views':             views
}
