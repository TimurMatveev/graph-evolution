import { Injectable } from '@angular/core';

import { GraphService } from '../GraphService/graph.service';
import { ColorGen } from '../ColorGenService/colorGen.service';
import { WatchableStorage } from '../WatchableStorageService/watchableStorage.service';
import { LocalizationService } from '../LocalizationService/localization.service';
import { NotificationService } from '../NotificationService/notification.service';

import { CONDITIONS } from '../../enums/conditions/conditions';
import { ACTIONS } from '../../enums/actions/actions';

@Injectable()
export class MachineService {
    private conditionsList: any;
    private actionsList: any;

    public isRunning: boolean;
    private animation: any;
    private frameInterval: number;
    private iteration: number;

    private instructions: Object = {
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

    constructor(
        private GraphService: GraphService,
        private WatchableStorage: WatchableStorage,
        private LocalizationService: LocalizationService,
        private NotificationService: NotificationService,
        private ColorGen: ColorGen
    )
    {
        this.conditionsList = CONDITIONS;
        this.actionsList = ACTIONS;

        this.isRunning = false;
        this.frameInterval = 1000;
        this.iteration = 0;

        this.WatchableStorage.set('instructions', this.instructions).on('instructions', (instructions: Object) => { this.instructions = instructions });
    }

    getConditionsList(): any {
        return this.conditionsList;
    }

    getActionsList(): any {
        return this.actionsList;
    }

    addNewState(state: string): void {
        this.addNewInstruction(state);
        this.update();
    }

    removeState(state: string) {
        if (this.instructions[state]) {
            delete this.instructions[state];
            this.update();
        }
    }

    isRemovable(state: string): boolean {
        if (this.instructions[state]) {
            return this.instructions[state].removable;
        }
        return false;
    }

    setRemovable(state: string, removable: boolean): void {
        if (this.instructions[state]) {
            this.instructions[state].removable = removable;
            this.update();
        }
    }

    addNewInstruction(state: string) {
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
    }

    update() {
        this.WatchableStorage.set('instructions', this.instructions);
    }

    removeInstruction(state: string, instruction: any) {
        let instructions: Array<any> = this.instructions[state].variants;
        let index: number = instructions.indexOf(instruction);

        instructions.splice(index, 1);
    }

    startMachine(): MachineService {
        this.isRunning = true;

        this.step();
        this.animation = setInterval(() => {
            this.step();
        }, this.frameInterval);

        return this;
    }

    pauseMachine(): MachineService {
        this.isRunning = false;
        clearInterval(this.animation);
        return this;
    }

    stopMachine(reason?: string): MachineService {
        this.pauseMachine();
        this.frameInterval = 1000;
        this.iteration = 0;

        if (reason) {
            this.NotificationService.note(this.LocalizationService.getLocalized(reason));
        }

        return this;
    }

    multiplySpeed(rate: number): MachineService {
        this.frameInterval /= rate;
        if (this.isRunning) {
            this.pauseMachine().startMachine();
        }

        return this;
    }

    step() {
        let checkConditions = (node: any, conditions: Array<any>): boolean => {
            let apply: boolean = true;

            conditions.forEach((condition: any) => {
                if (apply) {
                    apply = condition.callback({
                        node: node,
                        iteration: this.iteration,
                        params: condition.params
                    });
                }
            });

            return apply;
        }

        let applyActions = (node: any, actions: Array<any>) => {
            actions.forEach((action: any) => {
                if (action.type == 'constructive') {
                    constructiveFunctions.push(() => {
                        action.callback({
                            node: node,
                            instructions: this.instructions,
                            params: action.params,
                            graphService: this.GraphService
                        });
                    });
                }
                if (action.type == 'destructive') {
                    destructiveFunctions.push(() => {
                        action.callback({
                            node: node,
                            instructions: this.instructions,
                            params: action.params,
                            graphService: this.GraphService
                        });
                    });
                }
            })
        }

        let statesFunctions: Array<Function> = [];
        let constructiveFunctions: Array<Function> = [];
        let destructiveFunctions: Array<Function> = [];

        let terminatedNodes = 0;
        let currentNodes: Array<any> = [];

        this.GraphService.forEachNode((node:any) => {
            if (node.data.state) {
                currentNodes.push(node);
            }
        });

        currentNodes.forEach((node:any) => {
            let state: string = node.data.state;
            let instructions: any = this.instructions[state];
            if (!instructions.terminate) {
                instructions.variants.forEach((variant: any) => {
                    let apply: boolean = checkConditions(node, variant.conditions);
                    
                    if (apply) {
                        applyActions(node, variant.actions);
                        statesFunctions.push(() => {
                            this.GraphService.changeNodeState(node, variant.toState, this.instructions[variant.toState].color);
                        });
                    }
                })
            } else {
                terminatedNodes++;
            }
            node.data.prevState = state;
        });

        if (terminatedNodes === currentNodes.length) {
            if (currentNodes.length) {
                this.stopMachine("TerminatedAllNodesSetStopState");
            } else {
                this.stopMachine("TerminatedAllNodesDeleted");
            }
        } else {
            this.iteration++;

            constructiveFunctions.forEach((func: Function) => func());
            destructiveFunctions.forEach((func: Function) => func());
            statesFunctions.forEach((func: Function) => func());

            this.GraphService.clearTrash();
        }
    }
}
