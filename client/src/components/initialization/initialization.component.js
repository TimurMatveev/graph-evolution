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
var watchableStorage_service_1 = require("../../services/WatchableStorageService/watchableStorage.service");
var graph_service_1 = require("../../services/GraphService/graph.service");
var machine_service_1 = require("../../services/MachineService/machine.service");
var InitializationComponent = (function () {
    function InitializationComponent(WatchableStorage, GraphService, MachineService) {
        var _this = this;
        this.WatchableStorage = WatchableStorage;
        this.GraphService = GraphService;
        this.MachineService = MachineService;
        this.currentState = 'Start';
        this.avaliableGraphs = this.GraphService.avaliableGraphs;
        this.alphabet = this.WatchableStorage.get('instructions', function (instructions) { return Object.keys(instructions); });
        this.currentInstruction = this.getCurrentInstruction();
        this.WatchableStorage.on('instructions', function (newValue) {
            _this.alphabet = Object.keys(newValue);
        });
    }
    InitializationComponent.prototype.changeSelectedGraph = function ($event, value) {
        this.MachineService.stopMachine();
        var target = $event.target;
        if (target.nodeName.toLowerCase() !== "input") {
            this.GraphService.setGraph(value.callback.apply(value, value.params.map(function (item) { return parseInt(item.value); })).graph);
            this.GraphService.changeSelected(value);
            this.GraphService.rerender();
        }
    };
    InitializationComponent.prototype.getCurrentInstruction = function () {
        return this.WatchableStorage.get('instructions')[this.currentState];
    };
    InitializationComponent.prototype.setCurrentState = function (state) {
        this.currentState = state;
        this.currentInstruction = this.getCurrentInstruction();
    };
    InitializationComponent.prototype.addNewState = function ($event, input) {
        if ($event.type == "click" || ($event.type == "keydown" && $event.key.toLowerCase() == 'enter')) {
            this.MachineService.addNewState(input.value);
            input.value = '';
        }
    };
    InitializationComponent.prototype.removeState = function (state) {
        this.MachineService.removeState(state);
    };
    InitializationComponent.prototype.isRemovable = function (state) {
        return this.MachineService.isRemovable(state);
    };
    InitializationComponent.prototype.changeState = function (instruction, toState) {
        instruction.toState = toState;
        this.updateInstructions();
    };
    InitializationComponent.prototype.addNewInstruction = function () {
        this.MachineService.addNewInstruction(this.currentState);
    };
    InitializationComponent.prototype.updateInstructions = function () {
        this.MachineService.update();
    };
    InitializationComponent.prototype.removeInstruction = function (instruction) {
        this.MachineService.removeInstruction(this.currentState, instruction);
    };
    return InitializationComponent;
}());
InitializationComponent = __decorate([
    core_1.Component({
        selector: 'initialization',
        templateUrl: './src/components/initialization/initialization.template.html',
        styleUrls: ['./src/components/initialization/initialization.template.css']
    }),
    __metadata("design:paramtypes", [watchableStorage_service_1.WatchableStorage,
        graph_service_1.GraphService,
        machine_service_1.MachineService])
], InitializationComponent);
exports.InitializationComponent = InitializationComponent;
//# sourceMappingURL=initialization.component.js.map