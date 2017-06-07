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
var localization_service_1 = require("../LocalizationService/localization.service");
var notification_service_1 = require("../NotificationService/notification.service");
var MachineComposerService = (function () {
    function MachineComposerService(NotificationService, LocalizationService) {
        this.NotificationService = NotificationService;
        this.LocalizationService = LocalizationService;
    }
    MachineComposerService.prototype.compose = function (config) {
        try {
            var machine = new Machine(config);
            return machine;
        }
        catch (error) {
            var message = this.LocalizationService.getLocalized(error.message);
            this.NotificationService.error(message);
        }
    };
    return MachineComposerService;
}());
MachineComposerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        localization_service_1.LocalizationService])
], MachineComposerService);
exports.MachineComposerService = MachineComposerService;
var Machine = (function () {
    function Machine(config) {
        var error = null;
        //this._id = config.id || (error = new Error("CannotComposeMachine_idFieldNotFound"));
        this.name = config.name || (error = new Error("CannotComposeMachine_nameFieldNotFound"));
        this.description = config.description || "";
        this.initialGraph = config.initialGraph || (error = new Error("CannotComposeMachine_initialGraphFieldNotFound"));
        this.instructions = config.instructions || (error = new Error("CannotComposeMachine_instructionsFieldNotFound"));
        if (error)
            throw error;
    }
    return Machine;
}());
//# sourceMappingURL=machineComposer.service.js.map