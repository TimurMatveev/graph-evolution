import { Injectable } from '@angular/core';

@Injectable()
export class WatchableStorage {
    private values: Object = {};
    private handlers: Object = {};

    constructor () {
        this.handlers = {};
        this.values = {};
    }

    on(key: string, handler: Function): WatchableStorage {
        let handlers: Array<Function> = this.handlers[key];

        if (handlers) {
            handlers.push(handler);
        } else {
            this.handlers[key] = [handler];
        }

        return this;
    }

    set(key: string, value: any): WatchableStorage {
        let handlers: Array<Function> = this.handlers[key];
        let oldVal: any = this.values[key];

        this.values[key] = value;
        if (handlers && handlers.length) {
            handlers.forEach((handler: Function) => {
                handler(value, oldVal, key);
            });

            console.clear();
            console.dir(this.values);
        }

        return this;
    }

    get(key: string, formatter?: Function): any {
        return formatter ? formatter(this.values[key]) : this.values[key];
    }
}