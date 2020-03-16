class EventEmitter {
  private _events: {};

  private _canEmit: boolean;

  constructor() {
    this._events = {};
    this._canEmit = true;
  }

  on(evt: string, listener: EventListener): EventEmitter {
    (this._events[evt] || (this._events[evt] = [])).push(listener);
    return this;
  }

  emit(evt: string, arg?): void {
    if (this._canEmit) {
      (this._events[evt] || []).slice().forEach((lsn) => lsn(arg));
    }
  }

  enableEmitting(): void {
    this._canEmit = true;
  }

  disableEmitting(): void {
    this._canEmit = false;
  }
}

export default EventEmitter;
