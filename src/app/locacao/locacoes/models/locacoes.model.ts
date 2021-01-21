import {BaseModel} from '../../../../core/models/base.model';
import {Deserializable} from '../../../../core/interfaces/deserializable.model';
import {isArray, isNullOrUndefined} from 'util';
import {TelefoneModel} from '../../../administrativo/shared/telefone/models/telefone.model';
import {CategoriaLocacaoModel} from '../../categoria-locacao/models/categoria-locacao.model';

export class LocacoesModel extends BaseModel implements Deserializable {

    id: number;
    filial_id: number;
    nome;
    categoria_locacao_id;
    capacidade;
    status;
    descricao;
    valor_locacao;
    custo_operacional;
    comodidades;
    url_360;
    created_at;
    updated_at;

    deserialize(input) {
        if (!isArray(input)) {
            this.assingItens(input);
            Object.assign(this, input);
            return this;
        }
        const array: LocacoesModel[] = [];
        input.forEach((item, key) => {
            this.assingItens(input);
            array.push(Object.assign(new LocacoesModel(), item));
        });
        return array;
    }

    private assingItens(input) {
        if (!isNullOrUndefined(input) && input.hasOwnProperty('categoria_locacao')) {
            input.telefones = (new CategoriaLocacaoModel()).deserialize(input.telefones.data);
        }
    }
}
