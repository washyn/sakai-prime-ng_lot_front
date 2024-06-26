import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'register',
                loadChildren: () =>
                    import('./register/register.module').then(
                        (m) => m.RegisterModule
                    ),
            },
            {
                path: 'lot-result',
                loadChildren: () =>
                    import('./result-lot/result-lot.module').then(
                        (m) => m.ResultLotModule
                    ),
            },
            {
                path: 'process',
                loadChildren: () =>
                    import('./lot/lot.module').then((m) => m.LotModule),
            },
            {
                path: 'list-teachers',
                loadChildren: () =>
                    import('./list/list.module').then((m) => m.ListModule),
            },
            {
                path: 'prueba',
                loadChildren: () =>
                    import('./samples/samples.module').then(
                        (m) => m.SamplesModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
