/* eslint-disable no-console */

export default function * (ctx) {
  const start = performance.now()
  console.info(`Navigating to ${ctx.canonicalPath}`)
  yield
  const end = performance.now()
  console.info(`Navigation completed in ${end - start}ms`)
}
