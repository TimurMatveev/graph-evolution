"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var viewport_component_1 = require("../components/viewport/viewport.component");
var initialization_component_1 = require("../components/initialization/initialization.component");
var addSelect_component_1 = require("../components/addSelect/addSelect.component");
var stateSelect_component_1 = require("../components/stateSelect/stateSelect.component");
var machineLoader_component_1 = require("../components/machineLoader/machineLoader.component");
var machineSaver_component_1 = require("../components/machineSaver/machineSaver.component");
var localization_pipe_1 = require("../pipes/localizationPipe/localization.pipe");
var localization_service_1 = require("../services/LocalizationService/localization.service");
var watchableStorage_service_1 = require("../services/WatchableStorageService/watchableStorage.service");
var graph_service_1 = require("../services/GraphService/graph.service");
var machine_service_1 = require("../services/MachineService/machine.service");
var notification_service_1 = require("../services/NotificationService/notification.service");
var colorGen_service_1 = require("../services/ColorGenService/colorGen.service");
var machineComposer_service_1 = require("../services/MachineComposerService/machineComposer.service");
var machineLoader_service_1 = require("../services/MachineLoaderService/machineLoader.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule
        ],
        declarations: [
            app_component_1.AppComponent,
            viewport_component_1.ViewportComponent,
            initialization_component_1.InitializationComponent,
            addSelect_component_1.AddSelectComponent,
            stateSelect_component_1.StateSelectComponent,
            machineLoader_component_1.MachineLoaderComponent,
            machineSaver_component_1.MachineSaverComponent,
            localization_pipe_1.LocalizationPipe
        ],
        providers: [
            localization_service_1.LocalizationService,
            watchableStorage_service_1.WatchableStorage,
            graph_service_1.GraphService,
            machine_service_1.MachineService,
            notification_service_1.NotificationService,
            colorGen_service_1.ColorGen,
            machineComposer_service_1.MachineComposerService,
            machineLoader_service_1.MachineLoaderService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map