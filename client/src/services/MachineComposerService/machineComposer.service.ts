import { Injectable } from '@angular/core';

import { MACHINE_STRUCTURE } from '../../constants/Constants';

import { GraphService } from '../GraphService/graph.service';
import { ColorGen } from '../ColorGenService/colorGen.service';
import { WatchableStorage } from '../WatchableStorageService/watchableStorage.service';
import { LocalizationService } from '../LocalizationService/localization.service';
import { NotificationService } from '../NotificationService/notification.service';

@Injectable()
export class MachineComposerService {
    constructor(
        private NotificationService: NotificationService,
        private LocalizationService: LocalizationService
    ) {}

    compose(config: Object): Object {
        try {
            let machine = new Machine(config);
            return machine;
        } catch (error) {
            let message = this.LocalizationService.getLocalized(error.message);
            this.NotificationService.error(message);
        }
    }

   /* decompose(response: any): Object {
        return {};
    }*/
}

class Machine {
    //private _id: string;
    private name: string;
    private description: string;
    private initialGraph: Object;
    private instructions: Object;

    constructor(config: any) {
        let error: Error = null;

        //this._id = config.id || (error = new Error("CannotComposeMachine_idFieldNotFound"));
        this.name = config.name || (error = new Error("CannotComposeMachine_nameFieldNotFound"));
        this.description = config.description || "";
        this.initialGraph = config.initialGraph || (error = new Error("CannotComposeMachine_initialGraphFieldNotFound"));
        this.instructions = config.instructions || (error = new Error("CannotComposeMachine_instructionsFieldNotFound"));

        if (error) throw error;
    }
}
