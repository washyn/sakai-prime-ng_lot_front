import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnInit,
    Output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { EMPTY, of } from 'rxjs';
import {
    DocenteService,
    SelectService,
} from 'src/app/proxy/acme/book-store/services';
import { LookupDto } from 'src/app/proxy/washyn/unaj/lot';
import { Observable, interval, timer } from 'rxjs';
import { concatMap, map, takeUntil } from 'rxjs/operators';
import { ResultLotService } from 'src/app/proxy/washyn/unaj/lot/services';

// receive signal for execute lot and returns random element to parent element caller...
@Component({
    selector: 'app-random-choiser',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    templateUrl: './random-choiser.component.html',
    styleUrl: './random-choiser.component.css',
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomChoiserComponent implements OnInit {
    // el parent con una referencia llamaaria a pickRandomTag
    // receibe input for caller start lot
    // Ver como se hace en otros componentes random picker en linea...
    // TODO: check, outputs angular
    // ... ...
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

    randomSelect2(): Observable<LookupDto<string>> {
        console.log('called to random select2');

        const times = 30;
        const highlightDuration = 100;

        // Create an observable that emits after the highlight interval
        const highlightEnd$ = interval(times * 100).pipe(
            takeUntil(timer(times * highlightDuration))
        );

        return highlightEnd$.pipe(
            map(() => {
                const randomTag = this.pickRandomTag();
                this.highlightTag(randomTag);

                return timer(highlightDuration).pipe(
                    map(() => {
                        this.unhighlightTag(randomTag);

                        const node = randomTag as HTMLElement; // Type assertion (if necessary)

                        return {
                            id: node.dataset['id'] as string,
                            displayName: node.dataset['displayName'] as string,
                            alternativeText: '', // Optional property
                        } as LookupDto<string>;
                    })
                );
            }),
            // Flatten the inner observable using concatMap (or switchMap for later emissions)
            concatMap((innerObs) => innerObs)
        );
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
