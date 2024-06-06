import { PagedResultDto } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
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

    // event autocomplete...
    filter(event: AutoCompleteCompleteEvent) {
        const filtered: DocenteWithLookup[] = [];
        const query = event.query;
        for (let i = 0; i < this.allTeachers.length; i++) {
            // TODO: fix filter method...
            const docentee = this.allTeachers[i];
            if (
                docentee.fullName.toLowerCase().indexOf(query.toLowerCase()) ==
                0
            ) {
                filtered.push(docentee);
            }
        }

        this.filteredDocentes = filtered;
    }
}
