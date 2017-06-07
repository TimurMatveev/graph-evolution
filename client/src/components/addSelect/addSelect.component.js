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
var machine_service_1 = require("../../services/MachineService/machine.service");
var AddSelectComponent = (function () {
    function AddSelectComponent(MachineService) {
        this.MachineService = MachineService;
        this.dataUpdatedEvent = new core_1.EventEmitter();
    }
    AddSelectComponent.prototype.ngOnInit = function () {
        this.addedData = [];
        if (this.type.toLowerCase() == 'condition') {
            for (var condition in this.data.conditions) {
                this.addedData.push(this.data.conditions[condition]);
            }
            this.addedData.sort(this.sortItemsComparator);
            this.defaultData = this.MachineService.getConditionsList();
            this.data.conditions = this.addedData;
        }
        else if (this.type.toLowerCase() == 'action') {
            for (var action in this.data.actions) {
                this.addedData.push(this.data.actions[action]);
            }
            this.addedData.sort(this.sortItemsComparator);
            this.defaultData = this.MachineService.getActionsList();
            this.data.actions = this.addedData;
        }
        this.setDrilldownData();
    };
    AddSelectComponent.prototype.setDrilldownData = function () {
        this.drilldownData = this.drilldownData || [];
        if (this.addedData && this.defaultData) {
            for (var item in this.defaultData) {
                if (!this.addedData[item] || !this.defaultData(item).isOnce) {
                    var defaultItem = Object.assign({}, this.defaultData[item]);
                    defaultItem.params = this.defaultData[item].params.map(function (param) { return Object.assign({}, param); });
                    this.drilldownData.push(defaultItem);
                }
            }
        }
        this.drilldownData.sort(this.sortItemsComparator);
    };
    AddSelectComponent.prototype.addItem = function ($event, item) {
        if ($event.target.tagName.toLowerCase() != "input") {
            if (item.isOnce) {
                [].push.apply(this.addedData, this.drilldownData.splice(this.drilldownData.indexOf(item), 1));
            }
            else {
                this.addedData.push(item);
            }
            this.addedData.sort(this.sortItemsComparator);
            this.dataUpdatedEvent.emit();
        }
    };
    AddSelectComponent.prototype.removeItem = function ($event, item) {
        if ($event.target.tagName.toLowerCase() != "input") {
            if (item.isOnce) {
                [].push.apply(this.drilldownData, this.addedData.splice(this.addedData.indexOf(item), 1));
            }
            else {
                this.addedData.splice(this.addedData.indexOf(item), 1);
            }
            this.drilldownData.sort(this.sortItemsComparator);
            this.dataUpdatedEvent.emit();
        }
    };
    AddSelectComponent.prototype.sortItemsComparator = function (a, b) {
        var result = 0;
        if (a.name > b.name)
            result = 1;
        if (a.name < b.name)
            result = -1;
        return result;
    };
    AddSelectComponent.prototype.changeValue = function (parametr, value) {
        parametr.value = value;
        this.dataUpdatedEvent.emit();
    };
    return AddSelectComponent;
}());
__decorate([
    core_1.Input('type'),
    __metadata("design:type", String)
], AddSelectComponent.prototype, "type", void 0);
__decorate([
    core_1.Input('data'),
    __metadata("design:type", Object)
], AddSelectComponent.prototype, "data", void 0);
__decorate([
    core_1.Input('state'),
    __metadata("design:type", String)
], AddSelectComponent.prototype, "state", void 0);
__decorate([
    core_1.Output('dataUpdated'),
    __metadata("design:type", Object)
], AddSelectComponent.prototype, "dataUpdatedEvent", void 0);
AddSelectComponent = __decorate([
    core_1.Component({
        selector: 'add-select',
        templateUrl: './src/components/addSelect/addSelect.template.html',
        styleUrls: ['./src/components/addSelect/addSelect.template.css']
    }),
    __metadata("design:paramtypes", [machine_service_1.MachineService])
], AddSelectComponent);
exports.AddSelectComponent = AddSelectComponent;
//# sourceMappingURL=addSelect.component.js.map