export default (fn) => (_super = class {}) => class extends _super {
  static async fetch(params, page) {
    const res = await super.fetch(params, page)
    fn(res)
    return res
  }
}
