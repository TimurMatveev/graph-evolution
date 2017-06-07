import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API_URL } from '../../constants/Constants';

import { GraphService } from '../GraphService/graph.service';
import { ColorGen } from '../ColorGenService/colorGen.service';
import { WatchableStorage } from '../WatchableStorageService/watchableStorage.service';
import { LocalizationService } from '../LocalizationService/localization.service';
import { NotificationService } from '../NotificationService/notification.service';

@Injectable()
export class MachineLoaderService {
    private cachedMachines: Array<any>;

    constructor(
        private Http: Http
    ) {}

    private wrapError_(error: any): string {
        return error.message;
    }

    getMachines(): Observable<any[]> {
        return this.Http
            .get(API_URL + "/machines")
            .map((res: any) => {
                this.cachedMachines = res.json();
                return this.cachedMachines;
            })
            .catch((error: any) => { return Observable.throw(this.wrapError_(error)) });
    }

    saveMachine(machine: any): Observable<any> {
        var headers = new Headers;
        headers.append("Content-Type", "application/json")
        return this.Http.post(API_URL + "/machine", JSON.stringify(machine), { headers: headers })
            .map((res: any) => { return res.json() })
            .catch((error: any) => { return Observable.throw(this.wrapError_(error)) });
    }

    updateMachine(machine: any, id: string): Observable<any> {
        var headers = new Headers;
        headers.append("Content-Type", "application/json")
        return this.Http.put(API_URL + "/machine/" + id, JSON.stringify(machine), { headers: headers })
            .map((res: any) => { return res.json() })
            .catch((error: any) => { return Observable.throw(this.wrapError_(error)) });
    }

    deleteMachine(id: string) {
        return this.Http.delete(API_URL + "/machine/" + id)
            .map((res: any) => { return res.json() })
    }
}