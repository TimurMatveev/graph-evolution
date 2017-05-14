import { Injectable } from '@angular/core';

const RANGE: any = {
    min: 0x33,
    max: 0xDD
};

const DELTA: number = 0x44;

@Injectable()
export class ColorGen {
    private R: number;
    private G: number;
    private B: number;

    constructor() {
        this.R = RANGE.max;
        this.G = RANGE.max;
        this.B = RANGE.max;
    }

    getNextColor(): string {
        let result = this.getHexColor();
        this.next();
        return result;
    }

    getHexColor(): string {
        let result = new Number(this.R * 0x10000 + this.G * 0x100 + this.B);
        return "0x" + result.toString(16);
    }

    next() {
        let nextValue = (value: number): number => {
            return value - DELTA < RANGE.min ? (RANGE.max - DELTA / 2) : (value - DELTA);
        }

        let random: number = Math.floor(Math.random() * 3);
        let color: number;

        switch(random) {
            case(0):
                this.R = nextValue(this.R);
                break;
            case(1):
                this.G = nextValue(this.G);
                break;
            case(2):
                this.B = nextValue(this.B);
                break;
        }
    }
}
