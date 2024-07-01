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
import { ConfiguracionService } from 'src/app/proxy/washyn/unaj/lot/services';
import { DocumentOptions } from 'src/app/proxy/washyn/unaj/lot/models/models';

@Component({
    selector: 'app-lot-managment',
    templateUrl: './lot-managment.component.html',
})
export class LotManagmentComponent implements OnInit {
    ngOnInit(): void {
        // throw new Error('Method not implemented.');
    }
}
