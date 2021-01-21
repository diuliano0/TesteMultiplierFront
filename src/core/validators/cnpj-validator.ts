import {FormControl} from "@angular/forms";
import { isNullOrUndefined } from 'util';
/**
 * Created by dev06 on 10/05/2018.
 */

export class CnpjValidator {

    static isValid(control: FormControl): any {
        return CnpjValidator.isCnpj(control.value);
    }

    static isCnpj(cpf){
        let soma = 0;
        let resto = 0;
        if (isNullOrUndefined(cpf)) {
            return {'is_valid': true};
        }



        cpf = cpf.replace('/[^0-9]/', '', cpf);

        if (cpf.length != 11) {
            return {'is_valid': true};
        }

        else if (cpf == '00000000000' ||
            cpf == '11111111111' ||
            cpf == '22222222222' ||
            cpf == '33333333333' ||
            cpf == '44444444444' ||
            cpf == '55555555555' ||
            cpf == '66666666666' ||
            cpf == '77777777777' ||
            cpf == '88888888888' ||
            cpf == '99999999999') {
            return {'is_valid': true};

        } else {
            for (let i = 0, j = 10; i < 9; i++, j--){
                soma += cpf[i] * j;
            }
            resto = soma % 11;


            if (cpf[9] != (resto < 2 ? 0 : 11 - resto)){
                console.log(cpf[9]);
                console.log((resto < 2 ? 0 : 11 - resto));
                return {'is_valid': true};
            }
            soma = 0;
            for (let i = 0, j = 11; i < 10; i++, j--){
                soma += cpf[i] * j;
            }
            resto = soma % 11;
            return (cpf[10] == (resto < 2 ? 0 : 11 - resto)) == true? null:{'is_valid': true};
        }
    }

}