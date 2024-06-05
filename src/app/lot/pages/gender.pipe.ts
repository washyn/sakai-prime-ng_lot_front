import { Pipe, type PipeTransform } from '@angular/core';
import { Gender } from 'src/app/proxy/acme/book-store/entities';

@Pipe({
    name: 'appGender',
    pure: true,
})
export class GenderPipe implements PipeTransform {
    transform(value: Gender): string {
        switch (value) {
            case Gender.Male:
                return 'Masculino';
            case Gender.Female:
                return 'Femenino';
            case Gender.Unknow:
                return 'Desconocido';

            default:
                return '-';
                break;
        }
    }
}
