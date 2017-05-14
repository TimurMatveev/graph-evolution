import { Component, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';

import { WatchableStorage } from '../../services/WatchableStorageService/watchableStorage.service';

@Component({
    selector: 'state-select',
    templateUrl: './src/components/stateSelect/stateSelect.template.html',
	styleUrls: ['./src/components/stateSelect/stateSelect.template.css']
})
export class StateSelectComponent implements OnInit {
    @Input('state') private state: string;
    @Input('instruction') private instruction: any;

    @Output('selectValue') private selectValueEvent = new EventEmitter();

    private dispersion: number = 50;

    private selectedValue: string;
    private selectedIndex: number;

    private alphabet: Array<string>;
    
    constructor(
        private WatchableStorage: WatchableStorage,
        private element: ElementRef
    ) {
        this.alphabet = this.WatchableStorage.get('instructions', (instructions: Object) => Object.keys(instructions));
        this.WatchableStorage.on('instructions', (newValue: Array<string>) => {
            this.alphabet = Object.keys(newValue);
            this.selectedIndex = this.alphabet.indexOf(this.selectedValue);
        });
    }

    ngOnInit() {
        if (this.instruction) {
            this.selectedValue = this.instruction.toState;
        } else if (this.state) {
            this.selectedValue = this.state;
        } else {
            this.selectedValue = "Stop";
        }

        this.selectedIndex = this.alphabet.indexOf(this.selectedValue);
        
        this.element.nativeElement.firstChild.addEventListener('wheel', (event: WheelEvent) => {
            event.preventDefault();
            if (event.wheelDelta < 0) {
                this.swipeLeft();
            } else if (event.wheelDelta > 0) {
                this.swipeRight();
            }
        });
    }

    selectValue(state: string) {
        this.selectedValue = state;
        this.selectValueEvent.emit(state);
    }

    getSliderStyles() {
        let tabWidth = this.dispersion * 1.2;
        return {
            'transform': `translateX(${60 - tabWidth / 2 - this.selectedIndex * tabWidth}px)`,
            'width': `${tabWidth * this.alphabet.length}px`
        }
    }

    swipeLeft($event?: MouseEvent) {
        if ($event) {
            $event.stopPropagation();
        }

        this.selectedIndex--;
        if (this.selectedIndex < 0) {
            this.selectedIndex++;
        } else {
            this.selectValue(this.alphabet[this.selectedIndex]);
        }
    }

    swipeRight($event?: MouseEvent) {
        if ($event) {
            $event.stopPropagation();
        }

        this.selectedIndex++;
        if (this.selectedIndex >= this.alphabet.length) {
            this.selectedIndex--;
        } else {
            this.selectValue(this.alphabet[this.selectedIndex]);
        }
    }
}