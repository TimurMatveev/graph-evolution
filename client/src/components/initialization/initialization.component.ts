import { Component } from '@angular/core';

import { WatchableStorage } from '../../services/WatchableStorageService/watchableStorage.service';
import { GraphService } from '../../services/GraphService/graph.service';
import { MachineService } from '../../services/MachineService/machine.service';

@Component({
    selector: 'initialization',
    templateUrl: './src/components/initialization/initialization.template.html',
	styleUrls: ['./src/components/initialization/initialization.template.css']
})
export class InitializationComponent {
    private avaliableGraphs: Array<string>;
    private alphabet: Array<string>;
    private currentState: string = 'Start';
    private currentInstruction: Object;

    constructor(
        private WatchableStorage: WatchableStorage,
        private GraphService: GraphService,
        private MachineService: MachineService
    ) {
        this.avaliableGraphs = this.GraphService.avaliableGraphs;
        this.alphabet = this.WatchableStorage.get('instructions', (instructions: Object) => Object.keys(instructions));
        this.currentInstruction = this.getCurrentInstruction();

        this.WatchableStorage.on('instructions', (newValue: Array<string>) => {
            this.alphabet = Object.keys(newValue);
        });
    }

    changeSelectedGraph($event: Event, value: any) {
        this.MachineService.stopMachine();
        let target: any = $event.target;
        if (target.nodeName.toLowerCase() !== "input") {
            this.GraphService.setGraph(value.callback(...value.params.map((item:any) => parseInt(item.value))).graph);
            this.GraphService.changeSelected(value);
            this.GraphService.rerender();
        }
    }

    getCurrentInstruction() {
        return this.WatchableStorage.get('instructions')[this.currentState];
    }

    setCurrentState(state: string): void {
        this.currentState = state;
        this.currentInstruction = this.getCurrentInstruction();
    }

    addNewState($event: KeyboardEvent, input: HTMLInputElement): void {
        if ($event.type == "click" || ($event.type == "keydown" && $event.key.toLowerCase() == 'enter')) {
            this.MachineService.addNewState(input.value);
            input.value = ''
        }
    }

    removeState(state: string): void {
        this.MachineService.removeState(state);
    }

    isRemovable(state: string): boolean {
        return this.MachineService.isRemovable(state);
    }

    changeState(instruction: any, toState: string): void {
        instruction.toState = toState;
        this.updateInstructions();
    }

    addNewInstruction(): void {
        this.MachineService.addNewInstruction(this.currentState);
    }

    updateInstructions() {
        this.MachineService.update();
    }

    removeInstruction(instruction: any) {
        this.MachineService.removeInstruction(this.currentState, instruction);
    }
}
