import {BaseModel} from '../../../core/models/base.model';
import {Deserializable} from '../../../core/interfaces/deserializable.model';
import {isArray, isNullOrUndefined} from 'util';
import {LocacoesModel} from '../locacoes/models/locacoes.model';

export class AgendaHorarioModel extends BaseModel implements Deserializable {

    id: number;
    locacao_id;
    dth_inicio;
    dth_fim;
    valor;
    informar_saida;

    deserialize(input) {
        if (!isArray(input)) {
            this.assingItens(input);
            Object.assign(this, input);
            return this;
        }
        const array: AgendaHorarioModel[] = [];
        input.forEach((item, key) => {
            this.assingItens(input);
            array.push(Object.assign(new AgendaHorarioModel(), item));
        });
        return array;
    }

    private assingItens(input) {
        if (!isNullOrUndefined(input) && input.hasOwnProperty('locacao')) {
            input.locacao = (new LocacoesModel()).deserialize(input.locacao.data);
        }
    }

}
