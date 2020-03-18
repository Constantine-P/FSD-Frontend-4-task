class EventEmitter {
  private events: {};

  private canEmit: boolean;

  constructor() {
    this.events = {};
    this.canEmit = true;
  }

  on(evt: string, listener: EventListener): EventEmitter {
    (this.events[evt] || (this.events[evt] = [])).push(listener);
    return this;
  }

  emit(evt: string, arg?): void {
    if (this.canEmit) {
      (this.events[evt] || []).slice().forEach((lsn) => lsn(arg));
    }
  }

  enableEmitting(): void {
    this.canEmit = true;
  }

  disableEmitting(): void {
    this.canEmit = false;
  }
}

export default EventEmitter;
