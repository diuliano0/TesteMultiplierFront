import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mascaraCpf'
})
export class MascaraCpfPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
