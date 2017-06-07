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
var en_EN_1 = require("./localization/en_EN");
var ru_RU_1 = require("./localization/ru_RU");
var LocalizationService = (function () {
    function LocalizationService() {
        this.association = {};
        this.availableLanguages = ['english', 'russian'];
        this.currentLanguage = 'russian';
        this.association = ru_RU_1.RUSSIAN;
    }
    LocalizationService.prototype.setLanguage = function (language) {
        switch (language.toLowerCase()) {
            case 'english':
                this.association = en_EN_1.ENGLISH;
                break;
            case 'russian':
                this.association = ru_RU_1.RUSSIAN;
                break;
            default:
                this.association = ru_RU_1.RUSSIAN;
        }
    };
    LocalizationService.prototype.getCurrentLanguage = function () {
        return this.currentLanguage;
    };
    LocalizationService.prototype.getLocalized = function (value) {
        return this.association[value] || value;
    };
    return LocalizationService;
}());
LocalizationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], LocalizationService);
exports.LocalizationService = LocalizationService;
//# sourceMappingURL=localization.service.js.map