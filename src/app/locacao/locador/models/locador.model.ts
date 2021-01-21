import {isArray} from 'util';
import {PessoaModel} from '../../../../core/models/pessoa.model';
import {UsuarioModel} from '../../../administrativo/usuario/models/usuario.model';
import {BaseModel} from '../../../../core/models/base.model';
import {Deserializable} from '../../../../core/interfaces/deserializable.model';

export class LocadorModel extends BaseModel implements Deserializable {

    id: number;
    filial_id: number;
    pessoa;
    usuario;
    plataforma: number;
    nome_locador: string;
    created_at;
    updated_at;

    deserialize(input) {
        if (!isArray(input)) {
            this.assingItens(input);
            Object.assign(this, input);
            return this;
        }
        const array: LocadorModel[] = [];
        input.forEach((item, key) => {
            this.assingItens(input);
            array.push(Object.assign(new LocadorModel(), item));
        });
        return array;
    }

private assingItens(input) {
        if (input.hasOwnProperty('pessoa')) {
            input.pessoa = (new PessoaModel()).deserialize(input.pessoa.data);
        }
        if(input.hasOwnProperty('usuario')){
            input.usuario = (new UsuarioModel().deserialize(input.usuario.data));
        }
    }

    get tipoPlataforma() {
        switch (this.plataforma) {
            case 1:
                return 'Android';
            case 2:
                return 'Ios';
            case 3:
                return 'Web';
            default:
                return 'Indefinido';
        }
    }
}
