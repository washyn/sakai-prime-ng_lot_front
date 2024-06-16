export const DEFAULT_ERROR_MESSAGES = {
    defaultError: {
        title: '¡Se ha producido un error!',
        details: 'Detalle del error no enviado por el servidor.',
    },
    defaultError401: {
        title: 'No estas autenticado!',
        details:
            'Debe estar autenticado (iniciar sesión) para poder realizar esta operación.',
    },
    defaultError403: {
        title: 'No estas autorizado!',
        details: 'No está permitido realizar esta operación.',
    },
    defaultError404: {
        title: 'Recurso no encontrado!',
        details: 'El recurso solicitado no se pudo encontrar en el servidor.',
    },
    defaultError500: {
        title: 'Error interno del servidor!',
        details: 'Detalle del error no enviado por el servidor.',
    },
};

export const DEFAULT_ERROR_LOCALIZATIONS = {
    defaultError: {
        title: 'AbpUi::DefaultErrorMessage',
        details: 'AbpUi::DefaultErrorMessageDetail',
    },
    defaultError401: {
        title: 'AbpUi::DefaultErrorMessage401',
        details: 'AbpUi::DefaultErrorMessage401Detail',
    },
    defaultError403: {
        title: 'AbpUi::DefaultErrorMessage403',
        details: 'AbpUi::DefaultErrorMessage403Detail',
    },
    defaultError404: {
        title: 'AbpUi::DefaultErrorMessage404',
        details: 'AbpUi::DefaultErrorMessage404Detail',
    },
    defaultError500: {
        title: 'AbpUi::500Message',
        details: 'AbpUi::DefaultErrorMessage',
    },
};

export const CUSTOM_HTTP_ERROR_HANDLER_PRIORITY = Object.freeze({
    veryLow: -99,
    low: -9,
    normal: 0,
    high: 9,
    veryHigh: 99,
});

export const HTTP_ERROR_STATUS = {
    '401': 'AbpUi::401Message',
    '403': 'AbpUi::403Message',
    '404': 'AbpUi::404Message',
    '500': 'AbpUi::500Message',
};

export const HTTP_ERROR_DETAIL = {
    '401': 'AbpUi::DefaultErrorMessage401Detail',
    '403': 'AbpUi::DefaultErrorMessage403Detail',
    '404': 'AbpUi::DefaultErrorMessage404Detail',
    '500': 'AbpUi::DefaultErrorMessage',
};
