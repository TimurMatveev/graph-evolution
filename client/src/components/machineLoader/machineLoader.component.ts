import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { ACTIONS } from '../../enums/actions/actions';
import { CONDITIONS } from '../../enums/conditions/conditions';

import { GraphService } from '../../services/GraphService/graph.service';
import { WatchableStorage } from '../../services/WatchableStorageService/watchableStorage.service';
import { MachineLoaderService } from '../../services/MachineLoaderService/machineLoader.service';

@Component({
    selector: 'machine-loader',
    templateUrl: './src/components/machineLoader/machineLoader.template.html',
	styleUrls: ['./src/components/machineLoader/machineLoader.template.css']
})
export class MachineLoaderComponent implements OnInit {
    private isLoading: boolean;
    private machines: Array<any>;

    constructor(
        private GraphService: GraphService,
        private WatchableStorage: WatchableStorage,
        private MachineLoaderService: MachineLoaderService
    ) {
        this.isLoading = false;
        this.machines = [];
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.MachineLoaderService.getMachines()
            .subscribe((machines) => {
                this.machines = machines;
                this.isLoading = false;
            })
    }

    selectMachine($event: MouseEvent, machine: any) {
        let instructions: any = {};

        for (let state in machine.instructions) {
            let instruction = machine.instructions[state];

            instructions[state] = {
                color: instruction.color,
                name: instruction.name,
                terminate: instruction.terminate,
                variants: instruction.variants.map((variant: any) => {
                    let callback = (builded: any) => {
                        return function (item: any) {
                            let compare = builded[item.name];
                            let result = {};
                            for (let key in compare) {
                                if (key == "params") {
                                    result[key] = compare[key].map((param: any, i: number) => {
                                        return {
                                            value: item[key][i].value,
                                            type: compare[key][i].type,
                                            description: compare[key][i].description
                                        }
                                    })
                                } else {
                                    result[key] = item[key] || compare[key];
                                }
                            }
                            return result;
                        }
                    }

                    return {
                        actions: variant.actions.map(callback(ACTIONS)),
                        conditions: variant.conditions.map(callback(CONDITIONS)),
                        toState: variant.toState
                    }
                })
            };
        }

        this.WatchableStorage.set("instructions", instructions);

        let nextGraph = this.GraphService.avaliableGraphs.find(item => item.name == machine.initialGraph.name);
        nextGraph.params.forEach((param:any, i: number) => param.value = machine.initialGraph.params[i].value); 
        this.GraphService.setGraph(nextGraph.callback(...nextGraph.params.map((item:any) => parseInt(item.value))).graph);
        this.GraphService.changeSelected(machine.initialGraph);
        this.GraphService.rerender();

        this.WatchableStorage.set("updateMachine", {
            isUpdate: true,
            id: machine._id,
            name: machine.name,
            description: machine.description
        });
    }

    removeMachine($event: MouseEvent, machine: any) {
        this.isLoading = true;
        $event.stopPropagation();
        this.MachineLoaderService.deleteMachine(machine._id)
            .subscribe((data) => {
                for (let i = 0; i < this.machines.length; i++) {
                    if (this.machines[i]._id == machine._id) {
                        this.machines.splice(i, 1);
                    }
                }
                this.isLoading = false;
            })
    }
}