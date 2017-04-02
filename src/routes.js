import home from './home'
import preface from './preface'
import tooling from './tooling'
import development from './development'
import production from './production'

export default {
  '/':                  home,
  '/preface':           preface,
  '/tooling':           tooling,
  '/development':       development,
  '/production':        production,
  '/web_modules': {
    routes: {
      '/bindings':    { title: 'web_modules | bindings', component: () => ({ template: import('bindings/README.md') }) },
      '/components':  { title: 'web_modules | components', component: () => ({ template: import('components/README.md') }) },
      '/extenders':   { title: 'web_modules | extenders', component: () => ({ template: import('extenders/README.md') }) },
      '/filters':     { title: 'web_modules | filters', component: () => ({ template: import('filters/README.md') }) },
      '/middleware':  { title: 'web_modules | middleware', component: () => ({ template: import('middleware/README.md') }) },
      '/plugins':     { title: 'web_modules | plugins', component: () => ({ template: import('plugins/README.md') }) },
      '/styles':      { title: 'web_modules | styles', component: () => ({ template: import('styles/README.md') }) },
      '/utils':       { title: 'web_modules | utils', component: () => ({ template: import('utils/README.md') }) }
    }
  },
  '/plugins': {
    routes: {
      '/component':   { title: 'plugins | component', component: () => ({ template: import('plugins/component/README.md') }) },
      '/components':  { title: 'plugins | components', component: () => ({ template: import('plugins/components/README.md') }) },
      '/model':       { title: 'plugins | model', component: () => ({ template: import('plugins/model/README.md') }) },
      '/prefetch':    { title: 'plugins | prefetch', component: () => ({ template: import('plugins/prefetch/README.md') }) },
      '/query':       { title: 'plugins | query', component: () => ({ template: import('plugins/query/README.md') }) },
      '/routes':      { title: 'plugins | routes', component: () => ({ template: import('plugins/routes/README.md') }) },
      '/styles':      { title: 'plugins | styles', component: () => ({ template: import('plugins/styles/README.md') }) },
      '/title':       { title: 'plugins | title', component: () => ({ template: import('plugins/title/README.md') }) },
      '/with':        { title: 'plugins | with', component: () => ({ template: import('plugins/with/README.md') }) }
    }
  }
}
