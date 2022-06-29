const path = require('path')
const fs = require('fs')

const proxyFile = path.resolve(__dirname, 'proxy.js')

if (!fs.existsSync(proxyFile)) {
  fs.writeFileSync(
    proxyFile,
    `module.exports = {
  '/bi': {
    target: 'http://10.10.14.123:8190',
    changeOrigin: true
  }
}`
  )
}

exports.proxyFile = proxyFile
