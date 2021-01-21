import {Deserializable} from "../../../../core/interfaces/deserializable.model";
import {BaseModel} from "../../../../core/models/base.model";
import {PessoaModel} from "../../../../core/models/pessoa.model";
import {isArray} from "util";

export class FilialModel extends BaseModel implements Deserializable {
    pessoa_id: number;
    created_at: number;
    updated_at: number;
    cobra_convenio: boolean;
    cobra_particular: boolean;
    pessoa;
    dia_reapasse;
    dia_recebimento_cartao;

    deserialize(input) {
        if (!isArray(input)) {
            this.assingItens(input);
            Object.assign(this, input);
            return this;
        }
        const array: FilialModel[] = [];
        input.forEach((item, key) => {
            this.assingItens(item);
            array.push(Object.assign(new FilialModel(), item));
        });
        return array;
    }

    private assingItens(input) {
        if (input.hasOwnProperty('pessoa'))
            input.pessoa = (new PessoaModel()).deserialize(input.pessoa.data);
    }
}
