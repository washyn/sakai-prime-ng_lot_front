import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';


// TODO: add suscribable obj when close message dialog.
@Injectable({
    providedIn: 'root',
})
export class AbpMessageService {
    constructor(private confirmationService: ConfirmationService) {}

    private showMessage(
        type: string,
        message: string,
        title?: string,
        options?: any
    ) {
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
                callback && callback(true);
            },
            reject: () => {
                callback && callback(false);
            },

            ...options,
        });
    }
}
