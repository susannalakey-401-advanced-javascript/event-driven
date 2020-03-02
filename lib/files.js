const fs = require('fs')
const util = require('util')

require('./logger')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const files = {}

files.loadFile = file => readFile(file)

files.saveFile = (file, buffer) => writeFile(file, buffer)

files.convertBuffer = buffer => {
  // should take in a buffer and return a new Buffer
  // which has the capitalized contents of the input buffer
}

files.alterFile = async file => {
  // load some file into a buffer
  // convert the buffer into a uppercased version of its string representation
  // save the file
  // on success emit a success status ("0" in UNIX means "success")
  // const status = {
  //   status: 0,
  //   file: file,
  //   message: 'Saved Properly'
  // }
  // events.emit('save', status)
  // on failure emit a failure status
  // const status = { status: 1 }, etc.
}

module.exports = files
