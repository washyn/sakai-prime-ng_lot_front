import { Provider } from '@angular/core';
// import { CUSTOM_ERROR_HANDLERS } from '../tokens';
import {AbpFormatErrorHandlerService} from './abp-format-error-handler.service';
import {TenantResolveErrorHandlerService} from "./tenant-resolve-error-handler.service";
import {StatusCodeErrorHandlerService} from "./status-code-error-handler.service";
import {UnknownStatusCodeErrorHandlerService} from "./unknown-status-code-error-handler.service";
import {AbpAuthenticationErrorHandler} from "./authentication-error-handler.service";
import {CUSTOM_ERROR_HANDLERS} from "./http-error.token";

export const DEFAULT_HANDLERS_PROVIDERS: Provider[] = [
  {
    provide: CUSTOM_ERROR_HANDLERS,
    multi: true,
    useExisting: TenantResolveErrorHandlerService,
  },
  {
    provide: CUSTOM_ERROR_HANDLERS,
    multi: true,
    useExisting: AbpFormatErrorHandlerService,
  },
  {
    provide: CUSTOM_ERROR_HANDLERS,
    multi: true,
    useExisting: StatusCodeErrorHandlerService,
  },
  {
    provide: CUSTOM_ERROR_HANDLERS,
    multi: true,
    useExisting: UnknownStatusCodeErrorHandlerService,
  },
  {
    provide: CUSTOM_ERROR_HANDLERS,
    multi: true,
    useExisting: AbpAuthenticationErrorHandler,
  },
];
