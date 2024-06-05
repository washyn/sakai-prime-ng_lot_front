import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface ResultLotDto {
    docente: string;
    rol: string;
    fechaSorteo: Date;
}

@Component({
    selector: 'app-result-lot',
    templateUrl: './result-lot.component.html',
    styleUrl: './result-lot.component.css',
})
export class ResultLotComponent implements OnInit {
    data = [] as ResultLotDto[];
    formFilter: FormGroup;
    /**
     *
     */
    constructor(public formBuilder: FormBuilder) {
        this.data.push({
            docente: 'Washington Acero',
            fechaSorteo: new Date(),
            rol: 'Dev',
        });
        this.data.push({
            docente: 'Washington Acero',
            fechaSorteo: new Date(),
            rol: 'Dev',
        });
    }
    ngOnInit(): void {
        this.formFilter = this.formBuilder.group<{
            filter: FormControl<string>;
        }>({
            filter: new FormControl<string>(''),
        });
    }
}
