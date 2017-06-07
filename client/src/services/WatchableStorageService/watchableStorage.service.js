"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WatchableStorage = (function () {
    function WatchableStorage() {
        this.values = {};
        this.handlers = {};
        this.handlers = {};
        this.values = {};
    }
    WatchableStorage.prototype.on = function (key, handler) {
        var handlers = this.handlers[key];
        if (handlers) {
            handlers.push(handler);
        }
        else {
            this.handlers[key] = [handler];
        }
        return this;
    };
    WatchableStorage.prototype.set = function (key, value) {
        var handlers = this.handlers[key];
        var oldVal = this.values[key];
        this.values[key] = value;
        if (handlers && handlers.length) {
            handlers.forEach(function (handler) {
                handler(value, oldVal, key);
            });
            console.clear();
            console.dir(this.values);
        }
        return this;
    };
    WatchableStorage.prototype.get = function (key, formatter) {
        return formatter ? formatter(this.values[key]) : this.values[key];
    };
    return WatchableStorage;
}());
WatchableStorage = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], WatchableStorage);
exports.WatchableStorage = WatchableStorage;
//# sourceMappingURL=watchableStorage.service.js.map