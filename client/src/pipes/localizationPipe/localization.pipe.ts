import { Pipe, PipeTransform } from '@angular/core';

import { LocalizationService } from '../../services/LocalizationService/localization.service';

/*
 * Translate value according to localisation assosiation
 * Takes a string argument
 * Usage:
 *   value | localize
 */
@Pipe({
	name: 'localize',
	pure: false
})
export class LocalizationPipe implements PipeTransform {
	constructor(private localizationService: LocalizationService) {}
	
	transform(value: string): string {
		return this.localizationService.getLocalized(value);
	}
}