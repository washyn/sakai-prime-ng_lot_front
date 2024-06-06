import { Injectable } from '@angular/core';
import { AbpNotifyService } from './abp-notify.service';
import { AbpMessageService } from './abp-message.service';
import { AbpUiService } from 'src/app/lot/utils/abp-ui.service';

@Injectable({
    providedIn: 'root',
})
export class AbpUtilService {
    // TODO: en el main page mostrar la foto diseñada
    constructor(
        public notify: AbpNotifyService,
        public ui: AbpUiService,
        public message: AbpMessageService
    ) {}
}

// namespace notify {
//     function info(message: string, title?: string, options?: any): void;
//     function success(message: string, title?: string, options?: any): void;
//     function warn(message: string, title?: string, options?: any): void;
//     function error(message: string, title?: string, options?: any): void;
// }
// namespace message {
//     //TODO: these methods return jQuery.Promise instead of any. fix it.
//     function info(message: string, title?: string, options?: any): any;
//     function success(message: string, title?: string, options?: any): any;
//     function warn(message: string, title?: string, options?: any): any;
//     function error(message: string, title?: string, options?: any): any;
//     function confirm(message: string, title?: string, callback?: (isConfirmed: boolean, isCancelled?: boolean) => void, options?: any): any;
// }

// namespace notify {
//     function success(message: any, title: any, options: any): void;
//     function info(message: any, title: any, options: any): void;
//     function warn(message: any, title: any, options: any): void;
//     function error(message: any, title: any, options: any): void;
// }
// namespace message {
//     function _showMessage(msg: string, title?: string): void;
//     function info(msg: string, title: string): void;
//     function success(msg: string, title: string): void;
//     function warn(msg: string, title: string): void;
//     function error(msg: string, title: string): void;
//     function confirm(msg: string, titleOrCallback?: any, callback?: any): void;
// }
