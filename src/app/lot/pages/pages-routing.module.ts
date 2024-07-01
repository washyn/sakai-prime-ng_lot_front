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
                path: 'assignment',
                loadChildren: () =>
                    import('./assignment/assignment.module').then(
                        (m) => m.AssignmentModule
                    ),
            },
            {
                path: 'prueba',
                loadChildren: () =>
                    import('./samples/samples.module').then(
                        (m) => m.SamplesModule
                    ),
            },
            {
                path: 'lot-managment',
                loadChildren: () =>
                    import('./lot-managment/lot-managment.module').then(
                        (m) => m.LotManagmentModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
