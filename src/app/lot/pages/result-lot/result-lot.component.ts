import {
    ConfigStateService,
    PagedAndSortedResultRequestDto,
    PagedResultDto,
} from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/proxy/washyn/unaj/lot/controllers';
import {
    ResultLotDto,
    ResultLotService,
} from 'src/app/proxy/washyn/unaj/lot/services';
import { AbpUtilService } from '../../utils/abp-util.service';

@Component({
    selector: 'app-result-lot',
    templateUrl: './result-lot.component.html',
    styleUrl: './result-lot.component.css',
})
export class ResultLotComponent implements OnInit {
    formFilter: FormGroup;

    data: PagedResultDto<ResultLotDto> = {
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
    }

    listData() {
        this.lotResult.getList().subscribe((res) => {
            this.data = res;
        });
    }

    donwloadAll() {
        this.reporteService.getAllPdfReport().subscribe((res) => {
            this.util.saveBlobToFile(res, 'Informe de sorteo - cartas.pdf');
        });
    }
}
