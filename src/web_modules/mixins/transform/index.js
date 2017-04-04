export default (transform) => (_super = class {}) => class extends _super {
  static async fetch(params, ...args) {
    const res = await super.fetch(params, ...args)
    return transform(res)
  }
}
