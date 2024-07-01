import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import {
    DocenteService,
    SelectService,
} from 'src/app/proxy/acme/book-store/services';
import { AbpUtilService } from '../../utils/abp-util.service';
import {
    ConfiguracionService,
    ResultLotFilterDto,
    ResultLotService,
} from 'src/app/proxy/washyn/unaj/lot/services';
import { DocumentOptions } from 'src/app/proxy/washyn/unaj/lot/models/models';
import {
    DocenteRoleData,
    ReportService,
} from 'src/app/proxy/washyn/unaj/lot/controllers';
import { ConfigStateService, PagedResultDto } from '@abp/ng.core';
import { debounceTime } from 'rxjs';

@Component({
    selector: 'app-lot-managment',
    templateUrl: './lot-managment.component.html',
})
export class LotManagmentComponent implements OnInit {
    formFilter: FormGroup;

    lotResultFilter: ResultLotFilterDto = {
        maxResultCount: 15,
    };

    data: PagedResultDto<DocenteRoleData> = {
        totalCount: 0,
        items: [],
    };

    constructor(
        public formBuilder: FormBuilder,
        public util: AbpUtilService,
        public configState: ConfigStateService,
        public reporteService: ReportService,
        public lotResult: ResultLotService
    ) {}
    ngOnInit(): void {
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
                this.lotResultFilter = {
                    ...this.lotResultFilter,
                    filter: value,
                };
                this.listData();
            });
    }

    listData() {
        this.lotResult.getList(this.lotResultFilter).subscribe((res) => {
            this.data = res;
        });
    }

    donwloadAll() {
        this.util.ui.setBusy();
        this.reporteService.getAllPdfReport().subscribe((res) => {
            this.util.saveBlobToFile(res, 'Informe de sorteo - cartas.pdf');
            this.util.ui.clearBusy();
        });
    }

    remover(model: DocenteRoleData) {
        this.util.message.confirm(
            'Esta seguro de eliminar esto?',
            'Esta seguro',
            (isComfirmed) => {
                if (isComfirmed) {
                    this.lotResult
                        .deleteLot({
                            comisionId: model.comisionId,
                            docenteId: model.id,
                            roleId: model.rolId,
                        })
                        .subscribe(() => {
                            this.listData();
                        });
                }
            }
        );
    }
}
