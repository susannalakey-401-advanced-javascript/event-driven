const files = require('../lib/files');
const fs = require('fs')

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

  // what is considered an invalid file? when given no argument, it still returns an object
  it('raises an error if a file is invalid', async () => {
    //fs.readFile.mockReturnValue(Promise.reject('boom'));
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
})

it('can alter a file', () => {

})

