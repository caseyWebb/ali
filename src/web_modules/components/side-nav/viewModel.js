import { map } from 'lodash'
import routes from '../../../routes'

export default class SideNavViewModel {
  constructor() {
    this.sections = map(routes, ({ title, routes }, parentPath) => ({
      title,
      routes: map(routes, ({ title }, path) => ({
        path: parentPath + path,
        title
      }))
    }))
  }
}
