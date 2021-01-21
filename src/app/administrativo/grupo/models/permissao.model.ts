import {BaseModel} from "../../../../core/models/base.model";
import {Deserializable} from "../../../../core/interfaces/deserializable.model";
import {isArray} from "util";

const ADMINISTRATIVO = 0;
const RH = 1;
const COMPRAS = 2;
const CRM = 3;
const ARQUIVO = 4;
const FINANCEIRO = 5;
const LOCACAO = 6;
const REVENDA = 7;
const SAUDE = 8;

export class PermissaoModel extends BaseModel implements Deserializable {

    grupo_id:number;
    modulo;
    created_at: string;
    updated_at: string;


    deserialize(input: any) {
        if (!isArray(input)) {
            Object.assign(this, input);
            return this;
        }
        Object.assign(this, input);
        return this;
    }

    static getModuloSelect() {
        return [
            {label: 'Administrativo', value: ADMINISTRATIVO},
            {label: 'Recursos Humanos', value: RH},
            {label: 'Compras', value: COMPRAS},
            {label: 'Gerenciamento de Relacionamento com o Cliente', value: CRM},
            {label: 'Arquivo', value: ARQUIVO},
            {label: 'Financeiro', value: FINANCEIRO},
            {label: 'Locação', value: LOCACAO},
            {label: 'Revenda', value: REVENDA},
            {label: 'Saúde', value: SAUDE},
        ];
    }
}
