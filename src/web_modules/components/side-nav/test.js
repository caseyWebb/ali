import { renderComponent } from 'ko-component-tester'
import * as sideNavComponent from './index'

test('<side-nav />', () => {
  const $el = renderComponent(sideNavComponent)
})
