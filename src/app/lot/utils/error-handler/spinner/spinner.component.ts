import {Component, ViewEncapsulation} from '@angular/core';
import {AbpUiService} from "../../abp-ui.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent {
    constructor(public loader: AbpUiService) {
    }
}
