import { AbpWindowService, validateRequired } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    RequiredValidator,
} from '@angular/forms';
import {
    ColumnsOutput,
    DatabaseService,
    TableDataOutput,
    TableOutput,
} from 'src/app/proxy/valtx/project/controllers';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { load } from '@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-loader/loader-hooks';

@Component({
    templateUrl: './dynamic-table.component.html',
})
export class DynamicTableComponent implements OnInit {
    constructor(
        private databaseService: DatabaseService,
        private formBuilder: FormBuilder,
        private abpWindowService: AbpWindowService
    ) {}

    tableData = {
        data: [],
        fields: [],
    } as TableDataOutput;
    tables: TableOutput[] = [];
    fields: ColumnsOutput[] = [];
    formGroup: FormGroup<{
        table: FormControl<TableOutput | null>;
        fields: FormControl<string[] | null>;
    }>;

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            table: new FormControl<TableOutput | null>(null, [
                validateRequired(),
            ]),
            fields: new FormControl<string[] | null>(null, [
                validateRequired(),
            ]),
        });

        this.databaseService.getTables().subscribe((res) => {
            this.tables = res;
        });
    }

    loadFields() {
        this.fields = [];
        if (this.formGroup.value.table) {
            this.databaseService
                .getFieldByTableAndSchema(
                    this.formGroup.value.table.name,
                    this.formGroup.value.table.schema
                )
                .subscribe((res) => {
                    this.fields = res;
                });
        }
    }

    submit() {
        console.log('this.formGroup.value');
        console.log(this.formGroup.value);
        this.databaseService
            .getDataByInput({
                table: this.formGroup.value.table.fullName,
                fields: this.formGroup.value.fields,
            })
            .subscribe((res) => {
                this.tableData = res;
            });
    }

    downloadData() {
        if (!this.formGroup.invalid) {
            this.databaseService
                .getReportExcelByInput({
                    table: this.formGroup.value.table.fullName,
                    fields: this.formGroup.value.fields,
                })
                .subscribe((res) => {
                    // get file name from backend
                    this.abpWindowService.downloadBlob(
                        res,
                        this.formGroup.value.table.fullName + '.xlsx'
                    );
                });
        }
    }
}
