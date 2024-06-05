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
                path: 'list-teachers',
                loadChildren: () =>
                    import('./list/list.module').then((m) => m.ListModule),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
