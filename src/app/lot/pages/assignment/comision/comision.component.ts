import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbpUtilService } from 'src/app/lot/utils/abp-util.service';
import {
    AsignComisionDto,
    ComisionDto,
    ComisionService,
    DocenteLookup,
} from 'src/app/proxy/washyn/unaj/lot/services';

@Component({
    selector: 'app-comision',
    templateUrl: './comision.component.html',
})
export class ComisionComponent implements OnInit {
    @Input({
        required: true,
    })
    comision: ComisionDto;
    modalAgregarDocente: boolean = false;
    docentesModalData: DocenteLookup[] = [];
    selectedDocente: DocenteLookup[] = [];
    integrantes: DocenteLookup[] = [];

    constructor(
        public comisionService: ComisionService,
        public util: AbpUtilService
    ) {}

    loadModalAdd(comision: ComisionDto) {
        this.modalAgregarDocente = true;
        this.loadDocentesModal();
    }

    ngOnInit(): void {
        this.loadIntegrantes();
    }

    loadDocentesModal() {
        this.comisionService.getDocente().subscribe((res) => {
            this.docentesModalData = res;
        });
    }

    removeFromComision(id: string) {
        this.util.message.confirm(
            'Esta seguro de remover este integrante.',
            'Esta seguro',
            (res) => {
                if (res) {
                    this.util.notify.info(
                        'Se removio el integrante.',
                        'Removido'
                    );
                }
            }
        );
    }

    loadIntegrantes() {
        this.comisionService
            .getDataByComision(this.comision.id)
            .subscribe((res) => {
                this.integrantes = res;
            });
    }

    resultSelected() {
        let data = this.selectedDocente.map((a) => {
            return {
                docenteId: a.id,
                comisionId: this.comision.id,
            } as AsignComisionDto;
        });

        this.comisionService.assignToComisionByData(data).subscribe((res) => {
            this.selectedDocente = [];
            this.modalAgregarDocente = false;
            this.util.notify.success(
                'Se asignó los docentes a la comisión.',
                'Mensaje confirmación'
            );
        });
    }
}
