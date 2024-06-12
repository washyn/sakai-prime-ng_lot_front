import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            // {
            //     path: 'dynamic-table',
            //     loadChildren: () =>
            //         import('./dynamic-table/dynamic-table.module').then(
            //             (m) => m.DynamicTableModule
            //         ),
            // },
            // {
            //     path: 'abp-utils',
            //     loadChildren: () =>
            //         import('./utils-abp-sample/utils-abp-sample.module').then(
            //             (m) => m.UtilsAbpSampleModule
            //         ),
            // },
            // {
            //     path: 'abp-table-paging',
            //     loadChildren: () =>
            //         import('./table-paging-abp/table-paging-abp.module').then(
            //             (m) => m.TablePagingAbpModule
            //         ),
            // },
            // {
            //     path: 'abp-crud',
            //     loadChildren: () =>
            //         import('./crud-abp/crud-abp.module').then(
            //             (m) => m.CrudApbModule
            //         ),
            // },
            {
                path: 'crud',
                loadChildren: () =>
                    import('./crud/crud.module').then((m) => m.CrudModule),
            },
            {
                path: 'empty',
                loadChildren: () =>
                    import('./empty/emptydemo.module').then(
                        (m) => m.EmptyDemoModule
                    ),
            },
            {
                path: 'timeline',
                loadChildren: () =>
                    import('./timeline/timelinedemo.module').then(
                        (m) => m.TimelineDemoModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
