import EventEmitter from '../classes/EventEmitter';

describe('test EventEmitter', () => {
  it('test on & emit methods', () => {
    let n = 1;
    const eventEmitter = new EventEmitter();
    const changeListener = (): void => {
      n += 1;
    };
    eventEmitter.on('change', changeListener);
    eventEmitter.emit('change');
    expect(n).toBe(2);
    eventEmitter.disableEmitting();
    eventEmitter.emit('change');
    expect(n).toBe(2);
    eventEmitter.enableEmitting();
    eventEmitter.emit('change');
    expect(n).toBe(3);
  });
});
