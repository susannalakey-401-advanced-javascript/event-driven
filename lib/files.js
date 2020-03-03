const fs = require('fs')
const util = require('util')

const events = require('./events')

const readFile = util.promisify(fs.readFile, 'utf8')
const writeFile = util.promisify(fs.writeFile)

const files = {}

files.loadFile = file => readFile(file);

files.saveFile = (file, buffer) => writeFile(file, buffer);

files.convertBuffer = buffer => {
  return buffer.toString().toUpperCase();
}

files.alterFile = async file => {
  // load some file into a buffer
  try {
    const loadedFile = await files.loadFile(file);
    // convert the buffer into a uppercased version of its string representation
    const uppercasedContents = await files.convertBuffer(loadedFile);
    // save the file
    await files.saveFile(file, uppercasedContents);

    // on success emit a success status ("0" in UNIX means "success")
    const successStatus = {
      status: 0,
      file: file,
      message: 'Saved Properly'
    }
    events.emit('save', successStatus);
  } catch (e) {
    const failStatus = {
      status: 1,
      file: file,
      message: e.message
    }
    events.emit('err', failStatus);
  }
  // on failure emit a failure status
  // const status = { status: 1 }, etc.
}

module.exports = files


