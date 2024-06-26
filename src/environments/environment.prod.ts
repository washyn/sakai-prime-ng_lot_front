import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
    production: true,
    application: {
        baseUrl,
        name: 'BookStore',
        logoUrl: '',
    },
    oAuthConfig: {
        issuer: 'http://localhost:5202/',
        redirectUri: baseUrl,
        clientId: 'BookStore_App',
        responseType: 'code',
        scope: 'offline_access BookStore',
        requireHttps: true,
    },
    apis: {
        default: {
            url: 'http://localhost:5202',
            rootNamespace: 'Acme.BookStore',
        },
    },
} as Environment;
