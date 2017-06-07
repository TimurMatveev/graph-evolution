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
var graph_service_1 = require("../../services/GraphService/graph.service");
var watchableStorage_service_1 = require("../../services/WatchableStorageService/watchableStorage.service");
var machineLoader_service_1 = require("../../services/MachineLoaderService/machineLoader.service");
var machineComposer_service_1 = require("../../services/MachineComposerService/machineComposer.service");
var localization_service_1 = require("../../services/LocalizationService/localization.service");
var notification_service_1 = require("../../services/NotificationService/notification.service");
var MachineSaverComponent = (function () {
    function MachineSaverComponent(GraphService, WatchableStorage, MachineLoaderService, MachineComposerService, LocalizationService, NotificationService) {
        this.GraphService = GraphService;
        this.WatchableStorage = WatchableStorage;
        this.MachineLoaderService = MachineLoaderService;
        this.MachineComposerService = MachineComposerService;
        this.LocalizationService = LocalizationService;
        this.NotificationService = NotificationService;
        var updateMachine = WatchableStorage.get("updateMachine");
        if (updateMachine) {
            this.machineName = updateMachine.name;
            this.machineDescription = updateMachine.description;
            this.isUpdate = updateMachine.isUpdate;
        }
        else {
            this.machineName = "";
            this.machineDescription = "";
            this.isUpdate = false;
        }
    }
    MachineSaverComponent.prototype.ngOnInit = function () {
        var selectedGraph = this.GraphService.avaliableGraphs.find(function (graph) { return graph.selected; });
        var initialGraph = {
            name: selectedGraph.name,
            params: selectedGraph.params
        };
        var resInstructions = {};
        var instructions = this.WatchableStorage.get("instructions");
        for (var state in instructions) {
            var instruction = instructions[state];
            resInstructions[state] = {
                color: instruction.color,
                name: instruction.name,
                terminate: instruction.terminate
            };
            resInstructions[state].variants = instruction.variants.map(function (variant) {
                var callback = function (item) {
                    return {
                        name: item.name,
                        params: item.params.map(function (param) { return { value: param.value }; })
                    };
                };
                return {
                    actions: variant.actions.map(callback),
                    conditions: variant.conditions.map(callback),
                    toState: variant.toState
                };
            });
        }
        this.machineConfig = {
            name: this.machineName,
            description: this.machineDescription,
            initialGraph: initialGraph,
            instructions: resInstructions
        };
    };
    MachineSaverComponent.prototype.saveMachine = function () {
        var _this = this;
        var machine = this.MachineComposerService.compose(this.machineConfig);
        if (machine) {
            this.MachineLoaderService.saveMachine(machine)
                .subscribe(function (machine) {
                var message = _this.LocalizationService.getLocalized("MachineSeccessfulySaved");
                _this.NotificationService.note(message);
            }, function (error) {
                var message = _this.LocalizationService.getLocalized("MachineNotSaved");
                _this.NotificationService.error(message);
            });
        }
    };
    MachineSaverComponent.prototype.updateMachine = function () {
        var _this = this;
        var machine = this.MachineComposerService.compose(this.machineConfig);
        var id = this.WatchableStorage.get("updateMachine").id;
        if (machine) {
            this.MachineLoaderService.updateMachine(machine, id)
                .subscribe(function (machine) {
                var message = _this.LocalizationService.getLocalized("MachineSeccessfulyUpdated");
                _this.NotificationService.note(message);
            }, function (error) {
                var message = _this.LocalizationService.getLocalized("MachineNotUpdated");
                _this.NotificationService.error(message);
            });
        }
    };
    return MachineSaverComponent;
}());
MachineSaverComponent = __decorate([
    core_1.Component({
        selector: 'machine-saver',
        templateUrl: './src/components/machineSaver/machineSaver.template.html',
        styleUrls: ['./src/components/machineSaver/machineSaver.template.css']
    }),
    __metadata("design:paramtypes", [graph_service_1.GraphService,
        watchableStorage_service_1.WatchableStorage,
        machineLoader_service_1.MachineLoaderService,
        machineComposer_service_1.MachineComposerService,
        localization_service_1.LocalizationService,
        notification_service_1.NotificationService])
], MachineSaverComponent);
exports.MachineSaverComponent = MachineSaverComponent;
//# sourceMappingURL=machineSaver.component.js.map