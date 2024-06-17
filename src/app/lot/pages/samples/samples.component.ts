import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

// NOTE:can be add methods for test, error methods withoud sleep
@Component({
    selector: 'app-samples',
    standalone: true,
    imports: [CommonModule, LocalizationModule],
    template: `
        <h2>
            {{ 'AbpUi::Login' | abpLocalization }}
        </h2>
    `,
    styles: ``,
})
export class SamplesComponent {}
