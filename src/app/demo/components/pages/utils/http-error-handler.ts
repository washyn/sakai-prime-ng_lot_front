import { HttpErrorResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { AbpUtilService } from 'src/app/lot/utils/abp-util.service';

export function handleHttpError(
    injector: Injector,
    httpError: HttpErrorResponse
) {
    const util = injector.get(AbpUtilService);

    if (httpError.status === 400) {
        util.message.error(
            httpError.error?.error?.message || 'Bad request!',
            '400'
        );
        return EMPTY;
    }

    if (httpError.status === 404) {
        util.message.error(
            httpError.error?.error?.message || 'Not found!',
            '404'
        );
        return EMPTY;
    }

    return of(httpError);
}
