import {Injectable} from "@angular/core";
import swal from 'sweetalert2';

declare var $: any;
@Injectable()
export class AlertService {
    static sucess(title: string, text: string) {
        return swal(
            title,
            text,
            'success'
        );
    }
    static infomessage(title: string, text: string) {
        return swal(
            title,
            text,
            'info'
        );
    }

    static seccessTime(title: string, text: string = null, time: number = 2500): Promise<any> {
        return swal({
            title: title,
            text: text,
            type: 'success',
            timer: time
        });
    }

    static flashMessage(title: string, animate = 'shake', classes = 'custom-alert', placement = {from: 'top', align: 'left'}) {
        $.growl({
            message: title
        }, {
            type: "inverse",
            allow_dismiss: !1,
            label: "Cancel",
            template: `
                    <div data-growl="container" class="alert ${classes}" role="alert">
                        <button type="button" aria-hidden="true" class="close" data-growl="dismiss">
                            &times;
                        </button>
                        <span data-growl="icon"></span>
                        <span data-growl="title"></span>
                        <span data-growl="message"></span>
                        <a href="#" data-growl="url"></a>
                    </div>
            `,
            placement: {
                from: "top",
                align: "left"
            },
            delay: 2500,
            animate: {
                enter: "animated "+animate,
                exit: "animated fadeOutDown"
            },
            offset: {
                x: 30,
                y: 30
            }
        });
    }

    static error(title: string, text: string) {
        swal(
            title,
            text,
            'error'
        );
    }

    static errorTime(title: string, text: string = null, time: number = 2500): Promise<any> {
        return swal({
            title: title,
            text: text,
            type: 'error',
            timer: time
        });
    }

    constructor() {}



    swalInit(obj) {
        return swal(obj);
    }

    prompt(options) {
        const baseOptions = {
            showCancelButton: true,
            confirmButtonText: 'Submit',
            input: 'text'
        };
        return swal(Object.assign(baseOptions, options));
    }

    confirm(options) {
        const baseOptions = {
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            type: 'warning'
        };
        return swal(Object.assign(baseOptions, options));
    }

    alert(options) {
        const baseOptions = {
            confirmButtonText: 'OK',
            type: 'info'
        };
        return swal(Object.assign(baseOptions, options));
    }

    question(options) {
        return this.alert(Object.assign({type: 'question'}, options));
    }

    success(options) {
        return this.alert(Object.assign({type: 'success'}, options));
    }

    error(options) {
        return this.alert(Object.assign({type: 'error'}, options));
    }

    warn(options) {
        return this.alert(Object.assign({type: 'warn'}, options));
    }

    info(options) {
        return this.alert(Object.assign({type: 'info'}, options));
    }

}
