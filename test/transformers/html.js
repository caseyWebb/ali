const fs = require('fs')

module.exports = {
  process(src, filename) {
    return 'module.exports = `' + fs.readFileSync(filename) + '`;'
  },
}
