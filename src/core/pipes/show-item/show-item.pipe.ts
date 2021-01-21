import { Pipe, PipeTransform } from '@angular/core';
import {isNullOrUndefined, isString} from "util";

@Pipe({
  name: 'showItem'
})
export class ShowItemPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(isNullOrUndefined(value) || isNullOrUndefined(args) )
      return null;

    let itens = args.split('.');
    return this.pegandoValor(value, itens);
  }

  pegandoValor(obj, item){
    if(item.length == 1){
      return obj[item[0]];
    }

    for(let i in item){
      if(item.hasOwnProperty(i)){
        let chave = item[i];
        item.splice(i, 1);
        return this.pegandoValor(obj[chave], item);
      }
    }
    return 'nada encontrado';
  }

}
