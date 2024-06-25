# Detalle

-   Este proyecto es un ejemplo de crud con prime ng y tablas dinamicas y abp common utils en implementado en primeng

# Sakai

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Commang for generate proxy services.

        ng g @abp/ng.schematics:proxy-add

```ts
export const DEFAULT_ERROR_MESSAGES_SPANISH = {
    defaultError: {
        title: "¡Se ha producido un error!",
        details: "Detalle del error no enviado por el servidor.",
    },
    defaultError401: {
        title: "No estas autenticado!",
        details: "Debe estar autenticado (iniciar sesión) para poder realizar esta operación.",
    },
    defaultError403: {
        title: "No estas autorizado!",
        details: "No está permitido realizar esta operación.",
    },
    defaultError404: {
        title: "Recurso no encontrado!",
        details: "El recurso solicitado no se pudo encontrar en el servidor.",
    },
    defaultError500: {
        title: "Error interno del servidor!",
        details: "Detalle del error no enviado por el servidor.",
    },
};
```

## TODO:
- ...
