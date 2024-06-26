// import { Confirmation, CustomHttpErrorHandlerService } from './models';
import {
    CUSTOM_HTTP_ERROR_HANDLER_PRIORITY,
    DEFAULT_ERROR_LOCALIZATIONS,
    DEFAULT_ERROR_MESSAGES,
} from './default-errors';
import { AuthService, LocalizationParam } from '@abp/ng.core';
import { EMPTY, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { CustomHttpErrorHandlerService } from './common';
import { AbpUtilService } from '../abp-util.service';
// import { ConfirmationService } from './confirmation.service';
// import { CreateErrorComponentService } from './create-error-component.service';

@Injectable({ providedIn: 'root' })
export class StatusCodeErrorHandlerService
    implements CustomHttpErrorHandlerService
{
    // protected readonly confirmationService = inject(ConfirmationService);
    // protected readonly createErrorComponentService = inject(CreateErrorComponentService);
    protected readonly authService = inject(AuthService);
    protected readonly util = inject(AbpUtilService);

    protected readonly handledStatusCodes = [401, 403, 404, 500] as const;
    protected status: (typeof this.handledStatusCodes)[number];

    readonly priority = CUSTOM_HTTP_ERROR_HANDLER_PRIORITY.normal;

    protected navigateToLogin(): void {
        this.authService.navigateToLogin();
    }

    protected showConfirmation(
        message: LocalizationParam,
        title: LocalizationParam
    ): Observable<void> {
        // return this.confirmationService.error(message, title, {
        //     hideCancelBtn: true,
        //     yesText: 'AbpAccount::Close',
        // });
        console.log('show confirmation');

        console.log(message);
        console.log(title);

        // this.util.notify.error(message, title);
        return EMPTY;
    }

    protected showPage(): void {
        const key = `defaultError${this.status}`;
        const shouldRemoveDetail = [401, 404].indexOf(this.status) > -1;
        const instance = {
            title: {
                key: DEFAULT_ERROR_LOCALIZATIONS[key]?.title,
                defaultValue: DEFAULT_ERROR_MESSAGES[key]?.title,
            },
            details: {
                key: DEFAULT_ERROR_LOCALIZATIONS[key]?.details,
                defaultValue: DEFAULT_ERROR_MESSAGES[key]?.details,
            },
            status: this.status,
        };

        if (shouldRemoveDetail) {
            delete instance.details;
        }

        // this.createErrorComponentService.execute(instance);
    }

    canHandle(error): boolean {
        this.status = error?.status || 0;
        return this.handledStatusCodes.indexOf(this.status) > -1;
    }

    execute(): void {
        const key = `defaultError${this.status}`;
        const title = {
            key: DEFAULT_ERROR_LOCALIZATIONS[key]?.title,
            defaultValue: DEFAULT_ERROR_MESSAGES[key]?.title,
        };
        const message = {
            key: DEFAULT_ERROR_LOCALIZATIONS[key]?.details,
            defaultValue: DEFAULT_ERROR_MESSAGES[key]?.details,
        };

        // const canCreateCustomError =
        //     this.createErrorComponentService.canCreateCustomError(this.status);

        let titleText = title.defaultValue;
        let messageText = message.defaultValue;

        // let titleText = DEFAULT_ERROR_MESSAGES[key].title;
        // let messageText = DEFAULT_ERROR_MESSAGES[key].details;

        switch (this.status) {
            case 401:
            case 404:
                // if (canCreateCustomError) {
                //     this.showPage();
                //     break;
                // }
                this.util.notify.error(messageText, titleText);

                if (this.status === 401) {
                    this.authService.navigateToLogin();
                    break;
                }

                // this.showConfirmation(title, message).subscribe();
                break;
            case 403:
            case 500:
                this.util.notify.error(messageText, titleText);
                // this.showPage();
                break;
        }
    }
}
