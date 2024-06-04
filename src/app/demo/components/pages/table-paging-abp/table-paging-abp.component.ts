import { Component } from '@angular/core';
import {
    ContribuyenteDto,
    ContribuyenteFilter,
    ContribuyenteService,
    ProductoDto,
    ProductoService,
} from '../../../../proxy/washyn/sales/services';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import {
    ExtensibleLimitedResultRequestDto,
    PagedResultDto,
} from '@abp/ng.core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
    templateUrl: './table-paging-abp.component.html',
})
export class TablePagingAbpComponent {
    formGroup: FormGroup;
    loading: boolean;
    public readonly pageSize = 25;
    filterModel = {
        maxResultCount: this.pageSize,
        skipCount: 0,
    } as ContribuyenteFilter;
    data: PagedResultDto<ContribuyenteDto> = {
        totalCount: 0,
        items: [],
    };

    constructor(
        private service: ContribuyenteService,
        private primengConfig: PrimeNGConfig,
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit() {
        // //datasource imitation
        // this.customerService.getCustomersLarge().then(data => {
        //     this.datasource = data;
        //     this.totalRecords = data.length;
        // });
        //
        // this.loading = true;
        // this.primengConfig.ripple = true;

        // TODO: this not used on lazy load, add prop paged DTO,
        this.service
            .getList({
                maxResultCount: this.pageSize,
            })
            .subscribe((data) => {
                this.data = data;
            });

        this.loading = true;
        this.primengConfig.ripple = true;

        //
        this.formGroup = this.formBuilder.group<{
            filter?: FormControl<string | null>;
        }>({
            filter: new FormControl<string | null>(null, []),
        });
        this.formGroup
            .get('filter')
            .valueChanges.pipe(debounceTime(300))
            .subscribe((res) => {
                this.filterModel = {
                    ...this.filterModel,
                    ...this.formGroup.value,
                };
                this.loadData();
            });
    }

    loadData() {
        this.service.getList(this.filterModel).subscribe((res) => {
            this.data = res;
            this.loading = false;
        });
    }

    loadCustomers(event: TableLazyLoadEvent) {
        this.loading = true;

        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        //imitate db connection over a network
        // setTimeout(() => {
        //     if (this.datasource) {
        //         this.customers = this.datasource.slice(event.first, (event.first + event.rows));
        //         this.loading = false;
        //     }
        // }, 1000);

        let sortField = null;
        if (event.sortField) {
            let order = 'asc';
            if (event.sortOrder) {
                if (event.sortOrder === 1) {
                    order = 'asc';
                } else if (event.sortOrder === -1) {
                    order = 'desc';
                }
            }
            sortField = event.sortField + ' ' + order;
        }

        this.filterModel = {
            maxResultCount: event.rows ?? this.pageSize,
            skipCount: event.first,
            sorting: sortField,
            ...this.formGroup.value,
        };

        this.loadData();
    }
}
