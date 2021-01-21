import {Deserializable} from "../../../../../core/interfaces/deserializable.model";
import {isArray} from "util";

const PESSOAL = 0;
const RESIDENCIAL = 1;
const COMERCIAL = 2;
const RECADO = 3;

export class TelefoneModel implements Deserializable {

    id;
    ddd;
    numero;
    observacao;
    tipo_telefone;

    deserialize(input) {
        if (!isArray(input)) {
            Object.assign(this, input);
            return this;
        }
        const array: TelefoneModel[] = [];
        input.forEach((item, key) => {
            array.push(Object.assign(new TelefoneModel(), item));
        });
        return array;
    }

    static getTipoTelefone(tipo) {
        switch (tipo) {
            case PESSOAL:
                return 'Pessoal';
            case RESIDENCIAL:
                return 'Residêncial';
            case COMERCIAL:
                return 'Comercial';
            case RECADO:
                return 'Recado';
            default:
                return tipo;
        }
    }

    static getTelefoneSelect() {
        return [
            {label: 'Pessoal', value: PESSOAL},
            {label: 'Residêncial', value: RESIDENCIAL},
            {label: 'Comercial', value: COMERCIAL},
            {label: 'Recado', value: RECADO},
        ];
    }
}
