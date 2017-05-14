import { Component, ChangeDetectorRef } from '@angular/core';

import { WatchableStorage } from '../services/WatchableStorageService/watchableStorage.service';
import { LocalizationService } from '../services/LocalizationService/localization.service';
import { MachineService } from '../services/MachineService/machine.service';

@Component({
    selector: 'graph-evolution',
    templateUrl: './src/app/app.template.html',
	styleUrls: ['./src/app/app.template.css']
})
export class AppComponent {
    private language: string;
    private viewportDisplayMode: string;
    private isInitializationFieldOpened: boolean;
    private isLoadingMachineFieldOpened: boolean;
    private isSavingMachineFieldOpened: boolean;

    constructor(
        private WatchableStorage: WatchableStorage,
        private LocalizationService: LocalizationService,
        private MachineService: MachineService
    ) {
        this.language = this.LocalizationService.getCurrentLanguage();
        this.viewportDisplayMode = '3d';
        this.isInitializationFieldOpened = false;
        this.isLoadingMachineFieldOpened = false;
    }

    setLanguage(language: string) {
        this.language = language;
        this.LocalizationService.setLanguage(language);
    }

    setViewportDisplayMode(mode: string) {
        mode = mode.toLowerCase();
        if (mode == '2d' || mode == '3d') {
            this.viewportDisplayMode = mode;
        }
    }

    toggleInitialization(toggle?: boolean) {
        this.isLoadingMachineFieldOpened = false;
        this.isSavingMachineFieldOpened = false;

        if (toggle === true || toggle === false) {
            this.isInitializationFieldOpened = toggle;
        } else {
            this.isInitializationFieldOpened = !this.isInitializationFieldOpened;
        }
    }
    
    toggleLoadingMachine(toggle?: boolean) {
        this.isInitializationFieldOpened = false;
        this.isSavingMachineFieldOpened = false;

        if (toggle === true || toggle === false) {
            this.isLoadingMachineFieldOpened = toggle;
        } else {
            this.isLoadingMachineFieldOpened = !this.isLoadingMachineFieldOpened;
        }
    }

    toggleSavingMachine(toggle?: boolean) {
        this.isInitializationFieldOpened = false;
        this.isLoadingMachineFieldOpened = false;

        if (toggle === true || toggle === false) {
            this.isSavingMachineFieldOpened = toggle;
        } else {
            this.isSavingMachineFieldOpened = !this.isSavingMachineFieldOpened;
        }
    }

    machineToggle() {
        this.MachineService.isRunning ? this.MachineService.pauseMachine() : this.MachineService.startMachine();
    }

    machineSlower() {
        this.MachineService.multiplySpeed(0.5);
    }

    machineFaster() {
        this.MachineService.multiplySpeed(2);
    }
}
