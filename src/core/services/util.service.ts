import {Injectable} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {conformToMask} from "text-mask-core/dist/textMaskCore";
import {createNumberMask} from 'text-mask-addons/dist/textMaskAddons';
import {DatePipe} from "@angular/common";
import {ConfigService} from "./config.service";

@Injectable()
export class UtilService {

    private urlSearchParams: HttpParams;

    constructor() {
        this.urlSearchParams = new HttpParams();
    }

    queryBuilder(params: any[]): HttpParams {
        for (let param in params) {
            this.urlSearchParams.set(param, params[param]);
        }
        return this.urlSearchParams;
    }

    static urlSlug(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        let from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        let to = "aaaaaeeeeeiiiiooooouuuunc------";
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    };

    static numberMasc(cifrao = 'R$ ') {
        return createNumberMask({
            prefix: cifrao,
            suffix: '',
            decimalLimit: 2,
            allowDecimal: true,
            // decimalSymbol: ',',
            // thousandsSeparatorSymbol: '.',
            // includeThousandsSeparator: true
        });
    }

    static removeAcento(text): string {
        text = text.toLowerCase();
        text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
        text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
        return text;
    }

    static cepMasc() {
        return [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
    }

    static dataMasc() {
        return [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    }

    static cpfMasc() {
        return [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    }

    static cnpjMasc() {
        return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    }

    static dddMasc() {
        return ['(', /[1-9]/, /[1-9]/, ')'];
    }

    static horaMasc() {
        return [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];
    }

    static dddPhoneMask(value, self = null) {
        if (value == null) {
            return value;
        }
        if (value.length < 5)
            return value;


        //const phoneNumberMask9 = ['(', /[1-9]/, /[1-9]/, ')', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        const phoneNumberMask9 = ['(', /[1-9]/, /[1-9]/, ')', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
        const phoneNumberMask8 = ['(', /[1-9]/, /[1-9]/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        let conformedPhoneNumber: any;

        if (value.length > 13) {
            conformedPhoneNumber = conformToMask(
                value,
                phoneNumberMask9,
                {guide: false}
            );
        } else {
            conformedPhoneNumber = conformToMask(
                value,
                phoneNumberMask8,
                {guide: false}
            );
        }

        return conformedPhoneNumber.conformedValue;

    }

    static phoneMask(value, self = null) {
        if (value == null) {
            return value;
        }
        if (value.length < 5)
            return value;


        const phoneNumberMask9 = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
        const phoneNumberMask8 = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        let conformedPhoneNumber: any;
        if (value.length >= 9) {
            conformedPhoneNumber = conformToMask(
                value,
                phoneNumberMask9,
                {guide: false}
            );
        } else {
            conformedPhoneNumber = conformToMask(
                value,
                phoneNumberMask8,
                {guide: false}
            );
        }

        return conformedPhoneNumber.conformedValue;

    }

    static convertToCpfCnpj(num) {
        if (num) {
            num = num.toString();
            num = num.replace(/\D/g, "");

            switch (num.length) {
                case 4:
                    num = num.replace(/(\d+)(\d{3})/, " $1.$2");
                    break;
                case 5:
                    num = num.replace(/(\d+)(\d{3})/, " $1.$2");
                    break;
                case 6:
                    num = num.replace(/(\d+)(\d{3})/, " $1.$2");
                    break;
                case 7:
                    num = num.replace(/(\d+)(\d{3})(\d{3})/, " $1.$2.$3");
                    break;
                case 8:
                    num = num.replace(/(\d+)(\d{3})(\d{3})/, " $1.$2.$3");
                    break;
                case 9:
                    num = num.replace(/(\d+)(\d{3})(\d{3})/, " $1.$2.$3");
                    break;
                case 10:
                    num = num.replace(/(\d+)(\d{3})(\d{3})(\d{1})/, " $1.$2.$3-$4");
                    break;
                case 11:
                    num = num.replace(/(\d+)(\d{3})(\d{3})(\d{2})/, " $1.$2.$3-$4");
                    break;
                case 12:
                    num = num.replace(/(\d+)(\d{3})(\d{3})(\d{4})/, " $1.$2.$3/$4");
                    break;
                case 13:
                    num = num.replace(/(\d+)(\d{3})(\d{3})(\d{4})(\d{2})/, " $1.$2.$3/$4-$5");
                    break;
                case 14:
                    num = num.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, " $1.$2.$3/$4-$5");
                    break;
            }
        }
        return num;
    }

    static dateFrom(string): any {
        return new Date(string);
    }

    static dateFromConvert(string): any {
        let partes = string.split('/');
        return new Date(partes[2], partes[1] - 1, partes[0]);
    }

    static dateDiff(a, b) {
        let diff = UtilService.dateFrom(a.replace(' ', 'T')) - UtilService.dateFrom(b.replace(' ', 'T'));
        return Math.round(diff / 864e5) + 1;
    }

    static addMinutes(date, minutes) {
        return new Date(date.getTime() + (minutes * 60000));
    }

    static addDay(date, days) {
        date.setDate(date.getDate() + days);
        return date;
    }

    static subtrairDay(date, days) {
        return new Date(date.getTime() - (days * 86400000));
    }

    static addHora(data, hora) {
        return new Date(data.getTime() + (hora * 3600000));
    }

    static transformDate(data, format) {
        let datePipe = new DatePipe(ConfigService.config().language);
        return datePipe.transform(data, format);
    }


}
