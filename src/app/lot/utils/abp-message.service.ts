import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class AbpMessageService {
    // var showMessage = function (type, message, title) {
    //     var opts = $.extend(
    //         {},
    //         abp.libs.sweetAlert.config['default'],
    //         abp.libs.sweetAlert.config[type],
    //         {
    //             title: title,
    //             text: message
    //         }
    //     );
    //
    //     return $.Deferred(function ($dfd) {
    //         Swal.fire(opts).then(function () {
    //             $dfd.resolve();
    //         });
    //     });
    // };

    // can be add button outline lines y color de boton de acuerdo al tipo, and resize confirm size...
    constructor(private confirmationService: ConfirmationService) {}

    private showMessage(
        type: string,
        message: string,
        title?: string,
        options?: any
    ) {
        // this.confirmationService.confirm({
        //     message: 'Are you sure that you want to proceed?',
        //     header: 'Confirmation',
        //     icon: 'pi pi-exclamation-triangle',
        //     acceptIcon:"none",
        //     rejectIcon:"none",
        //     rejectButtonStyleClass:"p-button-text",
        //     accept: () => {
        //     },
        //     reject: () => {}
        // });

        // rellenar tamano con espacios en caso de que el texto sea pequeno el titulo y el mensaje
        /// tambien se debe cambiar el estilo del boton dependiendo del tipo de mensaje...

        if (!title) {
            title = message;
            message = '';
        }
        this.confirmationService.confirm({
            message: message,
            header: title,
            icon: 'pi pi-info-circle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            closeOnEscape: true,
            rejectVisible: false,
            acceptLabel: 'Ok',
            defaultFocus: 'accept',

            accept: () => {},
            reject: () => {},
            ...options,
        });
    }

    info(message: string, title?: string, options?: any): any {
        this.showMessage('', message, title, options);
    }

    success(message: string, title?: string, options?: any): any {
        this.showMessage('', message, title, options);
    }

    warn(message: string, title?: string, options?: any): any {
        this.showMessage('', message, title, options);
    }

    error(message: string, title?: string, options?: any): any {
        this.showMessage('', message, title, options);
    }

    confirm(
        message: string,
        title?: string,
        callback?: (isConfirmed: boolean, isCancelled?: boolean) => void,
        options?: any
    ): any {
        if (!title) {
            title = message;
            message = '';
        }
        this.confirmationService.confirm({
            message: message,
            header: title,
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            closeOnEscape: true,
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            defaultFocus: 'none',
            accept: () => {
                if (callback) {
                    callback(true);
                }
            },
            reject: () => {},

            ...options,
        });
    }
}
