import { Injectable, Inject } from '@angular/core';

import { ENGLISH } from './localization/en_EN';
import { RUSSIAN } from './localization/ru_RU';

@Injectable()
export class LocalizationService {
    private association: Object = {};
    private currentLanguage: string;
    private availableLanguages: Array<string>;

    constructor() {
        this.availableLanguages = ['english', 'russian'];
        this.currentLanguage = 'russian';
        this.association = RUSSIAN;
    }

    setLanguage(language: string): void {
        switch(language.toLowerCase()) {
            case 'english':
                this.association = ENGLISH;
                break;
            case 'russian':
                this.association = RUSSIAN;
                break;
            default:
                this.association = RUSSIAN;
        }
    }

    getCurrentLanguage(): string {
        return this.currentLanguage;
    }

    getLocalized(value: string): string {
        return this.association[value] || value;
    }
}