const events = require('../lib/events')

describe('event emitter', () => {


  describe('when a subscription is created for an event', () => {
    let callback;

    beforeEach(() => {
      callback = jest.fn();
      events.on('stuff', callback)
    })

    afterEach(() => {
      events.removeListener('stuff', callback);
    })

    describe('when the event is fired', () => {
      let payload;
      beforeEach(() => {
        payload = 'hi';
        events.emit('stuff', payload);
      })

      it('calls the callback', () => {
        expect(callback).toHaveBeenCalledWith('hi');
      })
    })

    describe('when a different event is fired', () => {
      beforeEach(() => {
        events.emit('test')
      })
      it('does not call the callback', () => {
        expect(callback).not.toHaveBeenCalled()
      })
    })
  })
})