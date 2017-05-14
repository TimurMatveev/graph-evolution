import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { GraphService } from '../../services/GraphService/graph.service';
import { WatchableStorage } from '../../services/WatchableStorageService/watchableStorage.service';
import { MachineLoaderService } from '../../services/MachineLoaderService/machineLoader.service';
import { MachineComposerService } from '../../services/MachineComposerService/machineComposer.service';
import { LocalizationService } from '../../services/LocalizationService/localization.service';
import { NotificationService } from '../../services/NotificationService/notification.service';

@Component({
    selector: 'machine-saver',
    templateUrl: './src/components/machineSaver/machineSaver.template.html',
	styleUrls: ['./src/components/machineSaver/machineSaver.template.css']
})
export class MachineSaverComponent implements OnInit {
    private machineConfig: any;
    private machineName: string;    
    private machineDescription: string;
    private isUpdate: boolean;

    constructor(
        private GraphService: GraphService,
        private WatchableStorage: WatchableStorage,
        private MachineLoaderService: MachineLoaderService,
        private MachineComposerService: MachineComposerService,
        private LocalizationService: LocalizationService,
        private NotificationService: NotificationService
    ) {
        let updateMachine = WatchableStorage.get("updateMachine");
        if (updateMachine) {
            this.machineName = updateMachine.name;
            this.machineDescription = updateMachine.description;
            this.isUpdate = updateMachine.isUpdate;
        } else {
            this.machineName = "";
            this.machineDescription = "";
            this.isUpdate = false;
        }
    }

    ngOnInit(): void {
        let selectedGraph = this.GraphService.avaliableGraphs.find((graph: any) => graph.selected);
        let initialGraph = {
            name: selectedGraph.name,
            params: selectedGraph.params
        }

        let resInstructions = {};
        let instructions = this.WatchableStorage.get("instructions");
        for (let state in instructions) {
            let instruction = instructions[state];

            resInstructions[state] = {
                color: instruction.color,
                name: instruction.name,
                terminate: instruction.terminate
            };

            resInstructions[state].variants = instruction.variants.map((variant: any) => {
                let callback = (item: any) => {
                    return {
                        name: item.name,
                        params: item.params.map((param: any) => {return { value: param.value }})
                    }
                }

                return {
                    actions: variant.actions.map(callback),
                    conditions: variant.conditions.map(callback),
                    toState: variant.toState
                }
            })
        }

        this.machineConfig = {
            name: this.machineName,
            description: this.machineDescription,
            initialGraph: initialGraph,
            instructions: resInstructions
        };
    }

    saveMachine() {
        let machine = this.MachineComposerService.compose(this.machineConfig);
        if (machine) {
            this.MachineLoaderService.saveMachine(machine)
                .subscribe((machine) => {
                    let message = this.LocalizationService.getLocalized("MachineSeccessfulySaved");
                    this.NotificationService.note(message);
                }, (error) => {
                    let message = this.LocalizationService.getLocalized("MachineNotSaved");
                    this.NotificationService.error(message);
                });
        }
    }

    updateMachine() {
        debugger;
        let machine: any = this.MachineComposerService.compose(this.machineConfig);
        let id: string = this.WatchableStorage.get("updateMachine").id;

        if (machine) {
            this.MachineLoaderService.updateMachine(machine, id)
                .subscribe((machine) => {
                    let message = this.LocalizationService.getLocalized("MachineSeccessfulyUpdated");
                    this.NotificationService.note(message);
                }, (error) => {
                    let message = this.LocalizationService.getLocalized("MachineNotUpdated");
                    this.NotificationService.error(message);
                });
        }
    }
}