import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
})
export class LandingComponent {
    pathImage = '';
    constructor(public layoutService: LayoutService, public router: Router) {
        let tempPath = environment.apis.default.url;
        tempPath = tempPath.endsWith('/') ? tempPath + '' : tempPath + '/';
        this.pathImage = tempPath + 'applogo.png';
    }
}
