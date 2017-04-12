export default {
  '/': {
    title: 'introduction',
    routes: {
      '/':            { title: 'What is Ali?', component: () => ({ template: import('../README.md') }) },
      '/building':    { title: 'Building', component: () => ({ template: import('../tasks/README.md') }) },
      '/testing':     { title: 'Testing', component: () => ({ template: import('../test/README.md') }) }
    }
  },

  '/web_modules': {
    title: 'web_modules',
    routes: {
      '/bindings':    { title: 'bindings', component: () => ({ template: import('bindings/README.md') }) },
      '/components':  { title: 'components', component: () => ({ template: import('components/README.md') }) },
      '/extenders':   { title: 'extenders', component: () => ({ template: import('extenders/README.md') }) },
      '/filters':     { title: 'filters', component: () => ({ template: import('filters/README.md') }) },
      '/middleware':  { title: 'middleware', component: () => ({ template: import('middleware/README.md') }) },
      '/mixins':      { title: 'mixins', component: () => ({ template: import('mixins/README.md') }) },
      '/plugins':     { title: 'plugins', component: () => ({ template: import('plugins/README.md') }) },
      '/styles':      { title: 'styles', component: () => ({ template: import('styles/README.md') }) },
      '/utils':       { title: 'utils', component: () => ({ template: import('utils/README.md') }) }
    }
  },
  '/plugins': {
    title: 'default plugins',
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
  '/utils': {
    title: 'utils',
    routes: {
      '/model':       { title: 'model', component: () => ({ template: import('utils/model/README.md') }) }
    }
  },
  '/mixins': {
    title: 'mixins',
    routes: {
      '/api':         { title: 'api', component: () => ({ template: import('mixins/api/README.md') }) },
      '/caching':     { title: 'caching', component: () => ({ template: import('mixins/caching/README.md') }) },
      '/tap':         { title: 'tap', component: () => ({ template: import('mixins/tap/README.md') }) },
      '/transform':   { title: 'transform', component: () => ({ template: import('mixins/transform/README.md') }) }
    }
  },
  '/guides': {
    title: 'guides',
    routes: {
      '/working-with-data': { title: 'Working with Data', component: () => ({ template: import('../guides/working-with-data.md') }) },
      '/creating-a-view':   { title: 'Creating a View', component: () => ({ template: import('../guides/creating-a-view.md') }) },
      '/nested-routing':    { title: 'Nested Routing', component: () => ({ template: import('../guides/nested-routing.md') }) }
    }
  }
}
