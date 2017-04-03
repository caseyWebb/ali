export default {
  '/':                { title: 'Introduction', component: () => ({ template: import('../README.md') }) },
  '/building':        { title: 'Building', component: () => ({ template: import('../tasks/README.md') }) },

  '/web_modules': {
    title: 'web_modules',
    routes: {
      '/bindings':    { title: 'bindings', component: () => ({ template: import('bindings/README.md') }) },
      '/components':  { title: 'components', component: () => ({ template: import('components/README.md') }) },
      '/extenders':   { title: 'extenders', component: () => ({ template: import('extenders/README.md') }) },
      '/filters':     { title: 'filters', component: () => ({ template: import('filters/README.md') }) },
      '/middleware':  { title: 'middleware', component: () => ({ template: import('middleware/README.md') }) },
      '/plugins':     { title: 'plugins', component: () => ({ template: import('plugins/README.md') }) },
      '/styles':      { title: 'styles', component: () => ({ template: import('styles/README.md') }) },
      '/utils':       { title: 'utils', component: () => ({ template: import('utils/README.md') }) }
    }
  },
  '/plugins': {
    title: 'plugins',
    routes: {
      '/component':   { title: 'component', component: () => ({ template: import('plugins/component/README.md') }) },
      '/components':  { title: 'components', component: () => ({ template: import('plugins/components/README.md') }) },
      '/model':       { title: 'model', component: () => ({ template: import('plugins/model/README.md') }) },
      '/prefetch':    { title: 'prefetch', component: () => ({ template: import('plugins/prefetch/README.md') }) },
      '/query':       { title: 'query', component: () => ({ template: import('plugins/query/README.md') }) },
      '/routes':      { title: 'routes', component: () => ({ template: import('plugins/routes/README.md') }) },
      '/styles':      { title: 'styles', component: () => ({ template: import('plugins/styles/README.md') }) },
      '/title':       { title: 'title', component: () => ({ template: import('plugins/title/README.md') }) },
      '/with':        { title: 'with', component: () => ({ template: import('plugins/with/README.md') }) }
    }
  },
  '/guides': {
    routes: {
      '/ajax':            { title: 'Ajax', component: () => ({ template: import('../guides/ajax.md') }) },
      '/creating-a-view': { title: 'Creating a View', component: () => ({ template: import('../guides/creating-a-view.md') }) },
      '/nested-routing':  { title: 'Nested Routing', component: () => ({ template: import('../guides/nested-routing.md') }) }
    }
  }
}
