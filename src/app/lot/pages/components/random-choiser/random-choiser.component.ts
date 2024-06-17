import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { EMPTY, of } from 'rxjs';
import { SelectService } from 'src/app/proxy/acme/book-store/services';
import { LookupDto } from 'src/app/proxy/washyn/unaj/lot';

@Component({
    selector: 'app-random-choiser',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    templateUrl: './random-choiser.component.html',
    styleUrl: './random-choiser.component.css',
})
export class RandomChoiserComponent implements OnInit {
    @Output()
    resultRandomChoise = new EventEmitter<LookupDto<string>>();

    roles: LookupDto[] = [];

    constructor(public roleService: SelectService) {}

    ngOnInit(): void {
        this.loadRoles();
    }

    loadRoles() {
        this.roleService.getRol().subscribe((res) => {
            this.roles = res;
        });
    }

    randomSelect() {
        const times = 30;
        const interval = setInterval(() => {
            const randomTag = this.pickRandomTag();
            this.highlightTag(randomTag);
            setTimeout(() => {
                this.unhighlightTag(randomTag);
            }, 100);
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            setTimeout(() => {
                const randomTag = this.pickRandomTag();
                this.highlightTag(randomTag);
                // emit event

                let node = <HTMLElement>randomTag;

                let dataResult = {
                    id: node.dataset['id'],
                    displayName: node.dataset['displayName'],
                    alternativeText: '',
                } as LookupDto<string>;
                // this.emitResult(dataResult);
                // this.resultRandomChoise.emit(dataResult);
            }, 100);
        }, times * 100);
    }

    callRandomMethod(data: any) {
        console.log('called with data ... ');
        console.log(data);
        this.randomSelect();
        return of(null);
    }

    emitResult(data: LookupDto<string>) {
        // send signal to parent suscribable...
        console.log('data');
        console.log(data);
        return of(null);
    }

    pickRandomTag() {
        const tags = document.querySelectorAll('.tag');
        return tags[Math.floor(Math.random() * tags.length)];
    }

    highlightTag(tag) {
        tag.classList.add('highlight');
    }

    unhighlightTag(tag) {
        tag.classList.remove('highlight');
    }
}
