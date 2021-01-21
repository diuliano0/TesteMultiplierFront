import { Pipe, PipeTransform } from '@angular/core';
import {TelefoneModel} from "../../app/administrativo/shared/telefone/models/telefone.model";

@Pipe({
  name: 'telefoneTipo'
})
export class TelefoneTipoPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    return TelefoneModel.getTipoTelefone(value);
  }

}
