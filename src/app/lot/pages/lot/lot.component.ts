import { PagedResultDto } from '@abp/ng.core';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
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

@Component({
    selector: 'app-lot',
    templateUrl: './lot.component.html',
    styles: ``,
})
export class LotComponent implements OnInit {
    docenteBefore = {
        items: [],
        totalCount: 0,
    } as PagedResultDto<DocenteWithLookup>;
    filteredDocentes: DocenteWithLookup[] = [];
    allTeachers: DocenteWithLookup[] = [];
    docenteAfter = {
        items: [],
        totalCount: 0,
    } as PagedResultDto<DocenteWithLookup>;
    formLot: FormGroup;
    roles: LookupDto<string>[] = [];

    constructor(
        public docenteService: DocenteService,
        public selectService: SelectService,
        public lotService: ResultLotService,
        public util: AbpUtilService,
        public formBuilder: FormBuilder
    ) {
        this.formLot = this.formBuilder.group<{
            docente?: FormControl<DocenteWithLookup>;
        }>({
            docente: new FormControl<DocenteWithLookup>(null),
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

    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////

    // event autocomplete...
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

    // ...
    generateSecuence(length: number) {
        let result: number[] = [];
        for (let index = 0; index < length; index++) {
            result.push(this.generateRandomNumber(1, 5));
        }
        return result;
    }

    getRandomNum(maxValue: number) {
        let date = Date.now();
        let dateMl = new Date().getMilliseconds();
        let tempValue = date * Math.random();
        let value = tempValue / dateMl;
        let rounded = Math.round(value);
        return rounded % maxValue;
    }

    getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    async genAndShowNumbers() {
        let numbers = this.generateSecuence(this.generateRandomNumber(20, 50));
        // numero que disminuye...
        let sleepNumber = 150;
        for (let ite of numbers) {
            await this.delay(sleepNumber);
            this.currentValueRandom = ite;
            sleepNumber = sleepNumber + 10;
        }
    }

    // TODO: generatte random n number as secuence array and show... with sleeep...
    generateRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * max) + min;
    }

    currentValueRandom = -1;
    initializedChoise = true;

    delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
