import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PagedResultDto, RootCoreModule} from "@abp/ng.core";
import {SharedModule} from "primeng/api";
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {Area, DocenteDto, DocenteFilter, Gender} from "../../../proxy/acme/book-store/entities";
import {LookupDto} from "../../../proxy/washyn/unaj/lot";
import {DocenteService, SelectService} from "../../../proxy/acme/book-store/services";
import {ReportService} from "../../../proxy/washyn/unaj/lot/controllers";
import {AbpUtilService} from "../../utils/abp-util.service";
import {ExcelTemplateService} from "../../../proxy/acme/book-store/controllers";
import {debounceTime} from "rxjs";
import {ListModule} from "../list/list.module";

@Component({
  selector: 'app-registration-list',
  standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        DropdownModule,
        InputNumberModule,
        InputTextModule,
        RadioButtonModule,
        ReactiveFormsModule,
        RootCoreModule,
        SharedModule,
        TableModule,
        ListModule
    ],
  templateUrl: './registration-list.component.html',
  styleUrl: './registration-list.component.scss'
})
export class RegistrationListComponent {
    tableFilterModel = {
        maxResultCount: 100,
    } as DocenteFilter;
    data: PagedResultDto<DocenteDto> = { items: [], totalCount: 0 };
    formGroup: FormGroup;
    formFilter: FormGroup;
    selectedDocente: DocenteDto = {} as DocenteDto;
    isModalOpen = false;
    grados: LookupDto<string>[] = [];

    constructor(
        public selectService: SelectService,
        public docenteService: DocenteService,
        public reporteService: ReportService,
        public util: AbpUtilService,
        public excelTemplate: ExcelTemplateService,
        public formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.selectService.getGrado().subscribe((res) => {
            this.grados = res;
        });
        this.listData();
        this.formFilter = this.formBuilder.group<{
            filter: FormControl<string>;
        }>({
            filter: new FormControl<string>(''),
        });

        this.formFilter
            .get('filter')
            .valueChanges.pipe(debounceTime(300))
            .subscribe((value: string | null) => {
                this.tableFilterModel = {
                    ...this.tableFilterModel,
                    filter: value,
                };
                this.listData();
            });
    }

    listData() {
        this.docenteService.getList(this.tableFilterModel).subscribe((res) => {
            this.data = res;
        });
    }

    tableLazyLoad(event: TableLazyLoadEvent) {
        this.tableFilterModel = {
            ...this.tableFilterModel,
            maxResultCount: event.rows ?? this.tableFilterModel.maxResultCount,
            skipCount: event.first,
        };
        this.listData();
    }

}
