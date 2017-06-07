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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/cache");
var Constants_1 = require("../../constants/Constants");
var MachineLoaderService = (function () {
    function MachineLoaderService(Http) {
        this.Http = Http;
    }
    MachineLoaderService.prototype.wrapError_ = function (error) {
        /*let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = (body as any).error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }*/
        return error.message;
    };
    MachineLoaderService.prototype.getMachines = function () {
        var _this = this;
        return this.Http
            .get(Constants_1.API_URL + "/machines")
            .cache()
            .map(function (res) {
            _this.cachedMachines = res.json();
            return _this.cachedMachines;
        })
            .catch(function (error) { return Observable_1.Observable.throw(_this.wrapError_(error)); });
    };
    MachineLoaderService.prototype.saveMachine = function (machine) {
        var _this = this;
        var headers = new http_1.Headers;
        headers.append("Content-Type", "application/json");
        return this.Http.post(Constants_1.API_URL + "/machine", JSON.stringify(machine), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(_this.wrapError_(error)); });
    };
    MachineLoaderService.prototype.updateMachine = function (machine, id) {
        var _this = this;
        var headers = new http_1.Headers;
        headers.append("Content-Type", "application/json");
        return this.Http.put(Constants_1.API_URL + "/machine/" + id, JSON.stringify(machine), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(_this.wrapError_(error)); });
    };
    MachineLoaderService.prototype.deleteMachine = function (id) {
        return this.Http.delete(Constants_1.API_URL + "/machine/" + id)
            .map(function (res) { return res.json(); });
    };
    return MachineLoaderService;
}());
MachineLoaderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MachineLoaderService);
exports.MachineLoaderService = MachineLoaderService;
//# sourceMappingURL=machineLoader.service.js.map