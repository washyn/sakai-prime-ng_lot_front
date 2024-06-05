import { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
    ResultLotDto,
    ResultLotService,
} from 'src/app/proxy/washyn/unaj/lot/services';

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
        public lotResult: ResultLotService
    ) {}
    ngOnInit(): void {
        this.listData();
        this.formFilter = this.formBuilder.group<{
            filter: FormControl<string>;
        }>({
            filter: new FormControl<string>(''),
        });
    }

    listData() {
        this.lotResult.getList().subscribe((res) => {
            this.data = res;
        });
    }
}
