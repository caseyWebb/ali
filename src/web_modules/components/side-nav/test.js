import 'helpers/punches'
import $ from 'jquery'
import ko from 'knockout'
import { renderComponent } from 'ko-component-tester'
import * as sideNavComponent from './index'

test('<side-nav />', () => {
  ko.bindingHandlers.path = { init: jest.fn() }

  const $el = renderComponent(sideNavComponent)

  expect($('[data-test=bindings-link]', $el).get(0)).toBeDefined()
  expect(ko.bindingHandlers.path.init).toHaveBeenCalled()

  $el.dispose()
})

test('<side-nav /> viewModel', () => {
  const vm = new sideNavComponent.viewModel()

  expect(vm.sections).toContainEqual({
    title: 'web_modules',
    routes: [
      { title: 'bindings', path: '/web_modules/bindings' },
      { title: 'components', path: '/web_modules/components' },
      { title: 'extenders', path: '/web_modules/extenders' },
      { title: 'filters', path: '/web_modules/filters' },
      { title: 'middleware', path: '/web_modules/middleware' },
      { title: 'mixins', path: '/web_modules/mixins' },
      { title: 'plugins', path: '/web_modules/plugins' },
      { title: 'styles', path: '/web_modules/styles' },
      { title: 'utils', path: '/web_modules/utils' },
    ]
  })
})
