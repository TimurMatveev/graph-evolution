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
var graph_service_1 = require("../GraphService/graph.service");
var colorGen_service_1 = require("../ColorGenService/colorGen.service");
var watchableStorage_service_1 = require("../WatchableStorageService/watchableStorage.service");
var localization_service_1 = require("../LocalizationService/localization.service");
var notification_service_1 = require("../NotificationService/notification.service");
var conditions_1 = require("../../enums/conditions/conditions");
var actions_1 = require("../../enums/actions/actions");
var MachineService = (function () {
    function MachineService(GraphService, WatchableStorage, LocalizationService, NotificationService, ColorGen) {
        var _this = this;
        this.GraphService = GraphService;
        this.WatchableStorage = WatchableStorage;
        this.LocalizationService = LocalizationService;
        this.NotificationService = NotificationService;
        this.ColorGen = ColorGen;
        this.instructions = {
            'Start': {
                name: "Start",
                color: "0x009ee8",
                variants: [
                    {
                        conditions: [],
                        toState: 'Stop',
                        actions: []
                    }
                ],
                terminate: false
            },
            'Stop': {
                name: "Stop",
                color: "0x000000",
                variants: [],
                terminate: true
            }
        };
        this.conditionsList = conditions_1.CONDITIONS;
        this.actionsList = actions_1.ACTIONS;
        this.isRunning = false;
        this.frameInterval = 1000;
        this.iteration = 0;
        this.WatchableStorage.set('instructions', this.instructions).on('instructions', function (instructions) { _this.instructions = instructions; });
    }
    MachineService.prototype.getConditionsList = function () {
        return this.conditionsList;
    };
    MachineService.prototype.getActionsList = function () {
        return this.actionsList;
    };
    MachineService.prototype.addNewState = function (state) {
        this.addNewInstruction(state);
        this.update();
    };
    MachineService.prototype.removeState = function (state) {
        if (this.instructions[state]) {
            delete this.instructions[state];
            this.update();
        }
    };
    MachineService.prototype.isRemovable = function (state) {
        if (this.instructions[state]) {
            return this.instructions[state].removable;
        }
        return false;
    };
    MachineService.prototype.setRemovable = function (state, removable) {
        if (this.instructions[state]) {
            this.instructions[state].removable = removable;
            this.update();
        }
    };
    MachineService.prototype.addNewInstruction = function (state) {
        this.instructions[state] = this.instructions[state] || {
            name: state,
            color: this.ColorGen.getNextColor(),
            variants: [],
            termninate: false
        };
        this.instructions[state].variants.push({
            conditions: [],
            toState: state,
            actions: []
        });
        this.update();
    };
    MachineService.prototype.update = function () {
        this.WatchableStorage.set('instructions', this.instructions);
    };
    MachineService.prototype.removeInstruction = function (state, instruction) {
        var instructions = this.instructions[state].variants;
        var index = instructions.indexOf(instruction);
        instructions.splice(index, 1);
    };
    MachineService.prototype.startMachine = function () {
        var _this = this;
        this.isRunning = true;
        this.step();
        this.animation = setInterval(function () {
            _this.step();
        }, this.frameInterval);
        return this;
    };
    MachineService.prototype.pauseMachine = function () {
        this.isRunning = false;
        clearInterval(this.animation);
        return this;
    };
    MachineService.prototype.stopMachine = function (reason) {
        this.pauseMachine();
        this.frameInterval = 1000;
        this.iteration = 0;
        if (reason) {
            this.NotificationService.note(this.LocalizationService.getLocalized(reason));
        }
        return this;
    };
    MachineService.prototype.multiplySpeed = function (rate) {
        this.frameInterval /= rate;
        if (this.isRunning) {
            this.pauseMachine().startMachine();
        }
        return this;
    };
    MachineService.prototype.step = function () {
        var _this = this;
        var checkConditions = function (node, conditions) {
            var apply = true;
            conditions.forEach(function (condition) {
                if (apply) {
                    apply = condition.callback({
                        node: node,
                        iteration: _this.iteration,
                        params: condition.params
                    });
                }
            });
            return apply;
        };
        var applyActions = function (node, actions) {
            actions.forEach(function (action) {
                if (action.type == 'constructive') {
                    constructiveFunctions.push(function () {
                        action.callback({
                            node: node,
                            instructions: _this.instructions,
                            params: action.params,
                            graphService: _this.GraphService
                        });
                    });
                }
                if (action.type == 'destructive') {
                    destructiveFunctions.push(function () {
                        action.callback({
                            node: node,
                            instructions: _this.instructions,
                            params: action.params,
                            graphService: _this.GraphService
                        });
                    });
                }
            });
        };
        var statesFunctions = [];
        var constructiveFunctions = [];
        var destructiveFunctions = [];
        var terminatedNodes = 0;
        var currentNodes = [];
        this.GraphService.forEachNode(function (node) {
            if (node.data.state) {
                currentNodes.push(node);
            }
        });
        currentNodes.forEach(function (node) {
            var state = node.data.state;
            var instructions = _this.instructions[state];
            if (!instructions.terminate) {
                instructions.variants.forEach(function (variant) {
                    var apply = checkConditions(node, variant.conditions);
                    if (apply) {
                        applyActions(node, variant.actions);
                        statesFunctions.push(function () {
                            _this.GraphService.changeNodeState(node, variant.toState, _this.instructions[variant.toState].color);
                        });
                    }
                });
            }
            else {
                terminatedNodes++;
            }
            node.data.prevState = state;
        });
        if (terminatedNodes === currentNodes.length) {
            if (currentNodes.length) {
                this.stopMachine("TerminatedAllNodesSetStopState");
            }
            else {
                this.stopMachine("TerminatedAllNodesDeleted");
            }
        }
        else {
            this.iteration++;
            constructiveFunctions.forEach(function (func) { return func(); });
            destructiveFunctions.forEach(function (func) { return func(); });
            statesFunctions.forEach(function (func) { return func(); });
            this.GraphService.clearTrash();
        }
    };
    return MachineService;
}());
MachineService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [graph_service_1.GraphService,
        watchableStorage_service_1.WatchableStorage,
        localization_service_1.LocalizationService,
        notification_service_1.NotificationService,
        colorGen_service_1.ColorGen])
], MachineService);
exports.MachineService = MachineService;
//# sourceMappingURL=machine.service.js.map