import { PagedResultDto } from '@abp/ng.core';
import {
    ChangeDetectionStrategy,
    Component,
    ViewChild,
    type OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DocenteWithLookup } from 'src/app/proxy/acme/book-store/entities';
import {
    DocenteService,
    SelectService,
} from 'src/app/proxy/acme/book-store/services';
import { LookupDto } from 'src/app/proxy/washyn/unaj/lot';
import { ResultLotService } from 'src/app/proxy/washyn/unaj/lot/services';
import { AbpUtilService } from '../../utils/abp-util.service';
import { ReportService } from 'src/app/proxy/washyn/unaj/lot/controllers';
import { RandomChoiserComponent } from '../components/random-choiser/random-choiser.component';

@Component({
    selector: 'app-lot',
    templateUrl: './lot.component.html',
    styles: ``,
})
export class LotComponent implements OnInit {
    @ViewChild('randomComponent') randomComponent: RandomChoiserComponent;

    docenteBefore = {
        items: [],
        totalCount: 0,
    } as PagedResultDto<DocenteWithLookup>;

    docenteAfter = {
        items: [],
        totalCount: 0,
    } as PagedResultDto<DocenteWithLookup>;

    filteredDocentes: DocenteWithLookup[] = [];
    allTeachers: DocenteWithLookup[] = [];
    formLot: FormGroup;
    roles: LookupDto<string>[] = [];

    constructor(
        public docenteService: DocenteService,
        public selectService: SelectService,
        public lotService: ResultLotService,
        public util: AbpUtilService,
        public reportService: ReportService,
        public formBuilder: FormBuilder
    ) {
        this.formLot = this.formBuilder.group<{
            docente?: FormControl<DocenteWithLookup>;
        }>({
            docente: new FormControl<DocenteWithLookup>(null),
        });
    }

    resultChoise(event: LookupDto<string>) {
        console.log('choisedd');
    }

    randomSelectSuscribable() {}

    randomSelect() {
        this.randomComponent
            .callRandomMethod({
                test: 'arg',
            })
            .subscribe((res) => {
                console.log('end called child method');
            });
    }

    ngOnInit(): void {
        this.loadData();
        this.selectService.getRol().subscribe((res) => {
            this.roles = res;
        });
    }

    loadData() {
        this.docenteService
            .getList({
                maxResultCount: 1000,
            })
            .subscribe((res) => {
                this.docenteBefore.items = [...res.items];
                this.docenteBefore.totalCount = res.totalCount;

                this.docenteAfter.items = [...res.items];
                this.docenteAfter.totalCount = res.totalCount;

                this.allTeachers = [...res.items];
            });
    }

    saveResult() {
        this.lotService
            .createLot({
                roleId: '201E0D36-B405-68D7-DDA8-3A12FB51F8B9',
                docenteId: 'BC8D8766-9577-7905-8436-3A12FC6EDD48',
            })
            .subscribe(() => {
                this.util.notify.info('Sorteo registrado.', 'Registrado!');
            });
    }

    testError() {
        this.reportService.sampleErrorFriendly().subscribe((res) => {
            this.util.notify.info('info error success');
        });
    }

    filter(event: AutoCompleteCompleteEvent) {
        const filtered: DocenteWithLookup[] = [];
        const query = event.query;
        for (let i = 0; i < this.allTeachers.length; i++) {
            const docentee = this.allTeachers[i];
            if (docentee.fullName.toLowerCase().includes(query.toLowerCase())) {
                filtered.push(docentee);
            }
        }

        this.filteredDocentes = filtered;
    }
}
