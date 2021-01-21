import {Injectable} from '@angular/core';
import {BaseModel} from '../../../../core/models/base.model';
import {Deserializable} from '../../../../core/interfaces/deserializable.model';
import {isArray} from "util";

@Injectable()
export class ComodidadeModel extends BaseModel implements Deserializable {

    id: number;
    nome: string;
    icon: number;
    created_at;
    updated_at;

    deserialize(input) {
        if (!isArray(input)) {
            this.assingItens(input);
            Object.assign(this, input);
            return this;
        }
        const array: ComodidadeModel[] = [];
        input.forEach((item, key) => {
            this.assingItens(input);
            array.push(Object.assign(new ComodidadeModel(), item));
        });
        return array;
    }

    private assingItens(input) {}
}
