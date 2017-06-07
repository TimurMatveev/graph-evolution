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
var watchableStorage_service_1 = require("../services/WatchableStorageService/watchableStorage.service");
var localization_service_1 = require("../services/LocalizationService/localization.service");
var machine_service_1 = require("../services/MachineService/machine.service");
var graph_service_1 = require("../services/GraphService/graph.service");
var AppComponent = (function () {
    function AppComponent(WatchableStorage, LocalizationService, MachineService, GraphService) {
        this.WatchableStorage = WatchableStorage;
        this.LocalizationService = LocalizationService;
        this.MachineService = MachineService;
        this.GraphService = GraphService;
        this.isPinned = false;
        this.language = this.LocalizationService.getCurrentLanguage();
        this.viewportDisplayMode = '3d';
        this.isInitializationFieldOpened = false;
        this.isLoadingMachineFieldOpened = false;
    }
    AppComponent.prototype.setLanguage = function (language) {
        this.language = language;
        this.LocalizationService.setLanguage(language);
    };
    AppComponent.prototype.setViewportDisplayMode = function (mode) {
        mode = mode.toLowerCase();
        if (mode == '2d' || mode == '3d') {
            this.viewportDisplayMode = mode;
        }
    };
    AppComponent.prototype.toggleInitialization = function (toggle) {
        this.isLoadingMachineFieldOpened = false;
        this.isSavingMachineFieldOpened = false;
        if (toggle === true || toggle === false) {
            this.isInitializationFieldOpened = toggle;
        }
        else {
            this.isInitializationFieldOpened = !this.isInitializationFieldOpened;
        }
    };
    AppComponent.prototype.toggleLoadingMachine = function (toggle) {
        this.isInitializationFieldOpened = false;
        this.isSavingMachineFieldOpened = false;
        if (toggle === true || toggle === false) {
            this.isLoadingMachineFieldOpened = toggle;
        }
        else {
            this.isLoadingMachineFieldOpened = !this.isLoadingMachineFieldOpened;
        }
    };
    AppComponent.prototype.toggleSavingMachine = function (toggle) {
        this.isInitializationFieldOpened = false;
        this.isLoadingMachineFieldOpened = false;
        if (toggle === true || toggle === false) {
            this.isSavingMachineFieldOpened = toggle;
        }
        else {
            this.isSavingMachineFieldOpened = !this.isSavingMachineFieldOpened;
        }
    };
    AppComponent.prototype.machineToggle = function () {
        this.MachineService.isRunning ? this.MachineService.pauseMachine() : this.MachineService.startMachine();
    };
    AppComponent.prototype.machineSlower = function () {
        this.MachineService.multiplySpeed(0.5);
    };
    AppComponent.prototype.machineFaster = function () {
        this.MachineService.multiplySpeed(2);
    };
    AppComponent.prototype.pinAll = function () {
        this.isPinned = true;
        this.WatchableStorage.set('nodePinMode', true);
        this.GraphService.setAllNodesPin(true);
    };
    AppComponent.prototype.unpinAll = function () {
        this.isPinned = false;
        this.WatchableStorage.set('nodePinMode', false);
        this.GraphService.setAllNodesPin(false);
    };
    AppComponent.prototype.onPinModeCheck = function () {
        this.isPinned = this.isPinned ? false : true;
        this.WatchableStorage.set('nodePinMode', this.isPinned);
    };
    AppComponent.prototype.restartMachine = function () {
        var selectedGraph = this.GraphService.avaliableGraphs.find(function (graph) {
            return graph.selected;
        });
        this.MachineService.stopMachine();
        this.GraphService.setGraph(selectedGraph.callback.apply(selectedGraph, selectedGraph.params.map(function (item) { return parseInt(item.value); })).graph);
        this.GraphService.changeSelected(selectedGraph);
        this.GraphService.rerender();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'graph-evolution',
        templateUrl: './src/app/app.template.html',
        styleUrls: ['./src/app/app.template.css']
    }),
    __metadata("design:paramtypes", [watchableStorage_service_1.WatchableStorage,
        localization_service_1.LocalizationService,
        machine_service_1.MachineService,
        graph_service_1.GraphService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map