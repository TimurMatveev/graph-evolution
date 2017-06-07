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
var actions_1 = require("../../enums/actions/actions");
var conditions_1 = require("../../enums/conditions/conditions");
var graph_service_1 = require("../../services/GraphService/graph.service");
var watchableStorage_service_1 = require("../../services/WatchableStorageService/watchableStorage.service");
var machineLoader_service_1 = require("../../services/MachineLoaderService/machineLoader.service");
var machine_service_1 = require("../../services/MachineService/machine.service");
var MachineLoaderComponent = (function () {
    function MachineLoaderComponent(GraphService, WatchableStorage, MachineLoaderService, MachineService) {
        this.GraphService = GraphService;
        this.WatchableStorage = WatchableStorage;
        this.MachineLoaderService = MachineLoaderService;
        this.MachineService = MachineService;
        this.isLoading = false;
        this.machines = [];
    }
    MachineLoaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.MachineLoaderService.getMachines()
            .subscribe(function (machines) {
            _this.machines = machines;
            _this.isLoading = false;
        });
    };
    MachineLoaderComponent.prototype.selectMachine = function ($event, machine) {
        var instructions = {};
        for (var state in machine.instructions) {
            var instruction = machine.instructions[state];
            instructions[state] = {
                color: instruction.color,
                name: instruction.name,
                terminate: instruction.terminate,
                variants: instruction.variants.map(function (variant) {
                    var callback = function (builded) {
                        return function (item) {
                            var compare = builded[item.name];
                            var result = {};
                            var _loop_1 = function (key) {
                                if (key == "params") {
                                    result[key] = compare[key].map(function (param, i) {
                                        return {
                                            value: item[key][i].value,
                                            type: compare[key][i].type,
                                            description: compare[key][i].description
                                        };
                                    });
                                }
                                else {
                                    result[key] = item[key] || compare[key];
                                }
                            };
                            for (var key in compare) {
                                _loop_1(key);
                            }
                            return result;
                        };
                    };
                    return {
                        actions: variant.actions.map(callback(actions_1.ACTIONS)),
                        conditions: variant.conditions.map(callback(conditions_1.CONDITIONS)),
                        toState: variant.toState
                    };
                })
            };
        }
        this.WatchableStorage.set("instructions", instructions);
        this.MachineService.stopMachine();
        var nextGraph = this.GraphService.avaliableGraphs.find(function (item) { return item.name == machine.initialGraph.name; });
        nextGraph.params.forEach(function (param, i) { return param.value = machine.initialGraph.params[i].value; });
        this.GraphService.setGraph(nextGraph.callback.apply(nextGraph, nextGraph.params.map(function (item) { return parseInt(item.value); })).graph);
        this.GraphService.changeSelected(machine.initialGraph);
        this.GraphService.rerender();
        this.WatchableStorage.set("updateMachine", {
            isUpdate: true,
            id: machine._id,
            name: machine.name,
            description: machine.description
        });
    };
    MachineLoaderComponent.prototype.removeMachine = function ($event, machine) {
        var _this = this;
        this.isLoading = true;
        $event.stopPropagation();
        this.MachineLoaderService.deleteMachine(machine._id)
            .subscribe(function (data) {
            for (var i = 0; i < _this.machines.length; i++) {
                if (_this.machines[i]._id == machine._id) {
                    _this.machines.splice(i, 1);
                }
            }
            _this.isLoading = false;
        });
    };
    return MachineLoaderComponent;
}());
MachineLoaderComponent = __decorate([
    core_1.Component({
        selector: 'machine-loader',
        templateUrl: './src/components/machineLoader/machineLoader.template.html',
        styleUrls: ['./src/components/machineLoader/machineLoader.template.css']
    }),
    __metadata("design:paramtypes", [graph_service_1.GraphService,
        watchableStorage_service_1.WatchableStorage,
        machineLoader_service_1.MachineLoaderService,
        machine_service_1.MachineService])
], MachineLoaderComponent);
exports.MachineLoaderComponent = MachineLoaderComponent;
//# sourceMappingURL=machineLoader.component.js.map