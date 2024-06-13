import { Component } from '@angular/core';
import { AbpUtilService } from '../../utils/abp-util.service';

@Component({
    templateUrl: './utils-abp-sample.component.html',
})
export class UtilsAbpSampleComponent {
    constructor(public util: AbpUtilService) {}
}
