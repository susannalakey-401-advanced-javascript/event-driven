const logger = require('../lib/logger')

describe('logger', () => {
  // when we get an error, we should log the error
  it('when we get an error, it errors on the console', () => {
    const spy = jest.spyOn(console, 'error')
    logger.err('foo')
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
  // when we successfully save a file, we should log the successful save
  it('when the file save is successful, it logs success', () => {
    const spy = jest.spyOn(console, 'log')
    logger.save('foo')
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})
