export default class EventEmitter {
    private _events: {};
    private _canEmit: boolean;

    constructor() {
        this._events = {};
        this._canEmit = true
    }

    on(evt: string, listener: EventListener) {
        (this._events[evt] || (this._events[evt] = [])).push(listener);
        return this;
    }

    emit(evt: string, arg?) {
        if (this._canEmit) {
            (this._events[evt] || []).slice().forEach(lsn => lsn(arg));
        }
    }

    enableEmitting() {
        this._canEmit = true;
    }

    disableEmitting() {
        this._canEmit = false;
    }
};
