const fs = {}

fs.readFile = (file, callback) => {
  if (!file) {
    callback(new Error('Invalid file'))
  } else {
    callback(undefined, Buffer.from('file contents go here'))
  }
}

fs.writeFile = (file, buffer, callback) => {
  if (!file) {
    callback(new Error('Invalid file'))
  } else if (!Buffer.isBuffer(buffer)) {
    callback(new Error('Invalid buffer'))
  } else {
    callback(undefined, undefined)
  }
}

module.exports = fs
