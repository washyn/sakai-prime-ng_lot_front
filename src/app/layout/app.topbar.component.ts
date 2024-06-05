import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    pathImage = '';
    constructor(public layoutService: LayoutService) {
        let tempPath = environment.apis.default.url;
        tempPath = tempPath.endsWith('/') ? tempPath + '' : tempPath + '/';
        this.pathImage = tempPath + 'applogo.png';
    }
}
