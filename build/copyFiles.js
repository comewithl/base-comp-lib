const fs = require('fs')
const { resolve } = require('path')
fs.copyFileSync(resolve(__dirname, '../utils/entryfile.js'), resolve(__dirname, '../lib/index.js'))