import { Pipe, PipeTransform } from '@angular/core';
import {isNullOrUndefined} from 'util';

@Pipe({
    name: 'striphtml'
})

export class StripHtmlPipe implements PipeTransform {
    transform(value: string): any {
        if(!isNullOrUndefined(value)) {
            return value.replace(/<.*?>/g, ''); // replace tags
        } else {
            return value;
        }

    }
}
