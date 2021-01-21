import {BaseModel} from '../../../../core/models/base.model';
import {Deserializable} from '../../../../core/interfaces/deserializable.model';
import {isArray} from 'util';

export class CategoriaLocacaoModel extends BaseModel implements Deserializable {

    id: number;
    filial_id: number;
    nome: string;
    status: number;
    created_at;
    updated_at;

    deserialize(input) {
        if (!isArray(input)) {
            this.assingItens(input);
            Object.assign(this, input);
            return this;
        }
        const array: CategoriaLocacaoModel[] = [];
        input.forEach((item, key) => {
            this.assingItens(input);
            array.push(Object.assign(new CategoriaLocacaoModel(), item));
        });
        return array;
    }

    private assingItens(input) {}
}
