import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'register',
                loadChildren: () =>
                    import('./register/register.module').then((m) => m.RegisterModule),
            },
            // {
            //     path: 'empty',
            //     loadChildren: () =>
            //         import('./empty/emptydemo.module').then(
            //             (m) => m.EmptyDemoModule
            //         ),
            // },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
