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
var NotificationService = (function () {
    function NotificationService() {
        this.notificationsWrapper = document.createElement("div");
        this.notificationsWrapper.classList.add("notification-wrapper");
        document.body.appendChild(this.notificationsWrapper);
    }
    NotificationService.prototype.error = function (error) {
        this.showMessage_(error, "#cc0000");
    };
    NotificationService.prototype.note = function (message) {
        this.showMessage_(message, "#009ee8");
    };
    NotificationService.prototype.showMessage_ = function (message, color) {
        var _this = this;
        var block = document.createElement("div");
        block.innerText = message;
        block.classList.add("notification-block");
        block.style.background = color;
        this.notificationsWrapper.appendChild(block);
        setTimeout(function () {
            _this.notificationsWrapper.removeChild(block);
        }, 6000);
    };
    return NotificationService;
}());
NotificationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map