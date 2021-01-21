import {Deserializable} from "../../../../core/interfaces/deserializable.model";
import {BaseModel} from "../../../../core/models/base.model";
import {isArray, isNullOrUndefined, isObject} from "util";
import {PermissaoModel} from "../../grupo/models/permissao.model";


export class RotaModel extends BaseModel implements Deserializable {
    id: number;
    parent_id: number;
    titulo: string;
    rota: string;
    icon: string;
    desativado: boolean;
    prioridade: number;
    ambiente: string;
    modulo;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    deserialize(input) {
        if (!isArray(input)) {
            Object.assign(this, input);
            return this;
        }
        const array: RotaModel[] = [];
        input.forEach((item, key) => {
            array.push(Object.assign(new RotaModel(), item));
        });
        return array;
    }

}
