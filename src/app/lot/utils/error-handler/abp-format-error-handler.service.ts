import { inject, Injectable } from '@angular/core';
import { AuthService } from '@abp/ng.core';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorFromRequestBody } from './error.utils';
import { CustomHttpErrorHandlerService } from './common';
import { CUSTOM_HTTP_ERROR_HANDLER_PRIORITY } from './default-errors';
import { AbpUtilService } from '../abp-util.service';
// import { ConfirmationService } from '../services/confirmation.service';

@Injectable({ providedIn: 'root' })
export class AbpFormatErrorHandlerService
    implements CustomHttpErrorHandlerService
{
    // private confirmationService = inject(ConfirmationService);

    readonly priority = CUSTOM_HTTP_ERROR_HANDLER_PRIORITY.high;
    private authService = inject(AuthService);
    private util = inject(AbpUtilService);
    private error: HttpErrorResponse | undefined = undefined;

    private navigateToLogin() {
        return this.authService.navigateToLogin();
    }

    canHandle(error: unknown): boolean {
        if (
            error instanceof HttpErrorResponse &&
            error.headers.get('_AbpErrorFormat')
        ) {
            this.error = error;
            return true;
        }
        return false;
    }

    execute() {
        const { message, title } = getErrorFromRequestBody(
            this.error?.error?.error
        );
        // this.confirmationService
        //     .error(message, title, {
        //         hideCancelBtn: true,
        //         yesText: 'AbpAccount::Close',
        //     })
        //     .subscribe(() => {
        //         if (this.error?.status === 401) {
        //             this.navigateToLogin();
        //         }
        //     });
        // this.util.notify.error(message.toString(), 'Occurrio un error');
        this.util.message.error(message.toString(), 'Occurrio un error');
    }
}
