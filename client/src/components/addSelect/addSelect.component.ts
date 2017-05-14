import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { MachineService } from '../../services/MachineService/machine.service';

@Component({
    selector: 'add-select',
    templateUrl: './src/components/addSelect/addSelect.template.html',
	styleUrls: ['./src/components/addSelect/addSelect.template.css']
})
export class AddSelectComponent implements OnInit {
    @Input('type') private type: string;
    @Input('data') private data: any;
    @Input('state') private state: string;

    @Output('dataUpdated') private dataUpdatedEvent = new EventEmitter();

    private addedData: Array<any>;
    private defaultData: any;
    private drilldownData: Array<any>;

    constructor(
        private MachineService: MachineService
    ) {}

    ngOnInit(): void {
        this.addedData = [];
        if (this.type.toLowerCase() == 'condition') {        
            for (let condition in this.data.conditions) {
                this.addedData.push(this.data.conditions[condition])
            }
            this.addedData.sort(this.sortItemsComparator);
            this.defaultData = this.MachineService.getConditionsList();
            this.data.conditions = this.addedData;
        } else if (this.type.toLowerCase() == 'action') {
            for (let action in this.data.actions) {
                this.addedData.push(this.data.actions[action])
            }
            this.addedData.sort(this.sortItemsComparator);
            this.defaultData = this.MachineService.getActionsList();
            this.data.actions = this.addedData;
        }

        this.setDrilldownData();
    }

    setDrilldownData(): void {
        this.drilldownData = this.drilldownData || [];

        if (this.addedData && this.defaultData) {
            for (let item in this.defaultData) {
                if (!this.addedData[item] || !this.defaultData(item).isOnce) {
                    let defaultItem = Object.assign({}, this.defaultData[item]);
                    defaultItem.params = this.defaultData[item].params.map((param: any) => Object.assign({}, param));
                    this.drilldownData.push(defaultItem);
                }
            }
        }

        this.drilldownData.sort(this.sortItemsComparator);
    }

    addItem($event: MouseEvent, item: any): void {
        if (($event.target as any).tagName.toLowerCase() != "input") {
            if (item.isOnce) {
                [].push.apply(this.addedData, this.drilldownData.splice(this.drilldownData.indexOf(item), 1));
            } else {
                this.addedData.push(item);
            }
            this.addedData.sort(this.sortItemsComparator);
            this.dataUpdatedEvent.emit();
        }
    }

    removeItem($event: MouseEvent, item: any): void {
        if (($event.target as any).tagName.toLowerCase() != "input") {
            if (item.isOnce) {
                [].push.apply(this.drilldownData, this.addedData.splice(this.addedData.indexOf(item), 1));
            } else {
                this.addedData.splice(this.addedData.indexOf(item), 1);
            }
            this.drilldownData.sort(this.sortItemsComparator);
            this.dataUpdatedEvent.emit();
        }
    }

    sortItemsComparator(a: any, b: any) {
        let result = 0;
        if (a.name > b.name) result = 1;
        if (a.name < b.name) result = -1;
        return result;
    }

    changeValue(parametr: any, value: any) {
        parametr.value = value;
        this.dataUpdatedEvent.emit();
    }
}