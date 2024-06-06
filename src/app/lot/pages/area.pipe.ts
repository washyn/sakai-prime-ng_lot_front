import { Pipe, type PipeTransform } from '@angular/core';
import { Area } from 'src/app/proxy/acme/book-store/entities';

@Pipe({
    name: 'appArea',
})
export class AreaPipe implements PipeTransform {
    transform(value?: Area) {
        switch (value) {
            case Area.Biomedicas:
                return 'Biomedicas';
            case Area.Ingenierias:
                return 'Ingenierías';
            case Area.Sociales:
                return 'Sociales';
            case Area.Desconocido:
                return 'Desconocido';
            case null:
                return '';
            default:
                return '-';
        }
    }
}
