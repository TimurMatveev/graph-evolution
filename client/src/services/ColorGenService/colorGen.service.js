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
var RANGE = {
    min: 0x33,
    max: 0xDD
};
var DELTA = 0x44;
var ColorGen = (function () {
    function ColorGen() {
        this.R = RANGE.max;
        this.G = RANGE.max;
        this.B = RANGE.max;
    }
    ColorGen.prototype.getNextColor = function () {
        var result = this.getHexColor();
        this.next();
        return result;
    };
    ColorGen.prototype.getHexColor = function () {
        var result = new Number(this.R * 0x10000 + this.G * 0x100 + this.B);
        return "0x" + result.toString(16);
    };
    ColorGen.prototype.next = function () {
        var nextValue = function (value) {
            return value - DELTA < RANGE.min ? (RANGE.max - DELTA / 2) : (value - DELTA);
        };
        var random = Math.floor(Math.random() * 3);
        var color;
        switch (random) {
            case (0):
                this.R = nextValue(this.R);
                break;
            case (1):
                this.G = nextValue(this.G);
                break;
            case (2):
                this.B = nextValue(this.B);
                break;
        }
    };
    return ColorGen;
}());
ColorGen = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ColorGen);
exports.ColorGen = ColorGen;
//# sourceMappingURL=colorGen.service.js.map