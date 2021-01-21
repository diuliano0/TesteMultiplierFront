import {Deserializable} from "../../../../../core/interfaces/deserializable.model";
import {isArray} from "util";

const RESIDENCIAL = 0;
const COMERCIAL = 1;
const CONTATO = 2;
const COBRANCA = 3;

export class EnderecoModel implements Deserializable {

    logradouro;
    cep;
    numero;
    complemento;
    cidade_id;
    bairro_id;
    tipo_endereco;

    deserialize(input) {
        if (!isArray(input)) {
            Object.assign(this, input);
            return this;
        }
        const array: EnderecoModel[] = [];
        input.forEach((item, key) => {
            array.push(Object.assign(new EnderecoModel(), item));
        });
        return array;
    }

    static getTipoEndereco() {
        return [
            {label: 'Residêncial', value: RESIDENCIAL},
            {label: 'Comercial', value: COMERCIAL},
            {label: 'Contato', value: CONTATO},
            {label: 'Cobrança', value: COBRANCA},
        ];
    }

}
