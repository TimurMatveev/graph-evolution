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
var StateSelectComponent = (function () {
    function StateSelectComponent(WatchableStorage, element) {
        var _this = this;
        this.WatchableStorage = WatchableStorage;
        this.element = element;
        this.selectValueEvent = new core_1.EventEmitter();
        this.dispersion = 50;
        this.alphabet = this.WatchableStorage.get('instructions', function (instructions) { return Object.keys(instructions); });
        this.WatchableStorage.on('instructions', function (newValue) {
            _this.alphabet = Object.keys(newValue);
            _this.selectedIndex = _this.alphabet.indexOf(_this.selectedValue);
        });
    }
    StateSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.instruction) {
            this.selectedValue = this.instruction.toState;
        }
        else if (this.state) {
            this.selectedValue = this.state;
        }
        else {
            this.selectedValue = "Stop";
        }
        this.selectedIndex = this.alphabet.indexOf(this.selectedValue);
        this.element.nativeElement.firstChild.addEventListener('wheel', function (event) {
            event.preventDefault();
            if (event.wheelDelta < 0) {
                _this.swipeLeft();
            }
            else if (event.wheelDelta > 0) {
                _this.swipeRight();
            }
        });
    };
    StateSelectComponent.prototype.selectValue = function (state) {
        this.selectedValue = state;
        this.selectValueEvent.emit(state);
    };
    StateSelectComponent.prototype.getSliderStyles = function () {
        var tabWidth = this.dispersion * 1.2;
        return {
            'transform': "translateX(" + (60 - tabWidth / 2 - this.selectedIndex * tabWidth) + "px)",
            'width': tabWidth * this.alphabet.length + "px"
        };
    };
    StateSelectComponent.prototype.swipeLeft = function ($event) {
        if ($event) {
            $event.stopPropagation();
        }
        this.selectedIndex--;
        if (this.selectedIndex < 0) {
            this.selectedIndex++;
        }
        else {
            this.selectValue(this.alphabet[this.selectedIndex]);
        }
    };
    StateSelectComponent.prototype.swipeRight = function ($event) {
        if ($event) {
            $event.stopPropagation();
        }
        this.selectedIndex++;
        if (this.selectedIndex >= this.alphabet.length) {
            this.selectedIndex--;
        }
        else {
            this.selectValue(this.alphabet[this.selectedIndex]);
        }
    };
    return StateSelectComponent;
}());
__decorate([
    core_1.Input('state'),
    __metadata("design:type", String)
], StateSelectComponent.prototype, "state", void 0);
__decorate([
    core_1.Input('instruction'),
    __metadata("design:type", Object)
], StateSelectComponent.prototype, "instruction", void 0);
__decorate([
    core_1.Output('selectValue'),
    __metadata("design:type", Object)
], StateSelectComponent.prototype, "selectValueEvent", void 0);
StateSelectComponent = __decorate([
    core_1.Component({
        selector: 'state-select',
        templateUrl: './src/components/stateSelect/stateSelect.template.html',
        styleUrls: ['./src/components/stateSelect/stateSelect.template.css']
    }),
    __metadata("design:paramtypes", [watchableStorage_service_1.WatchableStorage,
        core_1.ElementRef])
], StateSelectComponent);
exports.StateSelectComponent = StateSelectComponent;
//# sourceMappingURL=stateSelect.component.js.map