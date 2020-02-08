export default class EventEmitter {
    private _events: {};

    constructor() {
        this._events = {};
    }

    on(evt: string, listener: EventListener) {
        (this._events[evt] || (this._events[evt] = [])).push(listener);
        return this;
    }

    emit(evt: string, arg?) {
        (this._events[evt] || []).slice().forEach(lsn => lsn(arg));
    }
};