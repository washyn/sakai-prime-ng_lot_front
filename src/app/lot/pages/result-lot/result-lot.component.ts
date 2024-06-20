import {
    ConfigStateService,
    PagedAndSortedResultRequestDto,
    PagedResultDto,
} from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
    DocenteRoleData,
    ReportService,
} from 'src/app/proxy/washyn/unaj/lot/controllers';
import {
    ResultLotFilterDto,
    ResultLotService,
} from 'src/app/proxy/washyn/unaj/lot/services';
import { AbpUtilService } from '../../utils/abp-util.service';
import { debounceTime } from 'rxjs';

@Component({
    selector: 'app-result-lot',
    templateUrl: './result-lot.component.html',
    styleUrl: './result-lot.component.css',
})
export class ResultLotComponent implements OnInit {
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
}
