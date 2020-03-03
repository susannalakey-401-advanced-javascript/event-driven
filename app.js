const files = require('./lib/files')

const inputFileName = process.argv.slice(2).shift()


require('./logger')

files.alterFile(inputFileName)
