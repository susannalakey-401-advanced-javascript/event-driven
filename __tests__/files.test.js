const files = require('../lib/files');
const fs = require('fs')
const events = require('../lib/events')
jest.mock('fs');

describe('files module', () => {
  let consoleLogSpy;

  beforeEach(() => {
    expect.assertions(1);
    fs.readFile.mockImplementation((filename, callback) => {
      callback(null, 'test data');
    })
    fs.writeFile.mockImplementation((filename, data, callback) => {
      callback();
    })
    consoleLogSpy = jest.spyOn(console, 'log')
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    fs.readFile.mockReset();
  });

  it('can load a file', async () => {
    const contents = await files.loadFile('foo.txt');
    expect(contents).toEqual('test data');
  })

  it('can save a file', async () => {
    const buffered = Buffer('Hello!!')
    await files.saveFile('foo.txt', buffered)
    // expect.anything works as a placeholder for an argument
    expect(fs.writeFile).toHaveBeenCalledWith('foo.txt', buffered, expect.anything())
  })


  it('raises an error if a file is invalid', async () => {
    fs.readFile.mockImplementation((filename, callback) => {
      callback(new Error('boom'), null);
    })

    try {
      await files.loadFile();
    } catch (err) {
      expect(err.message).toEqual('boom');
    }
  })

  it('can uppercase a buffer of text', async () => {
    const contents = await files.loadFile('foo.txt')
    const uppercaseIt = files.convertBuffer(contents)
    expect(uppercaseIt).toEqual('TEST DATA')
  })

  describe('alter file when the file is successful', () => {
    let callback;

    beforeEach(async () => {
      callback = jest.fn();
      events.on('save', callback)

      await files.alterFile('foo.txt');
    })

    afterEach(() => {
      events.removeListener('save', callback);
    })

    it('can alter a file', async () => {
      expect(fs.writeFile).toHaveBeenCalledWith('foo.txt', 'TEST DATA', expect.anything())

    })

    it('called the callback with the test data', () => {
      const successStatus = {
        status: 0,
        file: 'foo.txt',
        message: 'Saved Properly'
      }
      expect(callback).toHaveBeenCalledWith(successStatus);
    })


  })

  describe('alter file when it is not succesful', () => {
    let callback;

    beforeEach(async () => {
      callback = jest.fn();
      events.on('err', callback)
      fs.readFile.mockImplementation((filename, callback) => {
        callback(new Error('boom'), null);
      })
      await files.alterFile('foo.txt');

    })

    afterEach(() => {
      events.removeListener('save', callback);
    })

    it('called the callback with the test data', () => {
      const failStatus = {
        status: 1,
        file: 'foo.txt',
        message: 'boom'
      }
      expect(callback).toHaveBeenCalledWith(failStatus);
    })


  })


})





