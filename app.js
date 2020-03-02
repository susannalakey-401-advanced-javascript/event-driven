const files = require('./lib/files')

const inputFileName = process.argv.slice(2).shift()

files.alterFile(inputFileName)
