import {Pipe, PipeTransform} from '@angular/core';
import {GrupoModel} from "../../../app/administrativo/grupo/models/grupo.model";

@Pipe({
    name: 'grupoStatus'
})
export class GrupoStatusPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        return GrupoModel.getGrupoStatus(value);
    }

}
