const events = require('./events')

// const logger = {}

const save = payload => {
  console.log(payload)
}

const err = payload => {
  console.error(payload)
}

// add an events.on for file save that calls logger.save
events.on('save', save);
// add an events.on for file error that calls logger.err
events.on('err', err);

// module.exports = logger
