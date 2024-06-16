import { Injectable } from '@angular/core';
import { AbpNotifyService } from './abp-notify.service';
import { AbpMessageService } from './abp-message.service';
import { AbpUiService } from './abp-ui.service';

@Injectable({
    providedIn: 'root',
})
export class AbpUtilService {
    constructor(
        public notify: AbpNotifyService,
        public ui: AbpUiService,
        public message: AbpMessageService
    ) {}

    saveBlobToFile(blob: Blob | MediaSource, fileName: string) {
        // Create a blob URL
        const blobURL = window.URL.createObjectURL(blob);

        // Create an anchor element for the download
        const a = document.createElement('a');
        a.href = blobURL;
        a.download = fileName || 'download.dat'; // Provide a default file name if none is provided

        // Append the anchor to the document
        document.body.appendChild(a);

        // Simulate a click on the anchor to initiate the download
        a.click();

        // Clean up: remove the anchor and revoke the blob URL
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobURL);
    }
}
