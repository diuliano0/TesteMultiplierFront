import {BaseModel} from '../../../../core/models/base.model';
import {Deserializable} from '../../../../core/interfaces/deserializable.model';
import {isArray} from "util";

export class ReservaModel extends BaseModel implements Deserializable {

    id: number;
    locador_id;
    valor;
    snapshot;
    status;

    deserialize(input) {
        if (!isArray(input)) {
            this.assingItens(input);
            Object.assign(this, input);
            return this;
        }
        const array: ReservaModel[] = [];
        input.forEach((item, key) => {
            this.assingItens(input);
            array.push(Object.assign(new ReservaModel(), item));
        });
        return array;
    }

    private assingItens(input) {}
}
